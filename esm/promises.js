const sleep = function(ms = 0) {
  return new Promise(r => setTimeout(r, ms))
};

/**
 * Calls a function on each item in array (like [].forEach but works with Promises)
 *    Returns a Promise which resolves when all your promises are done processing.
 *    NOTE: unlike Promise.all, this does not crash on rejected Promises
 *    NOTE: your responses may not come back in the same order as they were sent
 * @param {array<*>} array - array with any type of values
 * @param {function} fn - a function which returns a Promise
 *    each value from array will be fed into the fn, all executed concurrently
 * @return {Promise}
 */
function arr_each_promise_all(array, fn) {
  return Promise.all(array.map(function(item){
    return fn(item)
  }))
}

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { arr_each_promise_all, sleep };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}
/* EXPORT FOR NODE */
export { arr_each_promise_all, sleep };
