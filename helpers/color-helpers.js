const tinycolor2 = require('tinycolor2');

/** Create color variants set from basic (500) color
 * @param {String} color
 * @return {Object} colorSet
 */
function createColorVariants(color /* : string */) {
  const colorObj = tinycolor2(color);
  const compareColor = colorObj.clone().darken(10); // Use a little darken color to search for contrast color
  const contrastText = tinycolor2.mostReadable(compareColor, ['#000', '#fff']);
  const variants = {
    50: colorObj.clone().lighten(60).toHexString(),
    100: colorObj.clone().lighten(40).toHexString(),
    200: colorObj.clone().lighten(20).toHexString(),
    300: colorObj.clone().lighten(10).toHexString(),
    400: colorObj.clone().lighten(5).toHexString(),
    500: colorObj.toHexString(),
    600: colorObj.clone().darken(5).toHexString(),
    700: colorObj.clone().darken(10).toHexString(),
    800: colorObj.clone().darken(20).toHexString(),
    900: colorObj.clone().darken(30).toHexString(),
    950: colorObj.clone().darken(50).toHexString(),
    contrastText: contrastText.toHexString(),
  };
  return variants; /*  as TColorSet */
}

/** Create color variants set from basic (500) color
 * @param {String} color
 * @return {Object} colorSet
 */
function createMuiColorVariants(color) {
  /* // palette example:
   * primary: Object
   *     main: #1976d2
   *     light: #42a5f5
   *     dark: #1565c0
   *     contrastText: #fff
   * secondary: Object
   *     main: #9c27b0
   *     light: #ba68c8
   *     dark: #7b1fa2
   *     contrastText: #fff
   */
  const colorObj = tinycolor2(color);
  const compareColor = colorObj.darken(10); // Use a little darken color to search for contrast color
  const contrastText = tinycolor2.mostReadable(compareColor, ['#000', '#fff']);
  const variants = {
    light: colorObj.clone().lighten(20).toHexString(),
    main: colorObj.toHexString(),
    dark: colorObj.clone().darken(20).toHexString(),
    contrastText: contrastText.toHexString(),
  };
  return variants; /*  as TColorSet */
}

module.exports = {
  createColorVariants,
  createMuiColorVariants,
};
