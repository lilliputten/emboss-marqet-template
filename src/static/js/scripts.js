// @ts-check

// TODO: Use traspiller, see https://www.raresportan.com/eleventy-part-five/

// See also: `src/static/vendor/js/script.js`

var loaded = false;

function onLoad() {
  // console.log('[scripts:onLoad]');
  if (!loaded) {
    loaded = true;
    window.removeEventListener('load', onLoad);
    var body = document.body;
    body.classList.add('loaded');
  }
}

function onDebugCustomReload() {
  // console.log('[scripts:onDebugCustomReload]');
  onLoad();
}

function started() {
  // NOTE: Beware of `eleventy.reload` event.
  // See `node_modules/@11ty/eleventy-dev-server/client/reload-client.js`
  /* console.log('[scripts:started]', {
   *   loaded,
   * });
   */
  var body = document.body;
  body.classList.add('inited');
  body.classList.remove('noscript');
}

window.addEventListener('load', onLoad);

// DEBUG: 11thy live-reload handler...
(window.__onDebugReload = window.__onDebugReload || []).push(onDebugCustomReload);

started();
