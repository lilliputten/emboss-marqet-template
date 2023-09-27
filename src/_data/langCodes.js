const locales = require('./locales.js');
/** @type TLangList */
const langCodes = locales.map(({ code }) => code);
module.exports = langCodes;
