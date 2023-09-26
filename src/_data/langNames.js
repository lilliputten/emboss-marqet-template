const locales = require('./locales.js');
const langNames = locales.reduce((result, { code, label }) => {
  result[code] = label;
  return result;
}, {});
module.exports = langNames;
