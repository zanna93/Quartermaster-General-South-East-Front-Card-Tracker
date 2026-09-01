(() => {
  const CHANNEL = 'qmg-south-front-bga-sync';
  let activeTableId = '';
  let observer = null;
  let nextAnonymousId = 1;
  const anonymousIds = new WeakMap();
  const fingerprints = new Map();
  const eventSources = new Map();

  function extractTableId() {
    const urlMatch = location.href.match(/[?&]table=(\d+)/i);
    if (urlMatch) return urlMatch[1];

    const headingMatch = document.body?.innerText?.match(/(?:table|tavolo)\s*#(\d+)/i);
    return headingMatch ? headingMatch[1] : '';
  }

  function nodeIdFor(node, index) {
    if (node.id) return node.id;
    if (!anonymousIds.has(node)) anonymousIds.set(node, `anonymous-${index}-${nextAnonymousId++}`);
    return anonymousIds.get(node);
  }

  function isReverted(node) {
    const candidates = [node, ...node.querySelectorAll('*')];
    return candidates.some(element => {
      const style = getComputedStyle(element);
      const classAndStyle = `${element.className || ''} ${element.getAttribute('style') || ''}`.toLowerCase();
      return style.textDecorationLine.includes('line-through') || /cancel|undo|revert|strike/.test(classAndStyle);
    });
  }

  function collectHints(node) {
    const hints = new Set();
    const elements = [node, ...node.querySelectorAll('[title], [aria-label], img, a, [data-card-id], [data-card-name]')];
    elements.forEach(element => {
      ['title', 'aria-label', 'alt', 'data-card-id', 'data-card-name'].forEach(attribute => {
        const value = element.getAttribute?.(attribute);
        if (value) hints.add(value.trim());
      });
      const src = element.getAttribute?.('src');
      if (src) {
        const filename = decodeURIComponent(src.split('?')[0].split('/').pop() || '');
        if (filename) hints.add(filename);
      }
    });
    return [...hints].slice(0, 24);
  }

  function snapshotLog(node, index, source) {
    const text = (node.innerText || node.textContent || '').replace(/\s+/g, ' ').trim();
    const nodeId = nodeIdFor(node, index);
    const moveId = node.dataset?.moveId || '';
    const normalized = text.toLowerCase();
    return {
      id: `${activeTableId}:${nodeId}`,
      nodeId,
      moveId,
      text,
      hints: collectHints(node),
      isUndo: /\b(undo|cancel(?:led|ed)?|revert(?:ed)?|annulla\w*)\b/i.test(normalized),
      isDiscard: /\b(discard|scarta\w*)\b/i.test(normalized),
      reverted: isReverted(node),
      source,
      capturedAt: new Date().toISOString()
    };
  }

  function send(message) {
    chrome.runtime.sendMessage({ channel: CHANNEL, ...message }).catch(() => {});
  }

  function scan(source) {
    if (!activeTableId) return;
    const logs = [...document.querySelectorAll('.log')];
    const changed = logs.map((node, index) => {
      const event = snapshotLog(node, index, source);
      event.source = eventSources.get(event.id) || source;
      eventSources.set(event.id, event.source);
      return event;
    }).filter(event => {
      const fingerprint = JSON.stringify({
        text: event.text,
        hints: event.hints,
        reverted: event.reverted
      });
      if (fingerprints.get(event.id) === fingerprint) return false;
      fingerprints.set(event.id, fingerprint);
      return true;
    });

    if (changed.length) send({ type: 'bga-log-events', tableId: activeTableId, events: changed });
  }

  function startTracking(requestedTableId) {
    const tableId = extractTableId();
    if (!tableId || tableId !== requestedTableId) return { matched: false };

    activeTableId = tableId;
    send({ type: 'bga-table-connected', tableId });
    scan('snapshot');

    if (!observer) {
      observer = new MutationObserver(() => scan('live'));
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['class', 'style']
      });
    }
    return { matched: true };
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.channel !== CHANNEL || message.type !== 'start-table') return;
    sendResponse(startTracking(String(message.tableId || '')));
  });
})();
