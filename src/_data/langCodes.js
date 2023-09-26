const locales = require('./locales.js');
const langCodes = locales.map(({ code }) => code);
module.exports = langCodes;
