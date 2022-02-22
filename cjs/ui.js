'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.is_retina = is_retina;
