'use strict';

/**
 * GET request
 * @param {string} url - including protocol, not including query params
 * @param {object} options - override defaults:
 * @param {string|boolean} options.cache - see browser fetch documentation - additionally:
 *    true - use cached data - expires when the server is restarted
 *    false - do not cache - prevent fetch/http/browser/node from caching
 *    ```
 *    {mode:"cors", cache: "no-cache", redirect: "follow", referrer: "no-referrer", headers: {}}
 *    ```
 * @param {string} options.method - will be overridden to "GET"
 * @returns {Promise} - promise will resolve with response data
 */
async function http_get(url = ``, options = {}) {
  options.method = "GET";
  return http_ajax(url, options);
}

/**
 * POST request
 * @param {string} url
 * @param {*} data
 * @returns {Promise}
 */
function http_post(url = ``, data = {}) {
  return http_ajax(url, {method:"POST",body:data});
}

/**
 * PUT request
 * @param {string} url
 * @param {*} data
 * @returns {Promise}
 */
function http_put(url = ``, data = {}) {
  return http_ajax(url, {method:"PUT",body:data});
}

/**
 * DELETE request
 * @param {string} url
 * @param {*} data
 * @returns {Promise}
 */
function http_delete(url = ``, data = {}) {
  return http_ajax(url, {method:"DELETE",body:data});
}
async function http_ajax(url = ``, options = {}) {
  if (typeof fetch !== "function") {
    console.log("fetch is not a function :(");
    return;
  }
  /*
   * First try to get it from cache
   */
  // let method = options.method ? options.method.toUpperCase() : "GET";
  // if (method === "GET" || options.cache === true) {
  // }
  /*
   * fetch the url
   */
  if (method !== "GET") {
    if (!options.body) {
      options.body = "";
    } else if (typeof options.body !== "string") {
      options.body = JSON.stringify(options.body); // body data type must match "Content-Type" header
    }
  }
  let params = {
    method: method,
    mode: "cors",
    cache: options.cache === false ? "no-cache" : typeof options.cache === "string" ? options.cache : "default",
    credentials: "same-origin",
    redirect: "follow",
    referrer: "no-referrer",
    headers: {},
    ...options
  };
  let res = await fetch(url, {
    method: params.method, // *GET, POST, PUT, DELETE, etc.
    mode: params.cors, // no-cors, cors, *same-origin
    cache: params.cache, // no-cache, reload, force-cache, only-if-cached
    credentials: params.credentials, // include, *same-origin, omit
    headers: params.headers, // {}, {"Content-Type": "application/json; charset=utf-8"}
    redirect: params.redirect, // manual, *follow, error
    referrer: params.referrer // no-referrer, *client
  });
  let data;
  if (typeof res.json === "function") {
    data = await res.json();
  } else {
    data = res;
  }
  let output = data.data || data;
  /*
   * Save to cache
   */
  // if (params.method === "GET" && output && options.cache === true) {
  // }
  return output;
}

var requests = /*#__PURE__*/Object.freeze({
  __proto__: null,
  http_get: http_get,
  http_post: http_post,
  http_put: http_put,
  http_delete: http_delete
});

exports.http_delete = http_delete;
exports.http_get = http_get;
exports.http_post = http_post;
exports.http_put = http_put;
exports.requests = requests;
