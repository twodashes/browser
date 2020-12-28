'use strict';

var requests = require('./requests-1730b253.js');
var ui = require('./ui-8929ba56.js');
var urls = require('./urls-5ecdad27.js');

let all = {
  requests: requests.requests,
  ui: ui.ui,
  urls: urls.urls,
};

/**
 * Export as a flat list
 */
let __ = { _map: {} };
for (let type in all) {
  __._map[type] = [];
  for (let func in all[type]) {
    __[func] = all[type][func];
    __._map[type].push(func);
  }
}

/**
 * Export for browser window
 */
if (typeof window === "object") {
  window.__ = __;
}

module.exports = __;
