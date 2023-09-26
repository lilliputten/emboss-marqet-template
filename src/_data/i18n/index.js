// @see: https://github.com/adamduncan/eleventy-plugin-i18n

const langCodes = require('../langCodes.js'); // ['ru', 'en'];

const ru = require('./ru.js');
const en = require('./en.js');

const lngObjs = {
  ru,
  en,
};

function getObjKeys(objs) {
  const keys = [];
  let hasScalars = false;
  objs.forEach((obj) => {
    if (typeof obj === 'object') {
      const objKeys = Object.keys(obj);
      objKeys.forEach((key) => {
        if (!keys.includes(key)) {
          keys.push(key);
        }
      });
    } else {
      hasScalars = true;
    }
  });
  if (hasScalars && !keys.includes('_')) {
    keys.push('_');
  }
  keys.sort();
  return keys;
}

function mergeLngObjs(lngObjs) {
  const objs = Object.values(lngObjs);
  const keys = getObjKeys(objs);
  const result = {};
  keys.forEach((key) => {
    let hasObjects = false;
    let keyResult = langCodes.reduce((res, lng) => {
      const obj = lngObjs[lng];
      const val = key === '_' && typeof obj !== 'object' ? obj : obj && obj[key];
      if (val != undefined) {
        if (typeof val === 'object') {
          hasObjects = true;
        }
        res[lng] = val;
      }
      return res;
    }, {});
    /* console.log('[mergeLngObjs]', {
     *   keyResult,
     *   key,
     *   hasObjects,
     * });
     */
    if (hasObjects) {
      // Merge containing objects...
      keyResult = mergeLngObjs(keyResult);
    }
    result[key] = keyResult;
  });
  return result;
}

const result = mergeLngObjs(lngObjs);

/* console.log('[src/_data/i18n/index.js]', {
 *   lngObjs,
 *   result,
 * });
 */

module.exports = result;

/* // Data lang sample:
module.exports = {
  // General
  website: {
    en: 'Website',
    ru: 'Вебсайт',
  },
  select_language: {
    en: 'Select language',
    ru: 'Выбрать язык',
  },

  // Greetings
  hello: {
    en: 'Hello',
    ru: 'Привет',
  },
  hello_name: {
    en: 'Hello, {{ name }}!',
    ru: 'Привет, {{ name }}!',
  },

  // Navigation
  homepage: {
    en: 'Homepage',
    ru: 'Главная',
  },
  posts: {
    en: 'Posts',
    ru: 'Публикации',
  },

  // Nested organisation example
  actions: {
    click: {
      en: 'Click',
      ru: 'Нажать',
    },
    loading: {
      en: 'Loading',
      ru: 'Загрузка',
    },
  },
};
*/
