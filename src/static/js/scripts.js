// TODO: Use traspiller, see https://www.raresportan.com/eleventy-part-five/

// See also: `src/static/vendor/js`

var loaded = false;

function onLoad() {
  if (!loaded) {
    loaded = true;
    window.removeEventListener('load', onLoad);
    const body = document.body;
    body.classList.add('loaded');
  }
}

window.addEventListener('load', onLoad);

const body = document.body;
body.classList.add('inited');
body.classList.remove('noscript');

/*
 * if (typeof module === 'object') {
 *   module.exports = {
 *     // ...
 *   };
 * }
 */
