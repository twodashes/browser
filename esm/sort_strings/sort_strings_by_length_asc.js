/**
 * Sort array by string length, ascending (or descending with false flag)
 * @param arr {Array<String|Number|Array>}
 * @param desc {boolean} - if true, will sort descending; default is false, ascending
 * @param immutable {boolean} - Set this to `true` to make this a pure function, and immutable.
 *    Otherwise, THIS IS NOT A PURE FUNCTION. By default it modifies the original array.
 * @returns {array}
 */
export default function sort_strings_by_length_asc(arr, desc = false, immutable=false) {
  if (!arr) return []
  if (immutable) arr = [...arr]
  if (desc) {
    return arr.sort((a, b) => b.toString().length - a.toString().length)
  } else {
    return arr.sort((a, b) => a.toString().length - b.toString().length)
  }
};
