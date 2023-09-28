// @ts-check

const locales = require('./locales.js');

/** @type TLang[] */
const langCodes = locales.map(({ code }) => code);

module.exports = langCodes;
