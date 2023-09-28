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
    ourBlog: 'Our blog',
    aboutOurShop: 'About our shop',
    secureShopping: 'Secure shopping',
    privacyPolicy: 'Privacy policy',
    deliveryInformations: 'Delivery informations',
    contactUs: 'Contact us',
    siteMap: 'Site map',
    topSalesBestsellers: 'Top sales & bestsellers',
    giftVouchers: 'Gift vouchers',
    bestSellers: 'Best sellers',
    orderStatus: 'Order status',
    myWishlist: 'My wishlist',
    deliveryAddress: 'Delivery address',
    orderHistory: 'Order history',
    newsletter: 'Newsletter',
    termsConditions: 'Terms & conditions',
  },
  headerLinks: {
    myAccount: 'My account',
    myWishlist: 'My wishlist',
    logIn: 'Log in',
    homepage: 'Homepage',
    homepages: 'Homepages',
    testPage: 'Test page',
    productsGridList: 'Products grid/list',
    singleProductSidebar: 'Single product (sidebar)',
    singleProduct: 'Single product',
    cartPage: 'Cart page',
    checkout: 'Checkout',
    payment: 'Payment',
    showCart: 'Show cart',
    men: 'Men',
    women: 'Women',
    sports: 'Sports',
    pages: 'Pages',
    otherLinks: 'Other links',
    products: 'Products',
    enterKeyword: 'Enter keyword here...',
    learnMore: 'Learn more',
  },
  products: {
    toCart: 'To cart',
    wishlist: 'Wishlist',
    discount50: '50% off',
    new: 'New',
  },
  newsletter: {
    signUp: 'Sign up for our newsletter to get best offers and news.',
    enterEmail: 'Enter your email here...',
  },
};

module.exports = en;
