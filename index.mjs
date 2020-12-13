import * as requests from "./esm/requests.js";
import * as ui from "./esm/ui.js";
import * as urls from "./esm/urls.js";

let all = {
  requests,
  ui,
  urls,
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

export default __;
