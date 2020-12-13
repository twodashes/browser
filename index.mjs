import * as arr from "./esm/arr.js";
import * as arrays from "./esm/arrays.js";
import * as obj from "./esm/obj.js";
import * as objects from "./esm/objects.js";
import * as sort_words from "./esm/sort_words.js";
import * as sort_strings from "./esm/sort_strings.js";
import * as sort_objects from "./esm/sort_objects.js";
import * as strings from "./esm/strings.js";
import * as cli from "./esm/cli.js";
import * as curry from "./esm/curry.js";
import * as functions from "./esm/etc.js";
import * as numbers from "./esm/numbers.js";
import * as promises from "./esm/promises.js";
import * as req from "./esm/req.js";
import * as requests from "./esm/requests.js";
import * as json from "./esm/json.js";
import * as string from "./esm/string.js";
import * as ui from "./esm/ui.js";
import * as urls from "./esm/urls.js";
import * as words from "./esm/words.js";

let all = {
  arr,
  arrays,
  obj,
  objects,
  sort_objects,
  sort_strings,
  sort_words,
  cli,
  curry,
  functions,
  numbers,
  promises,
  req,
  requests,
  json,
  string,
  strings,
  ui,
  urls,
  words
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
