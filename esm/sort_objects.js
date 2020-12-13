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
  return arr.sort(sort_strings_by_rating_and_position__helper.bind(that))
}
// helper function:
function sort_strings_by_rating_and_position__helper(a, b) {

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
/* EXPORT FOR NODE */
export { sort_objects_by_property, sort_objects_by_property_and_position };
