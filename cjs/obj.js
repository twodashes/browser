'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.obj_prop = obj_prop;
