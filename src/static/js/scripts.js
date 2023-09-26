// TODO: Use traspiller, see https://www.raresportan.com/eleventy-part-five/

// See also: `src/static/vendor/js/script.js`

var loaded = false;

function onLoad() {
  if (!loaded) {
    loaded = true;
    window.removeEventListener('load', onLoad);
    var body = document.body;
    body.classList.add('loaded');
  }
}

function started() {
  var body = document.body;
  body.classList.add('inited');
  body.classList.remove('noscript');
}

window.addEventListener('load', onLoad);

started();
