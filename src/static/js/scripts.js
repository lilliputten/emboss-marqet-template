// TODO: Use traspiller, see https://www.raresportan.com/eleventy-part-five/

function navToggle() {
  // TODO: Search these items inside site-navbar?
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('menu');
  if (btn) {
    btn.classList.toggle('open');
  }
  if (nav) {
    nav.classList.toggle('flex');
    nav.classList.toggle('hidden');
  }
}

function onHiResImageLoad(lo, hi, _ev) {
  // Hide lo-res image when hi-res one has loaded
  lo.classList.add('unused');
  hi.classList.add('loaded');
}

function addHiResImages() {
  try {
    // Add hi-res images for lo-res...
    // See `src/_includes/css/hi-res.css`
    const body = document.body;
    const lores = body.getElementsByClassName('lo-res');
    const hires = [];
    for (const lo of lores) {
      const parent = lo.parentNode;
      const hi = lo.cloneNode();
      hi.classList.remove('lo-res');
      hi.classList.add('hi-res');
      hi.classList.add('inited');
      const loIm = lo.style.backgroundImage;
      const hiIm = loIm && loIm.replace(/-(lo-res|preview)/g, '');
      if (hiIm) {
        const hiImSrc = hiIm.replace(/url\((\\?(?:"|'|))([^()]*)\1\)/, '$2');
        hi.style.backgroundImage = hiIm;
        const img = document.createElement('img');
        img.classList.add('hi-res-source');
        img.classList.add('hidden');
        img.setAttribute('src', hiImSrc);
        img.addEventListener('load', onHiResImageLoad.bind(null, lo, hi));
        parent.insertBefore(img, lo);
      }
      /* console.log('addHiResImages:lores:item', {
       *   lo,
       *   hi,
       *   loIm,
       *   hiIm,
       * });
       */
      // Add hi-res and make it after lo-res image
      parent.insertBefore(hi, lo);
      parent.insertBefore(lo, hi);
      hires.push(hi);
    }
    // Make all hi-res images visible...
    setTimeout(() => {
      for (const hi of hires) {
        hi.classList.add('visible');
      }
    }, 10);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('addHiResImages', err);
    // eslint-disable-next-line no-debugger
    debugger;
  }
}

let loaded = false;

function onLoad() {
  if (!loaded) {
    loaded = true;
    window.removeEventListener('load', onLoad);
    const body = document.body;
    body.classList.add('loaded');
    addHiResImages();
  }
}

window.addEventListener('load', onLoad);

const body = document.body;
body.classList.add('inited');
body.classList.remove('noscript');

if (typeof module === 'object') {
  module.exports = {
    navToggle,
  };
}
