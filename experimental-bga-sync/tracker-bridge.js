(() => {
  const CHANNEL = 'qmg-south-front-bga-sync';
  if (!document.getElementById('ui-app-title')) return;

  function postToTracker(type, payload = {}) {
    window.postMessage({ channel: CHANNEL, source: 'qmg-bga-bridge', type, payload }, '*');
  }

  function sendToBackground(type, payload = {}) {
    chrome.runtime.sendMessage({ channel: CHANNEL, type, payload }, response => {
      if (chrome.runtime.lastError) {
        postToTracker('sync-error', { message: chrome.runtime.lastError.message || 'The BGA companion is unavailable.' });
        return;
      }
      if (response?.type) postToTracker(response.type, response.payload || {});
    });
  }

  window.addEventListener('message', event => {
    if (event.source !== window) return;
    const message = event.data || {};
    if (message.channel !== CHANNEL || message.source !== 'qmg-tracker') return;
    sendToBackground(message.type, message.payload || {});
  });

  postToTracker('bridge-ready', { version: '0.1.0' });
})();
