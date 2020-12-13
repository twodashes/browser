const jss = function (val) {
  return JSON.stringify(val);
};

const jsp = function (val) {
  return JSON.parse(JSON.stringify(val));
};

/*
 * EXPORT FOR BROWSER
 */
const browser = { jsp, jss };
if (typeof window === "object") {
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}
/* EXPORT FOR NODE */
export { jsp, jss };
