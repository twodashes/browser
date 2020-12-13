'use strict';

/**
 * Convert JavaScript Object to URL querystring
 * ex: "?one=1&two=something"
 * @param {object} params - JS Object of key-value query params
 * @return {string} - starting with "?". Just that if empty object
 */
function querystring_from_object(params = {}) {
  let qs = Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
  if (qs) {
    qs = "?" + qs;
  }
  return qs;
}

/**
 * Parse the URL querystring to JavaScript Object
 * ex: "?one=1&two=something" => {one:1,two:'something'}
 * @param {string} str - starting with "?"
 * @return {object}
 */
function object_from_querystring(str = "") {
  // make object
  let obj = {};
  let pairs = str.replace("?", "").split("&");
  for (let pair of pairs) {
    if (!pair) continue;
    let tuple = pair.split("=");
    let key = tuple[0];
    if (!key) continue;
    obj[key] = tuple[1] || "";
  }
  // decode value
  for (let key in obj) {
    obj[key] = decodeURIComponent(obj[key] || "").trim();
  }
  // done
  return obj;
}

/**
 * Change a url (GET) parameter in queryString string
 * @param queryString {string} - ex: "?start=10&fruit=apple"
 * @param key {string} - ex: "fruit"
 * @param value {string} - ex: "species"
 * @return {string} - ex: "?start=10&species=apple"
 */
function querystring_replace_key_value(queryString, key, value) {
  // clean input
  queryString = str_trim_char(queryString, "&");
  queryString = str_trim_char(queryString, "?");
  let obj = JSON.parse(
    '{"' + decodeURI(queryString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
  );
  // replace value
  obj[key] = value;
  // rebuild queryString with replaced value
  let output = "?";
  for (let pair of Object.entries(obj)) {
    output += pair[0] + "=";
    output += pair[1] + "&";
  }
  return str_trim_char(output, "&");
}

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { object_from_querystring, querystring_from_object, querystring_replace_key_value };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

/*
 * PRIVATE FUNCTIONS BELOW
 */

// /univeral
function str_trim_char(s, c) {
  if (c === "]") c = "\\]";
  if (c === "\\") c = "\\\\";
  return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "");
}

var urls = /*#__PURE__*/Object.freeze({
  __proto__: null,
  object_from_querystring: object_from_querystring,
  querystring_from_object: querystring_from_object,
  querystring_replace_key_value: querystring_replace_key_value
});

/**
 * Parse Axios error message
 * @param {string} source - external URL to load
 * @param {object} beforeEl - DOM element before which to insert the new <script> tag
 * @param {object} scriptAttrs - object of attributes to add to the new <script> tag
 */
function load_script(source, beforeEl, scriptAttrs = {}) {
  if (!source) return false;
  if (typeof window !== "object" || typeof document !== "object") return false;
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");

    // force certain attributes
    script.async = true;
    script.defer = true;
    for (let key in scriptAttrs) {
      script[key] = scriptAttrs[key];
    }

    // NOTE: needs refactor: maybe .bind(script)
    function onloadHander(_, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = null;
        script.onreadystatechange = null;
        script = undefined;

        if (isAbort) {
          reject();
        } else {
          resolve();
        }
      }
    }

    script.onload = onloadHander;
    script.onreadystatechange = onloadHander;

    script.src = source;
    window.document.body.append(script);
    resolve(true);
  });
}

/**
 * GET request
 * @param {string} url - including protocol, not including query params
 * @param {object|undefined} data - url query params as a JS object
 * @param {object} options - override defaults:
 *    ```
 *    {mode:"cors", cache: "no-cache", redirect: "follow", referrer: "no-referrer", headers: {}}
 *    ```
 * @returns {Promise} - promise will resolve with response data
 */
function http_get(url = ``, data = undefined, options = {}) {
  options = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrer: "no-referrer",
    headers: {},
    ...options
  };
  if (data && typeof querystring_from_object === "function") {
    url = url + querystring_from_object(data);
  }
  return fetch(url + querystring_from_object(data), {
    method: options.method, // *GET, POST, PUT, DELETE, etc.
    mode: options.cors, // no-cors, cors, *same-origin
    cache: options.cache, // no-cache, reload, force-cache, only-if-cached
    credentials: options.credentials, // include, *same-origin, omit
    headers: options.headers, // {}, {"Content-Type": "application/json; charset=utf-8"}
    redirect: options.redirect, // manual, *follow, error
    referrer: options.referrer // no-referrer, *client
  })
    .then((response) => response.json()) // parses response to JSON
    .then((response) => response.data);
}

/**
 * POST request
 * @param {string} url
 * @param {object} data
 * @returns {Promise}
 */
function http_post(url = ``, data = {}) {
  // Auth
  // url = url;
  // Default options are marked with *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then((response) => response.json()); // parses response to JSON
}

/**
 * PUT request
 * @param {string} url
 * @param {object} data
 * @returns {Promise}
 */
function http_put(url = ``, data = {}) {
  // Auth
  // url = url;
  // Default options are marked with *
  return fetch(url, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then((response) => response.json()); // parses response to JSON
}

/**
 * Universal AJAX request coming soon...
 * @param url
 * @param method
 * @param data
 * @param headers
 * @param options
 * @returns {Promise}
 */
function http_ajax(url, method = "GET", data = undefined, headers = {}, options = {}) {
  data = data || undefined;
  headers = { "Content-Type": "application/json", ...headers };
  /*
   * for front-end:
   */
  if (typeof fetch === "function") {
    options = {
      method: method,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrer: "no-referrer",
      headers,
      ...options
    };
    return fetch(url, options)
      .then((response) => response.json()) // parses response to JSON
      .then((response) => response.data);
  }
  /*
   * error:
   */
  if (typeof window === "object") {
    throw new Error("Sorry. Your browser does not support this feature.");
  }
}

var requests = /*#__PURE__*/Object.freeze({
  __proto__: null,
  http_ajax: http_ajax,
  http_get: http_get,
  http_post: http_post,
  http_put: http_put,
  load_script: load_script
});

const is_retina = function () {
  // return boolean:
  return typeof window === 'object'
      ? window.matchMedia(
        '(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
      ).matches
      : false
};

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { is_retina };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

var ui = /*#__PURE__*/Object.freeze({
  __proto__: null,
  is_retina: is_retina
});

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

module.exports = __;
