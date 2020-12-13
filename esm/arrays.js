/**
 * Mix multiple lists of strings into one list, by taking one item from each
 *    Takes unlimited number of arguments, but each must be an array!
 * @params strs1 {array} - array of strings
 * @params strs2 {array} - array of strings
 * @params strs3 {array} - array of strings
 * @returns {array} - new array (immutable), aggregated
 */
function arrays_mix (arrays) {
  let master_list = [];
  // find length of longest array
  let max_length = 0;
  for (let arr of arrays) {
    max_length = Math.max(arr.length, max_length);
  }

  // iterate by index
  // check item at each index in each array
  let index = 0;
  while (true) {
    // add one item from each array
    for (let arr of arrays) {
      if (arr[index]) {
        // add item if exists
        master_list.push(arr[index]);
      }
    }

    // next index
    index++;
    if (index >= max_length) {
      break
    }
  }
  return master_list
}

/**
 * arr.length alternative
 *      actually useful, because it checks for existence of ${arr}
 * @param arr {array}
 * @returns {number}
 */
function arr_length (arr) {
  return arr && arr.length ? arr.length : 0
}

/**
 * Create an array
 */
function arr_from_value (value, len) {
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr
}

/**
 * Find all differences between 2 arrays. What values in either one are NOT contained in the other.
 *    ```
 *    arrays_diff([1,2,3,4,5,6,7],[4,5,6,7,8,9])
 *    // [ 1, 2, 3, 8, 9 ]
 *    ```
 * @param a {array} - first array
 * @param b {array} - second array
 * @returns {array} - returns an array of values which only appear once, not in both arrays
 */
function arrays_diff (a=[], b=[]) {
  let combined = a.concat(b);
  return combined.filter( el => {
    if ( !a.includes(el) || !b.includes(el) )
      return el;
  });
}

/**
 * Subtract array B values from array A. Return remaining array A. Expects 2 parameters, each an array.
 *      NOTE: first array A must be the main one. Words also appearing in B will be removed
 * @param a {array} - values we care about. Analyze these, compared to b
 * @param b {array} - for comparison only. Array values unique to B will be ignored
 * @returns {array} - returns an array of values which appear in A but not B
 */
function arr_subtract (a=[], b=[]) {
  return a.filter(function (i) {
    return !b.includes(i)
  })
}

/**
 * Remove an item (if exact match string/number) from array
 */
function arr_remove_item (arr=[], item='') {
  return arr.filter(it=>it!==item)
}

/**
 * Similarities between arrays A and B
 * @param a {array}
 * @param b {array}
 * @returns {array} - returns an array with values which appear in both A and B
 */
function arr_includes (a, b) {
  return a.filter(function (i) {
    return b.includes(i)
  })
}

/**
 * Array with empty/falsy values removed.
 * @param arr {array}
 * @returns {array}
 */
function arr_truthy_values (arr) {
  return arr.filter((val) => !!val)
}


/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { arr_from_value, arr_includes, arr_length, arr_remove_item, arr_subtract, arr_truthy_values, arrays_diff, arrays_mix };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}
/* EXPORT FOR NODE */
export { arr_from_value, arr_includes, arr_length, arr_remove_item, arr_subtract, arr_truthy_values, arrays_diff, arrays_mix };
