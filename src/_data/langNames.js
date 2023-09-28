// @ts-check

const locales = require('./locales.js');

/** @type Record<TLang, string> */
const langNames = locales.reduce((result, { code, label }) => {
  result[code] = label;
  return result;
}, /** @type Record<TLang, string> */ ({}));

module.exports = langNames;
