const CHANNEL = 'qmg-south-front-bga-sync';
const STORAGE_KEY = 'qmgBgaSyncStoreV1';
const MAX_EVENTS_PER_TABLE = 600;

function normalizeTableId(value) {
  const tableId = String(value || '').trim();
  return /^\d+$/.test(tableId) ? tableId : '';
}

async function readStore() {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] || { version: 1, tables: {} };
}

async function writeStore(store) {
  await chrome.storage.local.set({ [STORAGE_KEY]: store });
}

function ensureTable(store, tableId) {
  store.tables[tableId] = store.tables[tableId] || {
    events: [],
    requestedAt: null,
    coverageStartedAt: null,
    connectedAt: null
  };
  return store.tables[tableId];
}

async function signalBgaTabs(tableId) {
  const tabs = await chrome.tabs.query({ url: ['*://*.boardgamearena.com/*'] });
  const outcomes = await Promise.all(tabs.map(async tab => {
    try {
      return await chrome.tabs.sendMessage(tab.id, { channel: CHANNEL, type: 'start-table', tableId });
    } catch {
      return null;
    }
  }));
  return outcomes.filter(outcome => outcome?.matched).length;
}

async function startTableTracking(tableId) {
  const store = await readStore();
  const table = ensureTable(store, tableId);
  table.requestedAt = new Date().toISOString();
  await writeStore(store);
  const matchingTabs = await signalBgaTabs(tableId);
  return {
    type: 'sync-started',
    payload: {
      tableId,
      matchingTabs,
      message: matchingTabs > 0
        ? 'Connection requested. The BGA companion is scanning the matching table.'
        : 'No open BGA table matched yet. Keep the BGA table open, then use Refresh.'
    }
  };
}

async function markTableConnected(tableId) {
  const store = await readStore();
  const table = ensureTable(store, tableId);
  const now = new Date().toISOString();
  table.connectedAt = now;
  table.coverageStartedAt = table.coverageStartedAt || now;
  await writeStore(store);
  return { ok: true };
}

async function upsertEvents(tableId, receivedEvents) {
  const store = await readStore();
  const table = ensureTable(store, tableId);
  const eventsById = new Map(table.events.map(event => [event.id, event]));

  receivedEvents.forEach(event => {
    if (!event || !event.id) return;
    const existing = eventsById.get(event.id);
    eventsById.set(event.id, {
      ...existing,
      ...event,
      source: event.source === 'live' ? 'live' : (existing?.source || 'snapshot'),
      capturedAt: existing?.capturedAt || event.capturedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  });

  table.events = [...eventsById.values()]
    .sort((a, b) => String(a.capturedAt).localeCompare(String(b.capturedAt)))
    .slice(-MAX_EVENTS_PER_TABLE);
  table.lastEventAt = new Date().toISOString();
  await writeStore(store);
  return { ok: true, count: table.events.length };
}

async function getHistory(tableId) {
  const store = await readStore();
  const table = store.tables[tableId];
  return {
    type: 'sync-history',
    payload: {
      tableId,
      events: table?.events || [],
      coverageStartedAt: table?.coverageStartedAt || null,
      connectedAt: table?.connectedAt || null
    }
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || message.channel !== CHANNEL) return;

  (async () => {
    if (message.type === 'bridge-probe') {
      return { type: 'bridge-ready', payload: { version: '0.1.0' } };
    }

    const tableId = normalizeTableId(message.tableId || message.payload?.tableId);
    if (!tableId) {
      return { type: 'sync-error', payload: { message: 'A valid numeric BGA table code is required.' } };
    }

    if (message.type === 'track-table') return startTableTracking(tableId);
    if (message.type === 'get-history') return getHistory(tableId);
    if (message.type === 'bga-table-connected') return markTableConnected(tableId);
    if (message.type === 'bga-log-events') return upsertEvents(tableId, message.events || []);

    return { type: 'sync-error', payload: { message: 'Unknown BGA sync request.' } };
  })().then(sendResponse).catch(error => {
    sendResponse({ type: 'sync-error', payload: { message: error.message || 'The local BGA companion failed.' } });
  });

  return true;
});
