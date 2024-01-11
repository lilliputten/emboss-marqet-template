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

  // TODO: Add common variables?
  async render({ rawCss, rawFilepath }) {
    return await postcss([
      require('postcss-import'),
      // require('postcss-strip-inline-comments'), // https://www.npmjs.com/package/postcss-strip-inline-comments -- ???
      require('postcss-mixins'),
      require('postcss-simple-vars')({
        // @see https://github.com/postcss/postcss-simple-vars#options
        variables: require('./global-variables'),
        /* // DEBUG: Global css variables
         * onVariables(variables) {
         *   console.log('CSS Variables');
         *   console.log(JSON.stringify(variables, null, 2));
         * },
         */
      }),
      // require('postcss-media-variables'), // 1st call // @see https://github.com/WolfgangKluge/postcss-media-variables
      // require('postcss-custom-media'),
      // require('postcss-custom-properties'),
      // require('postcss-css-variables'), // Variables work for 'postcss-media-variables' but don't wqork in css body
      require('postcss-calc')({ mediaQueries: true }),
      // require('postcss-media-variables'), // 2nd call
      // require('tailwindcss/nesting'),
      require('postcss-nested'),
      // require('postcss-nesting'),
      require('autoprefixer'),
      require('tailwindcss'), // @see https://tailwindcss.com/docs/using-with-preprocessors
      // require('cssnano'), // Minimize css (TODO: Do it optionally?)
    ])
      .process(rawCss, {
        from: rawFilepath,
        parser: require('postcss-scss'),
        map: {
          // inline: false,
          // annotation: true,
        },
      })
      .then((result) => result.css);
  }
};
