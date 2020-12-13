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

/*
 * EXPORT FOR NODE
 */
export { str_capitalize, str_hash, str_insert, str_sanitize_loosely, str_sanitize_strictly, str_syllables_count, str_trim_char, str_trim_non_alpha };
