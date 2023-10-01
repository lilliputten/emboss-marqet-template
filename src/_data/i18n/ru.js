const site = require('../site.js');

const siteName = 'Название сайта';
const companyName = 'Название компании';

/** @type TLngDef */
const ru = {
  // Test
  hello: 'Привет!',
  // General
  siteName: siteName, // Example
  site: {
    name: siteName,
    briefName: site.domainName,
    description: 'Описание сайта',
    author: 'Автор',
    // TODO: Keywords, etc
    meta: {
      // DEBUG: Example of different data formats
      metaName: 'Мета',
    },
  },
  company: {
    name: companyName,
    address: 'Адрес компании',
  },
  rubrics: {
    contacts: 'Контакты',
    account: 'Профиль',
    forClients: 'Клиентам',
    informations: 'Информация',
  },
  servicesMenu: {
    ourBlog: 'Наш блог',
    aboutOurShop: 'О нашем магазине',
    secureShopping: 'Безопасный шопинг',
    privacyPolicy: 'Политика конфиденциальности',
    deliveryInformations: 'Информация о доставке',
    contactUs: 'Связаться с нами',
    siteMap: 'Карта сайта',
    topSalesBestsellers: 'Лучшие продажи и бестселлеры',
    giftVouchers: 'Подарочные сертификаты',
    bestSellers: 'Бестселлеры',
    orderStatus: 'Статус заказа',
    myWishlist: 'Список желаний',
    deliveryAddress: 'Адрес доставки',
    orderHistory: 'История заказов',
    newsletter: 'Новостная рассылка',
    termsConditions: 'Правила и условия',
  },
  headerLinks: {
    myAccount: 'Профиль',
    myWishlist: 'Желания',
    logIn: 'Войти',
    homepage: 'Домашняя страница',
    homepages: 'Основные',
    testPage: 'Тестовая страница',
    productsGridList: 'Таблица/список продуктов',
    singleProductSidebar: 'Продукт (боковая панель)',
    singleProduct: 'Продукт',
    cartPage: 'Корзина',
    checkout: 'Оформить',
    payment: 'Платеж',
    showCart: 'Купить',
    men: 'Мужчины',
    women: 'Женщины',
    sports: 'Спорт',
    pages: 'Страницы',
    otherLinks: 'Другое',
    products: 'Продукция',
    enterKeyword: 'Введите текст...',
    learnMore: 'Узнать больше',
  },
  products: {
    toCart: 'Купить',
    wishlist: 'Отложить',
    discount50: '50% off', // Any longer text can't be fit in the circle.
    new: 'New',
    newExclam: 'New!',
    halfPrice: '50%',
    price: 'Цена',
    productsPerPage: 'Товаров на странице',
    show: 'Показать',
    collection: 'Коллекция',
    collections: 'Коллекции',
    kids: 'Дети',
    grid: 'Сетка',
    list: 'Список',
    yearsOld: 'Лет',
    sale: 'Sale!',
    addToCart: 'Добавить в корзину',
    all: 'Все',
    casualPersons: 'Случайные люди',
    categories: 'Категории',
    filter: 'Фильтр',
    learnMore: 'Узнать больше',
    priceFilter: 'Цена',
    sizeFilter: 'Размер',
    sortAZ: 'Сортировка от А до Я',
    sortByPrice: 'Сортировать по цене',
    ascending: 'Восходящий',
    descending: 'Нисходящий',
    sortZA: 'Сортировка от Я до А',
  },
  productsSample: {
    shoesAndClothes: 'Обувь и одежда',
    womanHighheelShoe: 'Женская обувь на высоком каблуке',
    classyDate: 'Классное свидание',
    colorfulCoolRunnigShoes: 'Красочные крутые кроссовки для бега',
    menShoes: 'Мужская обувь',
    otherStuff: 'Другие вещи',
    partyHard: 'Вечеринка',
    sexyClothes: 'Сексуальная одежда',
    sexyHighHeels: 'Сексуальные туфли на высоком каблуке',
    sexyNight: 'Сексуальная ночь',
    sportWears: 'Спортивная одежда',
    winterIsComing: 'Зима близко',
    womenShoes: 'Женская обувь',
  },
  newsletter: {
    signUp: 'Подпишитесь на нашу рассылку, чтобы получать лучшие предложения и новости.',
    enterEmail: 'Введите адрес электронной почты...',
  },
  sections: {
    bestSellers: 'Хиты <span class="bold">продаж</span>',
    featuredProducts: 'Рекомендуемые <span class="bold">товары</span>',
  },
};

module.exports = ru;
