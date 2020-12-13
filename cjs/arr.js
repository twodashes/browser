'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * arr.length alternative
 *      actually useful, because it checks for existence of ${arr}
 * @param {array} arr
 * @returns {number}
 */
function arr_length(arr) {
  return arr && arr.length ? arr.length : 0;
}

/**
 * Create a new array, and fill it with values (all same value)
 * @param {*} value - what value to assign to each item in array
 * @param {number} len - how long to make the array
 * @returns {array}
 */
function arr_fill(value, len) {
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}

/**
 * Subtract array B values from array A. Return remaining array A. Expects 2 parameters, each an array.
 *      NOTE: first array A must be the main one. Words also appearing in B will be removed
 * @param a {array} - values we care about. Analyze these, compared to b
 * @param b {array} - for comparison only. Array values unique to B will be ignored
 * @returns {array} - returns an array of values which appear in A but not B
 */
function arr_subtract(a = [], b = []) {
  return a.filter(function (i) {
    return !b.includes(i);
  });
}

/**
 * Remove an item (if exact match string/number) from array
 */
function arr_remove_item(arr = [], item = "") {
  return arr.filter((it) => it !== item);
}

/**
 * Similarities between arrays A and B
 * @param a {array}
 * @param b {array}
 * @returns {array} - returns an array with values which appear in both A and B
 */
function arr_includes(a, b) {
  return a.filter(function (i) {
    return b.includes(i);
  });
}

/**
 * Array with empty/falsy values removed.
 * @param arr {array}
 * @returns {array}
 */
function arr_truthy_values(arr) {
  return arr.filter((val) => !!val);
}

/*
 * EXPORT FOR BROWSER
 */
const browser = { arr_fill, arr_includes, arr_length, arr_remove_item, arr_subtract, arr_truthy_values };
if (typeof window === "object") {
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

exports.arr_fill = arr_fill;
exports.arr_includes = arr_includes;
exports.arr_length = arr_length;
exports.arr_remove_item = arr_remove_item;
exports.arr_subtract = arr_subtract;
exports.arr_truthy_values = arr_truthy_values;
