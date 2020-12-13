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
/* EXPORT FOR NODE */
export { sort_strings_by_extension, sort_strings_by_length_and_position, sort_strings_by_length_asc, sort_strings_by_matches_in_list, sort_strings_by_rating, sort_strings_by_rating_and_position, sort_strings_combine_lists };
