'use strict';

var http = require('http');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var http__default = /*#__PURE__*/_interopDefaultLegacy(http);

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

var arr = /*#__PURE__*/Object.freeze({
  __proto__: null,
  arr_fill: arr_fill,
  arr_includes: arr_includes,
  arr_length: arr_length,
  arr_remove_item: arr_remove_item,
  arr_subtract: arr_subtract,
  arr_truthy_values: arr_truthy_values
});

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
function arr_length$1 (arr) {
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
function arr_subtract$1 (a=[], b=[]) {
  return a.filter(function (i) {
    return !b.includes(i)
  })
}

/**
 * Remove an item (if exact match string/number) from array
 */
function arr_remove_item$1 (arr=[], item='') {
  return arr.filter(it=>it!==item)
}

/**
 * Similarities between arrays A and B
 * @param a {array}
 * @param b {array}
 * @returns {array} - returns an array with values which appear in both A and B
 */
function arr_includes$1 (a, b) {
  return a.filter(function (i) {
    return b.includes(i)
  })
}

/**
 * Array with empty/falsy values removed.
 * @param arr {array}
 * @returns {array}
 */
function arr_truthy_values$1 (arr) {
  return arr.filter((val) => !!val)
}


/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { arr_from_value, arr_includes: arr_includes$1, arr_length: arr_length$1, arr_remove_item: arr_remove_item$1, arr_subtract: arr_subtract$1, arr_truthy_values: arr_truthy_values$1, arrays_diff, arrays_mix };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

var arrays = /*#__PURE__*/Object.freeze({
  __proto__: null,
  arr_from_value: arr_from_value,
  arr_includes: arr_includes$1,
  arr_length: arr_length$1,
  arr_remove_item: arr_remove_item$1,
  arr_subtract: arr_subtract$1,
  arr_truthy_values: arr_truthy_values$1,
  arrays_diff: arrays_diff,
  arrays_mix: arrays_mix
});

/**
 * Makes it safe to use properties of unknown objects. Checks if object exists before getting property.
 *    For example, calling `base1.obj3.property2`,
 *    if base1 or obj3 is not an object, or is not defined, this will crash.
 *    Wrap it to be safe `_re(base1, 'obj3', 'property2')`.
 * @param {object} obj - object that you are unsure about - if it is null/undefined, that's ok
 * @param {string} prop_child - name of property of obj
 * @param {string} prop_grandchild - name of property of prop_child
 * @param {string} prop_grandgrandchild - name of property of prop_grandchild
 * @returns {*} - value of prop_grandchild, or prop_child whichever is more specific - or undefined
 */
function obj_prop(obj, prop_child, prop_grandchild, prop_grandgrandchild) {
  if (typeof obj === "object") {
    if (prop_grandgrandchild) {
      if (typeof obj[prop_child] === "object") {
        if (typeof obj[prop_child][prop_grandchild] === "object") {
          return obj[prop_child][prop_grandchild][prop_grandgrandchild];
        }
      }
    } else if (prop_grandchild) {
      if (typeof obj[prop_child] === "object") {
        return obj[prop_child][prop_grandchild];
      }
    } else {
      return obj[prop_child];
    }
  }
}

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { obj_prop };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

var obj = /*#__PURE__*/Object.freeze({
  __proto__: null,
  obj_prop: obj_prop
});

/**
 * @param {object} obj1
 * @param {object} obj2
 * @returns {boolean} - true if equal
 */
const objects_are_equal = function objects_are_equal(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
};

/**
 * Create an object from array. Object's keys will made from Array's values.
 *    Use this to filter an array, keep only unique values, and maybe make something of them.
 *    This might be faster than using ES6 `[...new Set(...arr)]`, because it loops only once.
 * @param {array} arr - array values will be used, keys ignored
 * @param {*} value - any value to assign to each new item in object. Default value = true.
 * @returns {object} - from array values. Duplicate array values have been removed.
 */
const object_keys_from_array_values = function obj_from_array(arr, value=true) {
  let obj = {};
  for (let key of arr) {
    obj[key] = value;
  }
  return obj
};

/**
 * Return the first value in an object
 *    Iterate the object only once. Return the first value.
 * @param {object} obj
 * @returns value of first item in object
 */
const obj_first_value = function obj_first_value(obj) {
  for (let key in obj) { // doesn't loop, but that's the point!
    return obj[key]
  }
};

/**
 * Return the first entry (key and value tuple) in an object
 *    Iterate the object only once. Return the first entry.
 * @param {object} obj
 * @returns value of first item in object
 */
const obj_first_entry = function obj_first_value(obj) {
  for (let key in obj) { // doesn't loop, but that's the point!
    return [key, obj[key]]
  }
};

/**
 * @param {object} obj
 * @returns {boolean} - true if empty
 */
const obj_is_empty = function obj_is_empty(obj) {
  for (let prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false
    }
  }
  return true
};

/**
 * Parse JSON variable - recursively
 * @param {*} value - Any variable type
 * @returns {*} value - Intelligently parsed. Note: Will convert stringified number to type number!
 * NOTE: JSON can not stringify ES6 types Set and Map. Stringify/parse, changes value to empty object.
 * As a workaround, before stringifying, convert Set to Array, and Map to Array of tuples.
 */
const json_parse = function json_parse(value) {
  let variable;
  // Simple parse variable
  if (typeof value === "string" && (value.includes("[") || value.includes("{"))) {
    try {
      variable = JSON.parse(value); // JSON stringified array or object
    } catch (e) {
      try {
        variable = JSON.parse(value.replace(/[\r\n]+/g, "").replace(/[\t]+/g, " ")); // edge case
      } catch (e) {
        variable = value.includes("[") ? [] : {}; // broken JSON array or object
      }
    }
  } else if (value === "true" || value === "false" || "null" || "undefined") {
    // boolean/null should NOT have been stringified
    variable = value; // string
  } else {
    // simple value (JSON.parse converts numbers in quotes to type number)
    try {
      variable = JSON.parse(value); // number
    } catch (e) {
      variable = value; // string or undefined
    }
  }
  // Parse recursively - if Object/Array
  if (typeof variable === "object") {
    // iterate all props/values
    for (let key in variable) {
      if (!variable.hasOwnProperty(key)) continue
      // parse each prop/value
      variable[key] = json_parse(variable[key]);
    }
  }

  return variable
};

/**
 * Merge key/values of two objects into one - recursively
 * @param {object} obj1 - First object, the default one
 * @param {object} obj2 - Second object, will overwrite first!
 * @returns {object} obj - Combined object
 */
const obj_merge = function obj_merge(obj1, obj2) {
  // console.log('obj1', JSON.parse(JSON.stringify(obj1)));
  // console.log('obj2', JSON.parse(JSON.stringify(obj2)));
  let obj = {};
  // get keys from both objects
  let keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])];
  for (let key of keys) {
    // both assigned ? then merge
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      let obj1v = obj1[key];
      let obj2v = obj2[key];
      // if both objects have same key, then merge
      if (typeof obj1v !== typeof obj2v) {
        // oh no! same key, but value is different type!
        obj[key] = obj2v || obj1v;
        // console.warn('obj_merge(obj1, obj2) could not merge types: key/value type of each must be same: ', typeof obj1v, typeof obj2v);
      } else {
        // same type of value - lets try to combine...
        switch (typeof obj1v) {
          case "object":
            // type = object
            if (!!obj2v && !!obj1v) {
              // both are truthy...
              if (Array.isArray(obj2v) && Array.isArray(obj1v)) {
                // both arrays...
                obj[key] = [...new Set([...obj1[key], ...obj2[key]])];
              } else if (!Array.isArray(obj2v) && !Array.isArray(obj1v)) {
                // both dictionaries...
                obj[key] = obj_merge(obj1[key], obj2[key]);
              } else {
                // one is dictionary, other is array.
                // cannot combine unlike types. Use first...
                obj[key] = obj1[key];
              }
            } else {
              // at least one is null...
              obj[key] = obj2v || obj1v;
            }
            break
          default:
            // type = undefined, function, boolean, string, number
            obj[key] = obj2v || obj1v;
            break
        }
      }
    } else if (obj2.hasOwnProperty(key)) {
      // otherwise, use whichever one has a value
      obj[key] = obj2[key];
    } else {
      // otherwise, use whichever one has a value
      obj[key] = obj1[key];
    }
  }
  // console.log('obj', obj);
  return obj
};

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { json_parse, obj_first_entry, obj_first_value, obj_is_empty, obj_merge, object_keys_from_array_values, objects_are_equal };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

var objects = /*#__PURE__*/Object.freeze({
  __proto__: null,
  json_parse: json_parse,
  obj_first_entry: obj_first_entry,
  obj_first_value: obj_first_value,
  obj_is_empty: obj_is_empty,
  obj_merge: obj_merge,
  object_keys_from_array_values: object_keys_from_array_values,
  objects_are_equal: objects_are_equal
});

/** @module common-universal-scripts//functions/sort_words */

/**
 * Sort input array by number of characters in string (or number cast to string)
 * Will sort ASC by default. Pass second parameter to sort by DESC.
 * @param {array} arr - expects array of strings,
 *       but will also accept array of anything,
 *       will cast any child to string `arr[i].toString()`
 * @param {boolean} desc - sort descending?
 *       if false or undefined, will be sorted ascending
 * @returns {array} arr - also modifies original array to returned value!
 */
const sort_strings_by_length = function (arr, desc = false) {
	let sort_func = help_sort_strings_by_length.bind({desc});
	return arr.sort(sort_func);
};
/**
 * Sort input array NOT JUST by number of characters in string (like sort_strings_by_length),
 * but instead, sort by width of the "word".
 *       Words with many short letters ("i" and "l") will be treated as having fewer characters.
 *       Especially nice glyphs like "ll" or "li" will be preferred.
 *       Words with wide letters or awkward glyphs ("w" or "sch") will be given lower position.
 * @param {array} arr - expects array of strings,
 *       but will also accept array of anything,
 *       will cast any child to string `arr[i].toString()`
 * @param {boolean} desc - sort descending?
 *       if false or undefined, will be sorted ascending
 * @returns {array} arr - also modifies original array to returned value!
 */
const sort_strings_by_width = function (arr, desc = false) {
	let sort_func = help_sort_strings_by_width.bind({desc});
	return arr.sort(sort_func);
};

/*
 ***************************************************************************************
 * HELPER FUNCTIONS
 ***************************************************************************************
 */

/**
 * Usage: `[].sort(help_sort_strings_by_length)`
 * Note: NOT EXPORTED
 */
function help_sort_strings_by_length(a, b) {
	let desc = this.desc;
	if (desc) {
		return b.toString().length - a.toString().length;
	}
	return a.toString().length - b.toString().length;
}

/**
 * Usage: `[].sort(help_sort_strings_by_width)`
 *      String "width" is like "".length, but accounts for width of each character.
 *      It is not a JavaScript prototype, but is custom made from character map.
 * Note: NOT EXPORTED
 */
function help_sort_strings_by_width(a, b) {
	let desc = this.desc;
	let a_width = str_width(JSON.stringify(a || ''));
	let b_width = str_width(JSON.stringify(b || ''));
	if (desc) {
		return b_width - a_width;
	}
	return a_width - b_width;
}

/**
 * Get pixel width of characters in word
 * param {string|number|array} str
 *      works best with {string}, but will convert an array or number .toString()
 * returns {number} width - like ''.length, but accounts for width of each character
 */
function str_width(str) {
	str = (str || '').toString(); // cast to string
	let width = 0;
	for (let char of str) {
		width += char_width_plus[char.toLowerCase()] || 15; // default to high number if not English character
	}
	return width;
}
const char_width_plus = {
	'0': 7,
	'1': 4,
	'2': 6,
	'3': 7,
	'4': 7,
	'5': 7,
	'6': 7,
	'7': 6,
	'8': 7,
	'9': 7,
	'a': 6,
	'b': 7,
	'c': 6,
	'd': 7,
	'e': 6,
	'f': 2,
	'g': 6,
	'h': 6,
	'i': 3,
	'j': 2,
	'k': 5,
	'l': 3,
	'm': 9,
	'n': 6,
	'o': 6,
	'p': 6,
	'q': 6,
	'r': 3,
	's': 5,
	't': 3,
	'u': 6,
	'v': 5,
	'w': 9,
	'x': 5,
	'y': 5,
	'z': 5,
};


/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
	const browser = { sort_strings_by_length, sort_strings_by_width };
	// set up for export
	window.__ = window.__ || {};
	// flatten
	for (let func in browser) {
		window.__[func] = browser[func];
	}
}

var sort_words = /*#__PURE__*/Object.freeze({
  __proto__: null,
  sort_strings_by_length: sort_strings_by_length,
  sort_strings_by_width: sort_strings_by_width
});

/**
 * Used to sort a list of domain names by their domain extension - putting best ones higher in list.
 * @param arr {Array<String>} - list of strings - each string must contain at least one period "."
 *      NOTE: this function modifies the original array, using .sort()!
 * @param endings {array} - list of endings (domain extensions) to sort by. Best = first. Worst = last.
 * @param immutable {boolean} - Set this to `true` to make this a pure function, and immutable.
 *    Otherwise, THIS IS NOT A PURE FUNCTION. By default it modifies the original array.
 * @returns {array} - sorted array
 */
function sort_strings_by_extension(arr, endings, immutable = false) {
  if (!arr) return [];
  if (immutable) arr = [...arr];
  return arr.sort(sort_strings_by_extension__helper.bind(endings));
}
function sort_strings_by_extension__helper(a, b) {
  let a_score = this.indexOf(a.substr(a.indexOf(".") + 1));
  let b_score = this.indexOf(b.substr(b.indexOf(".") + 1));
  return a_score - b_score;
}

/**
 * Sort array by string length, ascending (or descending with false flag)
 * @param arr {Array<String|Number|Array>}
 * @param desc {boolean} - if true, will sort descending; default is false, ascending
 * @param immutable {boolean} - Set this to `true` to make this a pure function, and immutable.
 *    Otherwise, THIS IS NOT A PURE FUNCTION. By default it modifies the original array.
 * @returns {array}
 */
function sort_strings_by_length_asc(arr, desc = false, immutable = false) {
  if (!arr) return [];
  if (immutable) arr = [...arr];
  if (desc) {
    return arr.sort((a, b) => b.toString().length - a.toString().length);
  } else {
    return arr.sort((a, b) => a.toString().length - b.toString().length);
  }
}

/**
 * Algorithm sort = by Length + by Position in array
 * @param arr {Array.<String>} - array of strings
 * @param prefer_position {number} - number to multiply position rating, to make it more important than length
 * @param fix_min_length {number} - absolute minimum allowed to be used as min_length (default 4)
 *      ex: if 4, algorithm will treat str.length of 2,3,4 the same
 * @param immutable {boolean} - Set this to `true` to make this a pure function, and immutable.
 *    Otherwise, THIS IS NOT A PURE FUNCTION. By default it modifies the original array.
 * @return {Array.<String>} - array of strings
 */
function sort_strings_by_length_and_position(arr, prefer_position = 10, fix_min_length = 0, immutable = false) {
  if (!arr) return [];
  if (immutable) arr = [...arr];
  try {
    // prepare ratings by length
    let ascending = sort_strings_by_length_asc([...arr]);
    if (!ascending[0]) {
      return arr;
    }
    // prepare ratings by position
    let arr_positions = {};
    for (let i in arr) {
      let string = arr[i];
      arr_positions[string] = i;
    }
    // compile ratings
    // ${this} in [].sort()
    let that = {
      min_length: ascending[0].length,
      max_length: ascending[ascending.length - 1].length,
      min_position: 0,
      max_position: arr.length,
      delta_position: arr.length,
      arr_positions: arr_positions,
      prefer_position: prefer_position
    };
    // ${this} fix & finish
    if (fix_min_length) {
      that.fix_min_length = fix_min_length;
      that.min_length = fix_min_length;
    }
    that.delta_length = that.max_length - that.min_length;
    // done
    return arr.sort(sort_strings_by_length_and_position_asc__helper.bind(that));
  } catch (e) {
    console.error("invalid input array to sort_strings_by_length_and_position()");
    return arr;
  }
}
// helper function:
function sort_strings_by_length_and_position_asc__helper(a, b) {
  // if length is less than absolute minimum, use absolute minimum
  let a_length = a.length;
  let b_length = b.length;
  if (this.fix_min_length) {
    if (a.length < this.fix_min_length) a_length = this.fix_min_length;
    if (b.length < this.fix_min_length) b_length = this.fix_min_length;
  }
  // lower number == good (prefer shorter words)
  let a_rating_length = (a_length - this.min_length) / this.delta_length;
  let b_rating_length = (b_length - this.min_length) / this.delta_length;
  // lower number == good (lower index in array, so started closer to #1)
  let a_position_length = ((this.arr_positions[a] - this.min_position) / this.delta_position) * this.prefer_position;
  let b_position_length = ((this.arr_positions[b] - this.min_position) / this.delta_position) * this.prefer_position;
  // combine the two
  return a_rating_length + a_position_length - (b_rating_length + b_position_length);
}

/**
 * Sort strings by relevance (matching words in list)
 * Strings will be promoted if they match most words in list, and have fewest remaining characters.
 * @param arr {Array<String>} - list of strings
 *      (this function modifies the original array, using .sort())
 * @param matchList {array} - list of words -
 * @param immutable {boolean} - Set this to `true` to make this a pure function, and immutable.
 *    Otherwise, THIS IS NOT A PURE FUNCTION. By default it modifies the original array.
 * @returns {array} - sorted array
 */
function sort_strings_by_matches_in_list(arr, matchList, immutable = false) {
  if (!arr) return [];
  if (immutable) arr = [...arr];
  let ratings = {};
  for (let str of arr) {
    let string = str.replace(/[^a-z0-9]/gi, "");
    let count = 0;
    for (let word of matchList) {
      if (string.includes(word)) {
        count++;
        string = string.replace(word, "");
      }
    }
    ratings[str] = count;
  }
  return arr.sort(sort_strings_by_matches_in_list__helper.bind(ratings));
}
function sort_strings_by_matches_in_list__helper(a, b) {
  let a_score = this[a] || 0;
  let b_score = this[b] || 0;
  return b_score - a_score;
}

/**
 * Sort array of strings by separate dictionary of [{string:rating},]
 * However, will be sorted not in relation to other ratings, but in relation to zero 0.
 * If higher than 0, will be promoted. Lower than 0 will be demoted to back of list.
 * (Todo: File/Function should be renamed, to reflect this relation to zero!)
 * @param arr {Array.<String>} - array of strings
 * @param preferences {object} - dictionary of {string:rating}
 *      rating lt 0 == bad, gt 0 == good, if undefined, default 0
 * @param immutable {boolean} - Set this to `true` to make this a pure function, and immutable.
 *    Otherwise, THIS IS NOT A PURE FUNCTION. By default it modifies the original array.
 * @return {Array.<String>} - array of strings
 */
function sort_strings_by_rating(arr, preferences, immutable = false) {
  if (!arr) return [];
  if (immutable) arr = [...arr];
  // compile ratings
  let ratings = {};
  for (let string of arr) {
    // from dictionary of {string:rating}
    // good == above zero; bad == below zero;
    ratings[string] = preferences[string] || 0;
  }
  return arr.sort(sort_strings_by_rating__helper.bind(ratings));
}
// helper function:
function sort_strings_by_rating__helper(a, b) {
  let a_rating = this[a];
  let b_rating = this[b];
  // prefer higher number
  // if b is higher, then rate it better than a
  return b_rating - a_rating;
}

/**
 * Sort array of strings by separate dictionary of [{string:rating},], and
 * also by position in array. Items at front of array will be rated higher.
 * @param arr {Array.<String>} - array of strings
 * @param ratings {object} - dictionary of {string:rating}
 *      ratings does not have to contain an entry for each arr item
 *          if missing, will be given default 0
 *      likewise, it may contain more entries than arr,
 *          extras will be ignored
 * @param multiply_position {number} - make position x times more important than rating
 * @param immutable {boolean} - Set this to `true` to make this a pure function, and immutable.
 *    Otherwise, THIS IS NOT A PURE FUNCTION. By default it modifies the original array.
 * @return {Array.<String>} - array of strings
 */
function sort_strings_by_rating_and_position(arr, ratings, multiply_position = 1, immutable = false) {
  if (!arr) return [];
  if (immutable) arr = [...arr];
  let that = {};

  // ratings
  that.min_rating = null;
  that.max_rating = null;
  that.ratings = ratings;
  for (let str in ratings) {
    let rate = ratings[str];
    // compare ratings to each other
    if (that.min_rating === null || rate < that.min_rating) {
      that.min_rating = rate;
    }
    if (that.max_rating === null || rate > that.max_rating) {
      that.max_rating = rate;
    }
  }
  that.delta_rating = that.max_rating - that.min_rating;
  that.median_rating = that.min_rating + that.delta_rating / 2;

  // prepare position indexes
  that.min_index = 0;
  that.max_index = arr.length - 1;
  that.indexes = {};
  for (let i in arr) {
    // count up - first item = 0, last item = (length-1)
    let string = arr[i];
    that.indexes[string] = i;
  }
  that.delta_index = that.max_index - that.min_index;
  that.multiply_position = multiply_position;

  // sort
  return arr.sort(sort_strings_by_rating_and_position__helper.bind(that));
}

// helper function:
function sort_strings_by_rating_and_position__helper(a, b) {
  // higher == better
  // normalized to 0-1 range
  // highest rating gets 1, lowest rating gets 0
  let a_rating =
    (this.delta_rating -
      (this.max_rating - (typeof this.ratings[a] !== "undefined" ? this.ratings[a] : this.median_rating))) /
    this.delta_rating;
  let b_rating =
    (this.delta_rating -
      (this.max_rating - (typeof this.ratings[b] !== "undefined" ? this.ratings[b] : this.median_rating))) /
    this.delta_rating;

  // higher == better
  // normalized to 0-1 range
  // lowest index gets 1, highest index gets 0
  // (multiply_position to make position score more important than rating score)
  let a_index = ((this.max_index - this.indexes[a]) / this.delta_index) * this.multiply_position;
  let b_index = ((this.max_index - this.indexes[b]) / this.delta_index) * this.multiply_position;

  // combine the two
  // if b is higher, then sort it closer to front of array compared to a
  return b_rating + b_index - (a_rating + a_index);
}

/**
 * NOT [].sort(). Simply combines multiple arrays, one item from each array at a time.
 * Like taking two decks of cards, and making one double deck, by taking one card at a time from each deck.
 * But can be more than 2 arrays! Pass in as many as needed. Will take one item from each, at a time.
 * @param arr1 {Array.<String>} - array of strings
 * @param arr2 {Array.<String>} - array of strings
 * @return {Array.<String>} - array of strings, combined!
 */
function sort_strings_combine_lists(arr1, arr2) {
  if (!arr1 && !arr2) return [];
  if (!arr1 && arr2) return arr2;
  if (arr1 && !arr2) return arr1;
  let list = new Set();

  /*
   * setup pointers (will be incremented each time new item is taken from array)
   */
  let ai = {};
  for (let i in arguments) {
    // will be incremented (ai[i]++) before each use
    ai[i] = -1; // on first use will === 0
  }

  /*
   * iterate all passed-in arrays, one by one, take one new item at a time
   */
  for (let y = 0; y < 50; y++) {
    for (let i in arguments) {
      let arr = arguments[i];
      let str = arr[ai[i]++];
      if (str) {
        list.add(str);
      }
    }
  }

  // console.log('sort_strings_combine_lists list', list);
  return [...list];
  // return arr1;
}

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = {
    sort_strings_by_extension,
    sort_strings_by_length_and_position,
    sort_strings_by_length_asc,
    sort_strings_by_matches_in_list,
    sort_strings_by_rating,
    sort_strings_by_rating_and_position,
    sort_strings_combine_lists
  };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

var sort_strings = /*#__PURE__*/Object.freeze({
  __proto__: null,
  sort_strings_by_extension: sort_strings_by_extension,
  sort_strings_by_length_and_position: sort_strings_by_length_and_position,
  sort_strings_by_length_asc: sort_strings_by_length_asc,
  sort_strings_by_matches_in_list: sort_strings_by_matches_in_list,
  sort_strings_by_rating: sort_strings_by_rating,
  sort_strings_by_rating_and_position: sort_strings_by_rating_and_position,
  sort_strings_combine_lists: sort_strings_combine_lists
});

/**
 * Sort array of objects by property
 *    NOTE: this is just like _.sortBy() but can only sort by one property instead of multiple
 *    This is simply a simplified copy of `sort_objects_by_property_and_position()`
 *    ```
 *      let list = [{name:'Pasha',age:8}, {name:'Masha',age:9}]
 *      sort_objects_by_property(list, 'age') // Masha will move up to first place
 *    ```
 *    Like `sort_objects_by_property_and_position()`, but without caring about the position.
 *    NOTE: your original array will be modified. Use [...arr] destructuring to keep immutable.
 * @param arr {Array.<Object>} - array of objects to be sorted
 * @param prop1_key {string} - property to use, to sort by. Each object in array must contain this key
 * @param prop1_asc {boolean} - by default, will sort DESC, but if this is true, will sort ASC
 * @param immutable {boolean} - Set this to `true` to make this a pure function, and immutable.
 *    Otherwise, THIS IS NOT A PURE FUNCTION. By default it modifies the original array.
 * @return {Array.<Object>} - array of objects, sorted
 */
function sort_objects_by_property(arr, prop1_key, prop1_asc = false, immutable=false) {
  if (!arr) return []
  if (immutable) arr = [...arr];
  return arr.sort(sort_objects_by_property__helper.bind({ arr, prop1_key, prop1_asc }));
}// helper function:
function sort_objects_by_property__helper(a, b) {
  // sort by rating
  let a_rating = a[this.prop1_key];
  let b_rating = b[this.prop1_key];
  // sort order
  if (this.prop1_asc) {
    // prefer lower number
    // if b is lower, then rate it better than a
    return a_rating - b_rating;
  } else {
    // prefer higher number
    // if b is higher, then rate it better than a
    return b_rating - a_rating;
  }
}

/**
 * Sort array of strings by separate dictionary of [{string:rating},], and
 * also by position in array. Items at front of array will be rated higher.
 * @param arr {Array.<String>} - array of strings
 * @param rating_key {string} - which property of object to use as sort rating (must be a number)
 * @param multiply_position {number} - make position x times more important than rating
 * @param immutable {boolean} - Set this to `true` to make this a pure function, and immutable.
 *    Otherwise, THIS IS NOT A PURE FUNCTION. By default it modifies the original array.
 * @return {Array.<String>} - array of strings
 */
function sort_objects_by_property_and_position (arr, rating_key, multiply_position = 1, immutable=false) {
  if (!arr) return []
  if (immutable) arr = [...arr];
  let that = {};

  // rating_key
  that.min_rating = null;
  that.max_rating = null;
  that.rating_key = rating_key;
  for (let obj of arr) {
    let rate = obj[rating_key];
    // compare ratings to each other
    if (that.min_rating === null || rate < that.min_rating) {
      that.min_rating = rate;
    }
    if (that.max_rating === null || rate > that.max_rating) {
      that.max_rating = rate;
    }
  }
  that.delta_rating = that.max_rating - that.min_rating;
  that.median_rating = that.min_rating + (that.delta_rating/2);

  // prepare position
  that.min_index = 0;
  that.max_index = arr.length - 1;
  for (let i in arr) {
    // count up - first item = 0, last item = (length-1)
    arr[i].index = i;
  }
  that.delta_index = that.max_index - that.min_index;
  that.multiply_position = multiply_position;

  // sort
  return arr.sort(sort_strings_by_rating_and_position__helper$1.bind(that))
}
// helper function:
function sort_strings_by_rating_and_position__helper$1(a, b) {

  // higher == better
  // normalized to 0-1 range
  // highest rating gets 1, lowest rating gets 0
  let a_rating = (this.delta_rating - (this.max_rating - (typeof a[this.rating_key]!=='undefined' ? a[this.rating_key] : this.median_rating))) / this.delta_rating;
  let b_rating = (this.delta_rating - (this.max_rating - (typeof b[this.rating_key]!=='undefined' ? b[this.rating_key] : this.median_rating))) / this.delta_rating;

  // higher == better
  // normalized to 0-1 range
  // lowest index gets 1, highest index gets 0
  // (multiply_position to make position score more important than rating score)
  let a_index = ((this.max_index - a.index) / this.delta_index) * this.multiply_position;
  let b_index = ((this.max_index - b.index) / this.delta_index) * this.multiply_position;

  // combine the two
  // if b is higher, then sort it closer to front of array compared to a
  return (b_rating + b_index) - (a_rating + a_index)
}

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { sort_objects_by_property, sort_objects_by_property_and_position };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

var sort_objects = /*#__PURE__*/Object.freeze({
  __proto__: null,
  sort_objects_by_property: sort_objects_by_property,
  sort_objects_by_property_and_position: sort_objects_by_property_and_position
});

/*
 * ALL THE `strings_shuffle_...()` functions on this page WILL BE REFACTORED -
 * They are all too speficic, too many, too many names. Will be combined into one.
 */

/**
 * Flatten a matrix of strings -
 *    - generate list of all unique possible cases, from matrix of strings
 * ```
 *    matrix_flatten_to_strings([[1],[1,2],[1,2,3]])
 *    // ["1->1->1", "1->2->1", "1->1->2", "1->2->2", "1->1->3", "1->2->3"]
 * ```
 * @params matrix {array} - array of arrays of strings, in a matrix format
 * @params delimeter {string} - separate the combined values. Default: " "
 * @returns {array} - array of combined strings, separated by space
 */
function matrix_flatten_to_strings(matrix, delimeter = " ") {
  if (!matrix.length) {
    return [];
  } else if (matrix.length === 1) {
    return matrix[0];
  } else {
    let result = [];
    let allCasesOfRest = matrix_flatten_to_strings(matrix.slice(1), delimeter); // recursively push values
    for (let i = 0; i < allCasesOfRest.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        result.push(matrix[0][j] + delimeter + allCasesOfRest[i]);
      }
    }
    return result;
  }
}

/**
 * Shuffle some strings
 *    do not allow two strings to repeat which have the same last letter
 * @params strs {array} - array of strings
 * @returns {array} - new array (immutable), of shuffled strs
 */
function strings_shuffle_last_strict(strs) {
  let output = [];
  let prev_ll = ""; // last letter
  let prev_strs_length = 0;

  // while loop as long as it takes! (should only be for a few milliseconds)
  while (true) {
    // prevent infinite loop - if strs arr length has not been changed,
    // then we've reached a stalemate - no new items will be used
    if (strs.length === prev_strs_length) {
      break;
    } else {
      prev_strs_length = strs.length;
    }
    // each while loop, we'll take items out of the strs arr
    for (let i = 0; i < strs.length; i++) {
      // examine current item
      let str = strs[i];
      let ll = str[str.length - 1];
      // if current string starts with different letter than previous string,
      // add it to output. Else, ignore it, to examine it again next iteration
      if (prev_ll !== ll) {
        // add current item to output arr
        output.push(str);
        prev_ll = ll;
        // remove current item from input arr
        strs.splice(i, 1);
        i--;
      }
    }
  }

  return [...new Set([...output, ...strs])];
}

/**
 * Shuffle some strings
 *    do not allow two strings to repeat which have the same first letter or same last letter
 * @params strs {array} - array of strings
 * @returns {array} - new array (immutable), of shuffled strs
 */
function strings_shuffle_first_last_strict(strs) {
  let output = [];
  let prev_fl = ""; // first letter
  let prev_ll = ""; // last letter
  let prev_strs_length = 0;

  // while loop as long as it takes! (should only be for a few milliseconds)
  while (true) {
    // prevent infinite loop - if strs arr length has not been changed,
    // then we've reached a stalemate - no new items will be used
    if (strs.length === prev_strs_length) {
      break;
    } else {
      prev_strs_length = strs.length;
    }
    // each while loop, we'll take items out of the strs arr
    for (let i = 0; i < strs.length; i++) {
      // examine current item
      let str = strs[i];
      let fl = str[0];
      let ll = str[str.length - 1];
      // if current string starts with different letter than previous string,
      // add it to output. Else, ignore it, to examine it again next iteration
      if (prev_ll !== ll && prev_fl !== fl) {
        // add current item to output arr
        output.push(str);
        prev_fl = fl;
        prev_ll = ll;
        // remove current item from input arr
        strs.splice(i, 1);
        i--;
      }
    }
  }

  return [...new Set([...output, ...strs])];
}

/**
 * Shuffle list of strings
 *    do not allow two strings to repeat which have the same first letter or same last letter
 * @params strs {array} - array of strings
 * @returns {array} - new array (immutable), of shuffled strs
 */
function strings_shuffle_last(input_strs = []) {
  let memory_strs = [];
  let unique_strs = [];

  // console.time("1000 loops")
  let loops = 0;
  let old_strs = "";
  infinite_loop: while (loops < 1000) {
    loops++;

    // don't waste time on the same value
    let new_strs = input_strs[0] + memory_strs[0] + unique_strs[0];
    if (new_strs === old_strs) {
      break infinite_loop;
    }
    old_strs = new_strs;

    // no more inputs
    if (!input_strs.length && !memory_strs.length) {
      break infinite_loop;
    }

    // first time
    if (!unique_strs.length) {
      unique_strs.push(input_strs.shift());
      continue infinite_loop;
    }

    // last added string
    let unique_str = unique_strs[unique_strs.length - 1] || ""; // last added
    let unique_str_ll = unique_str[unique_str.length - 1] || "";

    let unique_str2 = unique_strs[unique_strs.length - 2] || ""; // 2nd to last added
    let unique_str2_ll = unique_str2[unique_str2.length - 1] || "";

    // insert new str
    // from memory
    if (memory_strs.length) {
      for (let str of memory_strs) {
        if (!str) continue;
        let str_ll = str[str.length - 1];
        if (str_ll === unique_str_ll && str_ll === unique_str2_ll) {
          // not unique
          continue;
        } else {
          // add unique
          unique_strs.push(memory_strs.shift());
          continue infinite_loop;
        }
      }
    }

    // insert new str
    // from input
    if (input_strs[0]) {
      let str = input_strs.shift();
      let str_ll = str[str.length - 1];
      if (str_ll === unique_str_ll && str_ll === unique_str2_ll) {
        // not unique
        memory_strs.push(str);
      } else {
        // add unique
        unique_strs.push(str);
      }
    }
  }
  // console.timeEnd("1000 loops")

  return [...unique_strs, ...memory_strs, ...input_strs];
}

/**
 * Shuffle list of strings
 *    do not allow two strings to repeat which have the same first letter or same last letter
 * @params strs {array} - array of strings
 * @returns {array} - new array (immutable), of shuffled strs
 */
function strings_shuffle_first_last(input_strs = []) {
  let memory_strs = [];
  let unique_strs = [];

  // console.time("1000 loops")
  let loops = 0;
  let old_strs = "";
  infinite_loop: while (loops < 1000) {
    loops++;

    // don't waste time on the same value
    let new_strs = input_strs[0] + memory_strs[0] + unique_strs[0];
    if (new_strs === old_strs) {
      break infinite_loop;
    }
    old_strs = new_strs;

    // no more inputs
    if (!input_strs.length && !memory_strs.length) {
      break infinite_loop;
    }

    // first time
    if (!unique_strs.length) {
      unique_strs.push(input_strs.shift());
      continue infinite_loop;
    }

    // last added string
    let unique_str = unique_strs[unique_strs.length - 1] || ""; // last added
    let unique_str_fl = unique_str[0] || "";
    let unique_str_ll = unique_str[unique_str.length - 1] || "";

    let unique_str2 = unique_strs[unique_strs.length - 2] || ""; // 2nd to last added
    let unique_str2_fl = unique_str2[0] || "";
    let unique_str2_ll = unique_str2[unique_str2.length - 1] || "";

    // insert new str
    // from memory
    if (memory_strs.length) {
      for (let str of memory_strs) {
        if (!str) continue;
        let str_fl = str[0];
        let str_ll = str[str.length - 1];
        if (
          (str_fl === unique_str_fl && str_fl === unique_str2_fl) ||
          (str_ll === unique_str_ll && str_ll === unique_str2_ll)
        ) {
          // not unique
          continue;
        } else {
          // add unique
          unique_strs.push(memory_strs.shift());
          continue infinite_loop;
        }
      }
    }

    // insert new str
    // from input
    if (input_strs[0]) {
      let str = input_strs.shift();
      let str_fl = str[0];
      let str_ll = str[str.length - 1];
      if (
        (str_fl === unique_str_fl && str_fl === unique_str2_fl) ||
        (str_ll === unique_str_ll && str_ll === unique_str2_ll)
      ) {
        // not unique
        memory_strs.push(str);
      } else {
        // add unique
        unique_strs.push(str);
      }
    }
  }
  // console.timeEnd("1000 loops")

  return [...unique_strs, ...memory_strs, ...input_strs];
}

/**
 * Shuffle some strings
 *    do not allow two strings to repeat which have the same last letter
 * @params strs {array} - array of strings
 * @returns {array} - new array (immutable), of shuffled strs
 */
function strings_shuffle_last3_strict(strs) {
  let output = [];
  let prev_ll = ""; // last letter
  let prev_strs_length = 0;

  // while loop as long as it takes! (should only be for a few milliseconds)
  while (true) {
    // prevent infinite loop - if strs arr length has not been changed,
    // then we've reached a stalemate - no new items will be used
    if (strs.length === prev_strs_length) {
      break;
    } else {
      prev_strs_length = strs.length;
    }
    // each while loop, we'll take items out of the strs arr
    for (let i = 0; i < strs.length; i++) {
      // examine current item
      let str = strs[i];
      let ll = str[str.length - 3] + str[str.length - 2] + str[str.length - 1];
      // if current string starts with different letter than previous string,
      // add it to output. Else, ignore it, to examine it again next iteration
      if (prev_ll !== ll) {
        // add current item to output arr
        output.push(str);
        prev_ll = ll;
        // remove current item from input arr
        strs.splice(i, 1);
        i--;
      }
    }
  }

  return [...new Set([...output, ...strs])];
}

/**
 * Shuffle list of strings
 *    do not allow two strings to repeat which have the same first letter or same last letter
 * @params strs {array} - array of strings
 * @returns {array} - new array (immutable), of shuffled strs
 */
function strings_shuffle_first_last_loose(input_strs = []) {
  let memory_strs = [];
  let unique_strs = [];

  // console.time("1000 loops")
  let loops = 0;
  let old_strs = "";
  infinite_loop: while (loops < 1000) {
    loops++;

    // don't waste time on the same value
    let new_strs = input_strs[0] + memory_strs[0] + unique_strs[0];
    if (new_strs === old_strs) {
      break infinite_loop;
    }
    old_strs = new_strs;

    // no more inputs
    if (!input_strs.length && !memory_strs.length) {
      break infinite_loop;
    }

    // first time
    if (!unique_strs.length) {
      unique_strs.push(input_strs.shift());
      continue infinite_loop;
    }

    // last added string
    let unique_str = unique_strs[unique_strs.length - 1] || ""; // last added
    let unique_str_fl = unique_str[0] || "";
    let unique_str_ll = unique_str[unique_str.length - 1] || "";

    let unique_str2 = unique_strs[unique_strs.length - 2] || ""; // 2nd to last added
    let unique_str2_fl = unique_str2[0] || "";
    let unique_str2_ll = unique_str2[unique_str2.length - 1] || "";

    let unique_str3 = unique_strs[unique_strs.length - 3] || ""; // 2nd to last added
    let unique_str3_fl = unique_str3[0] || "";
    let unique_str3_ll = unique_str3[unique_str3.length - 1] || "";

    // insert new str
    // from memory
    if (memory_strs.length) {
      for (let str of memory_strs) {
        if (!str) continue;
        let str_fl = str[0];
        let str_ll = str[str.length - 1];
        if (
          (str_fl === unique_str_fl && str_fl === unique_str2_fl && str_fl === unique_str3_fl) ||
          (str_ll === unique_str_ll && str_ll === unique_str2_ll && str_ll === unique_str3_ll)
        ) {
          // not unique
          continue;
        } else {
          // add unique
          unique_strs.push(memory_strs.shift());
          continue infinite_loop;
        }
      }
    }

    // insert new str
    // from input
    if (input_strs[0]) {
      let str = input_strs.shift();
      let str_fl = str[0];
      let str_ll = str[str.length - 1];
      if (
        (str_fl === unique_str_fl && str_fl === unique_str2_fl && str_fl === unique_str3_fl) ||
        (str_ll === unique_str_ll && str_ll === unique_str2_ll && str_ll === unique_str3_ll)
      ) {
        // not unique
        memory_strs.push(str);
      } else {
        // add unique
        unique_strs.push(str);
      }
    }
  }
  // console.timeEnd("1000 loops")

  return [...unique_strs, ...memory_strs, ...input_strs];
}

/**
 * Shuffle list of strings
 *    do not allow two strings to repeat which have the same first letter or same last letter
 * @params strs {array} - array of strings
 * @returns {array} - new array (immutable), of shuffled strs
 */
function strings_shuffle_last3(input_strs = []) {
  let memory_strs = [];
  let unique_strs = [];

  // console.time("1000 loops")
  let loops = 0;
  let old_strs = "";
  infinite_loop: while (loops < 1000) {
    loops++;

    // don't waste time on the same value
    let new_strs = input_strs[0] + memory_strs[0] + unique_strs[0];
    if (new_strs === old_strs) {
      break infinite_loop;
    }
    old_strs = new_strs;

    // no more inputs
    if (!input_strs.length && !memory_strs.length) {
      break infinite_loop;
    }

    // first time
    if (!unique_strs.length) {
      unique_strs.push(input_strs.shift());
      continue infinite_loop;
    }

    // last added string
    let unique_str = unique_strs[unique_strs.length - 1] || ""; // last added
    let unique_str_ll = unique_str[unique_str.length - 1] || "";

    let unique_str2 = unique_strs[unique_strs.length - 2] || ""; // 2nd to last added
    let unique_str2_ll = unique_str2[unique_str2.length - 1] || "";

    // insert new str
    // from memory
    if (memory_strs.length) {
      for (let str of memory_strs) {
        if (!str) continue;
        let str_ll = str[str.length - 1];
        if (str_ll === unique_str_ll && str_ll === unique_str2_ll) {
          // not unique
          continue;
        } else {
          // add unique
          unique_strs.push(memory_strs.shift());
          continue infinite_loop;
        }
      }
    }

    // insert new str
    // from input
    if (input_strs[0]) {
      let str = input_strs.shift();
      let str_ll = str[str.length - 1];
      if (str_ll === unique_str_ll && str_ll === unique_str2_ll) {
        // not unique
        memory_strs.push(str);
      } else {
        // add unique
        unique_strs.push(str);
      }
    }
  }
  // console.timeEnd("1000 loops")

  return [...unique_strs, ...memory_strs, ...input_strs];
}

/**
 * Shuffle list of strings
 *    do not allow two strings to repeat which have the same first letter or same last letter
 * @params strs {array} - array of strings
 * @returns {array} - new array (immutable), of shuffled strs
 */
function strings_shuffle_first3(input_strs = []) {
  let memory_strs = [];
  let unique_strs = [];

  // console.time("1000 loops")
  let loops = 0;
  let old_strs = "";
  infinite_loop: while (loops < 1000) {
    loops++;

    // don't waste time on the same value
    let new_strs = input_strs[0] + memory_strs[0] + unique_strs[0];
    if (new_strs === old_strs) {
      break infinite_loop;
    }
    old_strs = new_strs;

    // no more inputs
    if (!input_strs.length && !memory_strs.length) {
      break infinite_loop;
    }

    // first time
    if (!unique_strs.length) {
      unique_strs.push(input_strs.shift());
      continue infinite_loop;
    }

    // last added string
    let unique_str = unique_strs[unique_strs.length - 1] || ""; // last added
    let unique_str_fl = unique_str[0] || "";

    let unique_str2 = unique_strs[unique_strs.length - 2] || ""; // 2nd to last added
    let unique_str2_fl = unique_str2[0] || "";

    let unique_str3 = unique_strs[unique_strs.length - 3] || ""; // 3rd to last added
    let unique_str3_fl = unique_str3[0] || "";

    // insert new str
    // from memory
    if (memory_strs.length) {
      for (let str of memory_strs) {
        if (!str) continue;
        let str_fl = str[0];
        if (str_fl === unique_str_fl && str_fl === unique_str2_fl && str_fl === unique_str3_fl) {
          // not unique
          continue;
        } else {
          // add unique
          unique_strs.push(memory_strs.shift());
          continue infinite_loop;
        }
      }
    }

    // insert new str
    // from input
    if (input_strs[0]) {
      let str = input_strs.shift();
      let str_fl = str[0];
      if (str_fl === unique_str_fl && str_fl === unique_str2_fl && str_fl === unique_str3_fl) {
        // not unique
        memory_strs.push(str);
      } else {
        // add unique
        unique_strs.push(str);
      }
    }
  }
  // console.timeEnd("1000 loops")
  // console.log("unique_strs", unique_strs)
  return [...unique_strs, ...memory_strs, ...input_strs];
}

/**
 * Shuffle list of strings
 *    do not allow two strings to repeat which have the same first letter or same last letter
 * @params strs {array} - array of strings
 * @returns {array} - new array (immutable), of shuffled strs
 */
function strings_shuffle_first2(input_strs = []) {
  let memory_strs = [];
  let unique_strs = [];

  // console.time("1000 loops")
  let loops = 0;
  let old_strs = "";
  infinite_loop: while (loops < 1000) {
    loops++;

    // don't waste time on the same value
    let new_strs = input_strs[0] + memory_strs[0] + unique_strs[0];
    if (new_strs === old_strs) {
      break infinite_loop;
    }
    old_strs = new_strs;

    // no more inputs
    if (!input_strs.length && !memory_strs.length) {
      break infinite_loop;
    }

    // first time
    if (!unique_strs.length) {
      unique_strs.push(input_strs.shift());
      continue infinite_loop;
    }

    // last added string
    let unique_str = unique_strs[unique_strs.length - 1] || ""; // last added
    let unique_str_fl = unique_str[0] || "";

    let unique_str2 = unique_strs[unique_strs.length - 2] || ""; // 2nd to last added
    let unique_str2_fl = unique_str2[0] || "";

    // insert new str
    // from memory
    if (memory_strs.length) {
      for (let str of memory_strs) {
        if (!str) continue;
        let str_fl = str[0];
        if (str_fl === unique_str_fl && str_fl === unique_str2_fl) {
          // not unique
          continue;
        } else {
          // add unique
          unique_strs.push(memory_strs.shift());
          continue infinite_loop;
        }
      }
    }

    // insert new str
    // from input
    if (input_strs[0]) {
      let str = input_strs.shift();
      let str_fl = str[0];
      if (str_fl === unique_str_fl && str_fl === unique_str2_fl) {
        // not unique
        memory_strs.push(str);
      } else {
        // add unique
        unique_strs.push(str);
      }
    }
  }
  // console.timeEnd("1000 loops")
  // console.log("unique_strs", unique_strs)
  return [...unique_strs, ...memory_strs, ...input_strs];
}

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = {
    matrix_flatten_to_strings,
    strings_shuffle_first2,
    strings_shuffle_first3,
    strings_shuffle_first_last,
    strings_shuffle_first_last_loose,
    strings_shuffle_first_last_strict,
    strings_shuffle_last,
    strings_shuffle_last3,
    strings_shuffle_last3_strict,
    strings_shuffle_last_strict
  };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

var strings = /*#__PURE__*/Object.freeze({
  __proto__: null,
  matrix_flatten_to_strings: matrix_flatten_to_strings,
  strings_shuffle_first2: strings_shuffle_first2,
  strings_shuffle_first3: strings_shuffle_first3,
  strings_shuffle_first_last: strings_shuffle_first_last,
  strings_shuffle_first_last_loose: strings_shuffle_first_last_loose,
  strings_shuffle_first_last_strict: strings_shuffle_first_last_strict,
  strings_shuffle_last: strings_shuffle_last,
  strings_shuffle_last3: strings_shuffle_last3,
  strings_shuffle_last3_strict: strings_shuffle_last3_strict,
  strings_shuffle_last_strict: strings_shuffle_last_strict
});

/*
 PARSE CLI ARGS

 Example: `node myScript.js -f1 --flag2 var1=whatever`
 args = {
  __node__: '/usr/local/bin/node',
  __file__: '~/my/path/myScript.js',
  -f1: undefined,
  --flag2: undefined,
  var1: 'whatever',
 }
 Use args.hasOwnProperty('--flag2') to check for usage of
 flags which have no value.

 NOTE:
 Too keep things simple, limit arguments to the format shown
 in example above.
 This particular parser is not compatible with args values
 which come after a space ' ' instead of an '=' equal symbol.

 */
function parse_cli_args() {
  // BROWSER JS (front-end) DOES NOT HAVE CLI ARGUMENTS
  if (typeof process === "undefined") {
    return {}
  }
  // NODE JS (back-end)
  let args = {};
  for (let j = 0; j < process.argv.length; j++) {
    let argv = process.argv[j];
    if (j === 0) {
      // first arg is node path
      args["__node__"] = argv;
    } else if (j === 1) {
      // first arg is script path
      args["__file__"] = argv;
    } else {
      // read each CLI argument as {key:value}
      let arr = argv.split("=");
      // if no value (arr[1] is undefined), that's ok
      args[arr[0]] = arr[1];
    }
  }
  return args
}


/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { parse_cli_args };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

var cli = /*#__PURE__*/Object.freeze({
  __proto__: null,
  parse_cli_args: parse_cli_args
});

/**
 * If you want to execute a function LATER, but want to set its arguments NOW.
 * Useful with Promise.all or lists of values each of which you need to set now
 * (for some reason, IDK) but not ready to call the function yet
 * ```
 *    let toDoLater = __.call_later(console.warn, 'go for a run')
 * ```
 * @param {function} func - function you want to call later (to curry). It can be bound
 * @param {array} args - array of arguments (optional, but no need to use this without arguments)
 */
function call_later(func, args) {
  return function () {
    return func(args);
  };
}

/**
 * Compose unlimited number of functions.
 * One calls the original argument.
 * The output of that becomes the argument for the next function. Repeatedly.
 * NOTE: right now each function works with only 1 argument
 * ```
 *    var f = (x) => x + 5;
 *    var g = (x) => x + 7;
 *    var h = (x) => x + 10;
 *    var fgh = compose(f, g, h);
 *    console.log(fgh(5)) // 27
 * ```
 * @param first {function} - function to call first
 * @param funcs {function} - keep adding arguments (functions)
 * @returns {function(*=): *}
 */
function compose(first, ...funcs) {
  return function (x) {
    return funcs.reduce(function (accumulator, func) {
      return func(accumulator);
    }, first(x));
  };
}

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { call_later, compose };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

var curry = /*#__PURE__*/Object.freeze({
  __proto__: null,
  call_later: call_later,
  compose: compose
});

/**
 * Anonymous function wrapper - more reliable than ;(()=>{ ... })()
 *    Probem is anonymous function sometimes fails silently, even in try/catch !
 *    This try/catch implementation is more reliable.
 *    Also, don't need leading semicolon, if you're into not using semicolons.
 * @param tryCode
 * @param catchAction
 */
const try_catch = (tryCode, catchAction) => {
  try {
    // hopefully it works:
    tryCode();
  } catch (err) {
    // something broke!
    typeof cconsole === "object" ? cconsole.error(err) : console.error(err);
    // stop and inspect
    if (catchAction === "exit" && typeof process !== "undefined") {
      // exit - only on node
      process.exit();
    } else {
      // debug - will only stop script if you have DevTools opened
      debugger;
    }
  }
};

/*
 * EXPORT FOR BROWSER
 */
const browser$1 = { try_catch };
if (typeof window === "object") {
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser$1) {
    window.__[func] = browser$1[func];
  }
}

var functions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  try_catch: try_catch
});

const average = function (values) {
  let sum = values.reduce((previous, current) => (current += previous));
  return sum / values.length;
};

const mean = function (values) {
  values.sort((a, b) => a - b);
  let lowMiddle = Math.floor((values.length - 1) / 2);
  let highMiddle = Math.ceil((values.length - 1) / 2);
  return (values[lowMiddle] + values[highMiddle]) / 2;
};

const is_number = function (variable) {
  if (variable === null) {
    return false;
  }
  if (typeof variable === "string") {
    variable = Number(variable);
  }
  if (isNaN(variable)) {
    return false;
  }
  return true;
};

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { average, is_number, mean };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

var numbers = /*#__PURE__*/Object.freeze({
  __proto__: null,
  average: average,
  is_number: is_number,
  mean: mean
});

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

var promises = /*#__PURE__*/Object.freeze({
  __proto__: null,
  arr_each_promise_all: arr_each_promise_all,
  sleep: sleep
});

/**
 * Parse and combine POST data and URL params into JavaScript object
 * @param req {object} - IMPORTANT: does not have to be real api request. Can be simple object.
 * @param req.body {object} - key/value pairs, already parsed and ready to use
 * @param req.query {object} - object of key/value pairs from URL query string
 *    This function will decodeURIComponent then parse each value.
 *    These req.query values will override values from req.body!
 * @returns {{}} - combined keys/values. Original request object will NOT be modified.
 */
const aggregate_req_body_query = function (req) {
  let query = {};
  // body (POST data)
  if (req.body) {
    query = req.body;
  }
  // query (URL parameters)
  if (req.query) {
    for (let key in req.query) {
      let val = req.query[key];
      if (val === 0) {
        query[key] = 0;
        continue;
      }
      if (!val) continue;
      val = decodeURIComponent(val).trim();
      if (!val) continue;
      if (val === "undefined") {
        query[key] = "undefined";
        continue;
      }
      if (val === "null") {
        query[key] = "null";
        continue;
      }
      if (val === "true") {
        query[key] = true;
        continue;
      }
      if (val === "false") {
        query[key] = false;
        continue;
      }
      if (['"', "{", "["].includes(val[0])) {
        try {
          val = JSON.parse(val);
        } catch (e) {
          val = "";
        }
      }
      query[key] = val;
    }
  }
  // combined
  return query;
};

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { aggregate_req_body_query };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

var req = /*#__PURE__*/Object.freeze({
  __proto__: null,
  aggregate_req_body_query: aggregate_req_body_query
});

/**
 * Quick easy unique hash generator. Not secure or cryptographic.
 * Not guaranteed to be unique, but will almost always suffice.
 * Good for generating IDs based on text content.
 * Like when entering a new blog or content into a database, when you want to keep your content unique,
 * you can do `let post_id = str_hash(post.author+post.title+post.body)`.
 */
function str_hash(str) {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash + "";
}

function str_capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function str_sanitize_loosely(word) {
  return word
    .replace(/_-/g, " ")
    .replace(/[^\w ]+/g, "")
    .toLowerCase()
    .trim();
}
function str_sanitize_strictly(word) {
  return word
    .replace(/[^\w]+/g, "")
    .toLowerCase()
    .trim();
}

function str_insert(string = "", index = 0, insert = "") {
  return string.substring(0, index) + insert + string.substring(index, string.length);
}

/**
 * Trim a character other than whitespace
 * @param s {string} - string
 * @param c {string} - remove this character (or characters) from start/end
 * @returns {void | string}
 */
function str_trim_char(s, c) {
  if (c === "]") c = "\\]";
  if (c === "\\") c = "\\\\";
  return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "");
}

/**
 * Trim all non-alphabetical (not a-zA-Z) characters
 * @param str {string} - string
 * @returns {string}
 */
function str_trim_non_alpha(str) {
  return str.replace(new RegExp("^[^a-z]+|[^a-z]+$", "gi"), "");
}

function str_syllables_count(word) {
  word = word.toLowerCase(); //word.downcase!
  if (word.length <= 3) {
    return 1;
  } //return 1 if word.length <= 3
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ""); //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
  word = word.replace(/^y/, ""); //word.sub!(/^y/, '')
  let match = word.match(/[aeiouy]{1,2}/g);
  return match ? match.length : 0; //word.scan(/[aeiouy]{1,2}/).size
}

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = {
    str_capitalize,
    str_hash,
    str_insert,
    str_sanitize_loosely,
    str_sanitize_strictly,
    str_syllables_count,
    str_trim_char,
    str_trim_non_alpha
  };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

var string = /*#__PURE__*/Object.freeze({
  __proto__: null,
  str_capitalize: str_capitalize,
  str_hash: str_hash,
  str_insert: str_insert,
  str_sanitize_loosely: str_sanitize_loosely,
  str_sanitize_strictly: str_sanitize_strictly,
  str_syllables_count: str_syllables_count,
  str_trim_char: str_trim_char,
  str_trim_non_alpha: str_trim_non_alpha
});

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
  return qs
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
    if (!pair) continue
    let tuple = pair.split("=");
    let key = tuple[0];
    if (!key) continue
    obj[key] = tuple[1] || "";
  }
  // decode value
  for (let key in obj) {
    obj[key] = decodeURIComponent(obj[key] || "").trim();
  }
  // done
  return obj
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
  return str_trim_char(output, "&")
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
  if (typeof http__default['default'] === "object") {
    return new Promise(function (resolve) {
      const params = {
        method,
        headers
      };
      http__default['default']
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

var requests = /*#__PURE__*/Object.freeze({
  __proto__: null,
  http_ajax: http_ajax,
  http_get: http_get,
  http_post: http_post,
  http_put: http_put,
  load_script: load_script,
  parse_error_message: parse_error_message
});

const jss = function (val) {
  return JSON.stringify(val);
};

const jsp = function (val) {
  return JSON.parse(JSON.stringify(val));
};

/*
 * EXPORT FOR BROWSER
 */
const browser$2 = { jsp, jss };
if (typeof window === "object") {
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser$2) {
    window.__[func] = browser$2[func];
  }
}

var json = /*#__PURE__*/Object.freeze({
  __proto__: null,
  jsp: jsp,
  jss: jss
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

const syllable_count = function syllable_count(str) {
  if (!str) return 0;
  let original = str;
  str = str.replace("ue", "e");
  str = str.substr(0, str.length - 1);
  str = str.replace(/[^aeiouy]+/g, " ");
  let words = str
    .split(" ")
    .map((w) => w.trim())
    .filter((w) => !!w);
  let syllables = words.length;
  return syllables === 0 ? original.length : syllables;
};
const is_vowel = function syllable_count(str) {
  return ["a", "e", "i", "o", "u", "y"].includes(str);
};
const ends_in_vowel = function syllable_count(str) {
  return ["a", "e", "i", "o", "u", "y"].includes(str[str.length - 1]);
};

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { ends_in_vowel, is_vowel, syllable_count };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

var words = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ends_in_vowel: ends_in_vowel,
  is_vowel: is_vowel,
  syllable_count: syllable_count
});

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

module.exports = __;
