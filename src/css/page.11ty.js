const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

module.exports = class {
  async data() {
    const cssDir = path.join(__dirname);
    const rawFilepath = path.join(cssDir, 'page.css');

    return {
      permalink: `css/page.css`,
      rawFilepath,
      rawCss: fs.readFileSync(rawFilepath),
    };
  }

  async render({ rawCss, rawFilepath }) {
    return await postcss([
      // https://www.npmjs.com/package/postcss-strip-inline-comments -- ???
      require('postcss-strip-inline-comments'),
      require('postcss-simple-vars'),
      require('postcss-import'),
      // require('tailwindcss/nesting'),
      // @see https://tailwindcss.com/docs/using-with-preprocessors
      require('postcss-nested'),
      // require('postcss-nesting'),
      // postcss-nested-ancestors
      require('autoprefixer'),
      require('tailwindcss'),
      // require('cssnano'),
    ])
      .process(rawCss, { from: rawFilepath })
      .then((result) => result.css);
  }
};
