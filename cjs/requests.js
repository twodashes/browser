'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var urls = require('./urls.js');

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
  if (data && typeof urls.querystring_from_object === "function") {
    url = url + urls.querystring_from_object(data);
  }
  return fetch(url, {
    method: options.method, // *GET, POST, PUT, DELETE, etc.
    mode: options.cors, // no-cors, cors, *same-origin
    cache: options.cache, // no-cache, reload, force-cache, only-if-cached
    credentials: options.credentials, // include, *same-origin, omit
    headers: options.headers, // {}, {"Content-Type": "application/json; charset=utf-8"}
    redirect: options.redirect, // manual, *follow, error
    referrer: options.referrer // no-referrer, *client
  })
    .then((response) => response.json()) // parses response to JSON
    .then((response) => response.data || response); // parse message
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
      .then((response) => response.data || response);
  }
  /*
   * error:
   */
  if (typeof window === "object") {
    throw new Error("Sorry. Your browser does not support this feature.");
  }
}

exports.http_ajax = http_ajax;
exports.http_get = http_get;
exports.http_post = http_post;
exports.http_put = http_put;
exports.load_script = load_script;
