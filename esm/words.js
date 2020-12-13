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
/* EXPORT FOR NODE */
export { ends_in_vowel, is_vowel, syllable_count };
