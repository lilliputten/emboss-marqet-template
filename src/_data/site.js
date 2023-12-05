const domainName = 'emboss.studio';
const baseURL = 'https://' + domainName;

// Dev mode?
const envDev = process.env.ELEVENTY_DEV;
const isDev = !!envDev;

module.exports = {
  isDev,
  showPagesMenu: isDev, // Show pages menu (debug only!)
  baseURL,
  domainName,
  author: domainName,
  email: 'info@' + domainName,
  phone: '+7 (800) 333-04-41',
  copyrightYear: '2023',
  // NOTE: Use i18n for common texts...
};
