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
/* EXPORT FOR NODE */
export { json_parse, obj_first_entry, obj_first_value, obj_is_empty, obj_merge, object_keys_from_array_values, objects_are_equal };
