const site = require('../site.js');

const siteName = 'Site name';
const companyName = 'Company name';

/** @type TLngDef */
const en = {
  // Test
  hello: 'Hello!',
  // General
  siteName: siteName, // Example
  site: {
    name: siteName,
    briefName: site.domainName,
    description: 'Site description',
    author: 'Site author',
    // TODO: Keywords, etc
    meta: 'Meta', // DEBUG:Example of different data formats
  },
  company: {
    name: companyName,
    address: 'Company address',
  },
  rubrics: {
    contacts: 'Contacts',
    account: 'Your account',
    forClients: 'Customer care',
    about: 'About us',
    informations: 'Informations',
  },
  servicesMenu: {
    ourBlog: 'Our Blog',
    aboutOurShop: 'About Our Shop',
    secureShopping: 'Secure Shopping',
    privacyPolicy: 'Privacy Policy',
    deliveryInformations: 'Delivery Informations',
    contactUs: 'Contact Us',
    siteMap: 'Site Map',
    topSalesBestsellers: 'Top Sales & Bestsellers',
    giftVouchers: 'Gift Vouchers',
    bestSellers: 'Best Sellers',
    orderStatus: 'Order Status',
    myWishlist: 'My Wishlist',
    deliveryAddress: 'Delivery Address',
    orderHistory: 'Order History',
    newsletter: 'Newsletter',
    termsConditions: 'Terms & conditions',
  },
};

module.exports = en;
