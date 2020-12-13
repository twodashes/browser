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
/* EXPORT FOR NODE */
export { average, is_number, mean };
