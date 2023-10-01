// const path = require('path');

const eleventy = require('@11ty/eleventy');
const pluginRss = require('@11ty/eleventy-plugin-rss');

const defaultLang = require('./src/_data/defaultLang.js');
const langCodes = require('./src/_data/langCodes.js');

const i18n = require('eleventy-plugin-i18n');

// const htmlmin = require('html-minifier');
const markdownIt = require('markdown-it');
const yaml = require('js-yaml');
const prettier = require('prettier');

/* // TODO: Dev mode?
 * const envDev = process.env.ELEVENTY_DEV;
 * const isDev = !!envDev;
 */

const translations = require('./src/_data/i18n');

module.exports = function (eleventyConfig) {
  // Enable subfolders for includes...
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true
  });

  // Plugins...
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(eleventy.EleventyHtmlBasePlugin);

  // i18n
  eleventyConfig.addPlugin(i18n, {
    // @see: https://github.com/adamduncan/eleventy-plugin-i18n
    translations,
    locales: langCodes,
    defaultLocale: defaultLang,
    fallbackLocales: {
      '*': defaultLang,
    },
  });

  eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents));

  // shortcode to render markdown from string => {{ STRING | markdown | safe }}
  eleventyConfig.addFilter('markdown', function (value) {
    // const markdown = require('markdown-it')({
    const markdown = markdownIt({
      html: true,
    });
    return markdown.render(value);
  });

  // rebuild on CSS changes
  eleventyConfig.addWatchTarget('./src/_includes/css/');
  eleventyConfig.addWatchTarget('./src/css/');

  // Markdown
  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true,
    }),
  );

  // create collections
  eleventyConfig.addCollection('sections', async (collection) => {
    return collection.getFilteredByGlob('./src/sections/*.md');
  });

  // STATIC FILES
  eleventyConfig.addPassthroughCopy({
    './src/static/': '/',
  });

  // TRANSFORM -- Minify HTML Output
  eleventyConfig.addTransform('prettier', function (content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
      const result = prettier.format(content, { parser: 'html' });
      /*
       * const result = htmlmin.minify(content, {
       *   useShortDoctype: true,
       *   removeComments: true,
       *   collapseWhitespace: true
       * });
       */
      return result;
    }
    return content;
  });

  /* // TRANSFORM -- Minify HTML Output
   * eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
   *   if (outputPath && outputPath.endsWith('.html')) {
   *     let minified = htmlmin.minify(content, {
   *       useShortDoctype: true,
   *       removeComments: true,
   *       collapseWhitespace: true
   *     });
   *     return minified;
   *   }
   *   return content;
   * });
   */

  return {
    dir: {
      input: 'src',
      output: 'build',
      data: './_data',
      includes: './_includes',
      layouts: './_layouts',
    },
    templateFormats: ['md', 'njk', '11ty.js'],
    htmlTemplateEngine: 'njk',
  };
};
