import http from 'http';
import './string.js';
import { querystring_from_object } from './urls.js';

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
 * Parse simple message string from HTTP JSON response, GraphQL, or Error() object
 *    Too many libraries to fetch HTTP requests, too many non-standard response formats.
 *    This handles Axios or standard XMLHTTPRequest, or an Error() object
 *    Supports either convention, of Twitter or Facebook
 *    Supports "non-legacy" format described in: https://www.mediawiki.org/wiki/API:Errors_and_warnings
 *    Response and parsed error can be any type. This will figure it out, with just a few if/else rules.
 *      NOTE:
 *      Unless you don't care about performance, this should NOT be used to detect if a variable is an error,
 *      only to parse the message string from some object/response which you know contains an error message.
 * @param {object} response - response from HTTP request or Error object
 * @returns {string} - nice readable text, meant for an alert popup in your front-end user interface
 */
function parse_error_message(response) {
  if (!response) return "!error";
  //
  // maybe input was a string, which is already an error message,
  // or null/undefined/false, whatever, just output that as is
  if (typeof response !== "object") return response.toString();
  //
  // content from HTTP response:
  let content = response.response
    ? response.response.data
      ? response.response.data
      : response.response
    : response.data || response;
  //
  // error object:
  let error = content;
  if (content.errors) error = content.errors[0] || content.errors;
  else if (content.warnings) error = content.warnings[0] || content.warnings;
  else if (content.error) error = content.error;
  else if (content.warning) error = content.warning;
  //
  // something weird:
  if (typeof error !== "object") return error.toString();
  //
  // JS Error object - cut off extra stuff about files/lines:
  if (error[0] && error[0].length > 3) return error[0];
  //
  // JSON object:
  return error.message || error.toString();
}

/**
 * GET request
 * @param {string} url - including protocol, not including query params
 * @param {object} data - url query params as a JS object
 * @param {object} options - override defaults:
 *    ```
 *    {mode:"cors", cache: "no-cache", redirect: "follow", referrer: "no-referrer", headers: {}}
 *    ```
 * @returns {Promise} - promise will resolve with response data
 */
function http_get(url = ``, data = {}, options = {}) {
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
    // time saving feature = build GET url params from JS object, passed like POST data
    if (method === "GET" && data && typeof querystring_from_object === "function") {
      url = url + querystring_from_object(data);
    }
    return fetch(url, options)
      .then((response) => response.json()) // parses response to JSON
      .then((response) => response.data);
  }
  /*
   * for back-end:
   */
  if (typeof http === "object") {
    return new Promise(function (resolve) {
      const params = {
        method,
        headers
      };
      http
        .request(url, params, (res) => {
          let data = '';
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            // response data
            // format by type
            if (
              data &&
              typeof data === "string" &&
              headers["Content-Type"] === "application/json; charset=utf-8"
            ) {
              data = JSON.parse(data);
            }
            // return
            resolve(data);
          });
          // error?
        })
        .on("error", (err) => {
          console.log("Error: ", err.message);
        });
    });
  }
  /*
   * error:
   */
  if (typeof window === "object") {
    throw new Error("Sorry. Your browser does not support this feature.");
  } else {
    throw new Error('Error: please import/require "http" Node module before calling http_ajax');
  }
}

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { http_ajax, http_get, http_post, http_put, load_script, parse_error_message };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}
/* EXPORT FOR NODE */
export { http_ajax, http_get, http_post, http_put, load_script, parse_error_message };
