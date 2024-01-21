// @ts-check

/* eslint-env jquery */
/* --global WOW */

(function (/** @type {jQuery} */ $) {
  'use strict';

  function onLoad() {
    /* // Issue #13: Preloader is unused.
     * $('#status').fadeOut(); // will first fade out the loading animation
     * $('#preloader').delay(1000).fadeOut('slow'); // will fade out the white DIV that covers the website.
     */
  }

  $(window).bind('load', onLoad);

  // NOTE: Emulate on-load event on live-reload (in debug mode).
  window.hasReady && onLoad();

  // onReady method begin
  function onReady() {
    // products-controls
    var mainProductsMenuButton = $('#products-controls-button');
    mainProductsMenuButton.click(function() {
      var menu = this.closest('.products-controls-group');
      menu.classList.toggle('products-controls-show');
    });

    // console.log('[script:onReady]', window.hasReady);
    // NOTE: Avoid re-initialization on live-reload (in debug mode)
    if (window.hasReady) {
      return;
    }
    // Set loaded flag
    window.hasReady = true;

    new window.WOW({
      boxClass: 'wow', // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset: '-200px', // distance to the element when triggering the animation (default is 0)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
    });

    new window.WOW().init(); // NOTE: It's not a mistake: if we use previosly created wow here it causes errors (not all carousels are initialized)

    if ($('.bg-image[data-bg-image]').length > 0) {
      $('.bg-image[data-bg-image]').each(function () {
        var el = $(this);
        // var sz = getImgSize(el, el.attr('data-bg-image'));
        el.css('background-position', 'center')
          .css('background-image', "url('" + el.attr('data-bg-image') + "')")
          .css('background-size', 'cover')
          .css('background-repeat', 'no-repeat');
      });
    }

    if ($('.bg-color[data-bg-color]').length > 0) {
      $('.bg-color[data-bg-color]').each(function () {
        var el = $(this);
        el.css('background-color', el.attr('data-bg-color'));
      });
    }

    var productCarousels = $('.product-carousel');

    productCarousels.owlCarousel({
      pagination: false,
      // NOTE: See width setting for `product-item` in `src/_includes/catalogue/section-featured-products.njk`
      // Sizes per widths
      items: 4,
      itemsDesktop: [992, 3],
      itemsDesktopSmall: [768, 3],
      itemsTablet: [600, 2],
      itemsMobile: [340, 1],
      /* // Sizes per widths (non-optimal: only 1 item on screens narrower than 780)
       * items: 4,
       * itemsDesktop: [1200, 3],
       * itemsDesktopSmall: [992, 2],
       * itemsTablet: [768, 1],
       */
      // itemsTablet: [480, 1],
      /* // Sizes per widths (original)...
       * items: 4, // 10 items above 1000px browser width
       * itemsDesktop: [1200, 3],
       * itemsDesktopSmall: [990, 2],
       * itemsTablet: [570, 1],
       */
      /* // Sizes per widths (wide)...
       * items: 3, // Default
       * itemsDesktop: [1200, 2],
       * itemsDesktopSmall: [990, 2],
       * itemsTablet: [800, 1],
       */
      // itemsMobile: undefined, // itemsMobile disabled - inherit from itemsTablet option
    });

    // Find and init product carousels...
    productCarousels.each(function initCarouselNode(_idx, node) {
      var jqNode = $(node);
      var owl = jqNode.data('owlCarousel');
      var parent = jqNode.parent();
      var btnPrev = parent.find('.nav-buttons .btn-prev');
      var btnNext = parent.find('.nav-buttons .btn-next');
      btnPrev.click(function (e) {
        e.preventDefault();
        owl.prev();
      });
      btnNext.click(function (e) {
        e.preventDefault();
        owl.next();
      });

    });

    /* // Old code for product-carousel...
    var owl = $('.product-carousel').data('owlCarousel');
    $('.product-carousel')
      .parent()
      .find('.nav-buttons .btn-prev')
      .click(function (e) {
        e.preventDefault();
        owl.prev();
      });
    $('.product-carousel')
      .parent()
      .find('.nav-buttons .btn-next')
      .click(function (e) {
        e.preventDefault();
        owl.next();
      });
    */

    // Banner slider carousel
    $('.banner-carousel').owlCarousel({
      afterInit: function (el) {
        // console.log(el.find('.banner-carousel'));
        el.parent().find('.btn-next,.btn-prev').prependTo(el);
      },
      pagination: false,
      navigation: false, // Show next and prev buttons
      slideSpeed: 300,
      paginationSpeed: 400,
      singleItem: true,
    });

    var bannerowl = $('.banner-carousel').data('owlCarousel');
    $('.banner-carousel')
      .find('.btn-prev')
      .click(function (e) {
        e.preventDefault();
        bannerowl.prev();
      });

    $('.banner-carousel')
      .find('.btn-next')
      .click(function (e) {
        e.preventDefault();
        bannerowl.next();
      });

    // Defauld carousel
    $('.default-carousel').each(function () {
      $(this).owlCarousel({
        afterInit: function (el) {
          el.parent().find('.btn-next,.btn-prev').prependTo(el);
        },
        pagination: false,
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
      });
      var defowl = $(this).data('owlCarousel');
      $(this)
        .find('.btn-prev')
        .click(function (e) {
          e.preventDefault();
          defowl.prev();
        });
      $(this)
        .find('.btn-next')
        .click(function (e) {
          e.preventDefault();
          defowl.next();
        });
    });

    if ($('.triangled').length > 0) {
      $('.triangled li').append('<div class="triangle"></div>');
    }

    // top cart
    $('.basket .close-btn').click(function () {
      $(this)
        .parent()
        .parent()
        .fadeOut(function () {
          $(this).remove();
          checkBasketDropdown(true);
        });
    });
    var basketDropdown = $('[data-hover="dropdown"]');
    // @ts-ignore
    if (basketDropdown && basketDropdown.dropdownHover) {
      // @ts-ignore
      basketDropdown.dropdownHover();
    } else {
      // DEBUG?
      console.warn('No basket dropdown has initialized!');
    }
    checkBasketDropdown();
    /** @param {boolean} [remove] */
    function checkBasketDropdown(remove) {
      if (remove) {
        var cn = parseInt($('.basket-item-count').text());
        var nn = cn - 1;
        $('.basket-item-count').text(nn);
      }
      var basketItems = $('.basket .basket-item');
      var hasItems = !!basketItems.length;
      var basket = $('.basket');
      basket.toggleClass('has-items', hasItems);
      /* // UNUSED: Direct basket options control
       * var menu = $('.basket .dropdown-menu');
       * menu.prepend('<li class="empty">Empty</li>');
       */
    }

    // Quantity element in shopping cart list (TODO: Update for new dynamically added items?)
    $('.le-quantity a').click(function (e) {
      var thisNode = $(this);
      var rowNode = thisNode.closest('tr');
      var tableNode = thisNode.closest('table');
      var inputNode = rowNode.find('input#quantity');
      var priceNode = rowNode.find('.shopping-cart-price');
      var totalNode = rowNode.find('.shopping-cart-total');
      e.preventDefault();
      var currentQty = parseInt(String(inputNode.val()));
      var price = parseInt(priceNode.text());
      var isMinus = thisNode.hasClass('minus') && currentQty > 0;
      var isPlus = thisNode.hasClass('plus');
      var nextQty = currentQty;

      if (isMinus) {
        nextQty = currentQty - 1;
      } else if (isPlus) {
        nextQty = currentQty + 1;
      }

      var total = nextQty * price;

      inputNode.val(nextQty);
      totalNode.text(String(total));

      // Update total sum value (NOTE: Assuming only one total sum node on the page)
      var totalSumNode = document.getElementById('totalSum');
      if (totalSumNode) {
        var totalNodes = tableNode.find('.shopping-cart-total');
        var summ = 0;
        totalNodes.each(function () {
          var node = $(this);
          summ += parseInt(String(node.text()));
        });
        totalSumNode.innerHTML = String(summ);
      }
    });

    /* // UNUSED: Rating Star activator
     * if ($('.star').length > 0) {
     *   // @ts-ignore
     *   $('.star').raty({
     *     space: false,
     *     starOff: '/vendor/images/star-off.png',
     *     starOn: '/vendor/images/star-on.png',
     *     score: function () {
     *       return $(this).attr('data-score');
     *     },
     *   });
     * }
     */

    /* // UNUSED?
     * function getImgSize(el, imgSrc) {
     *   var newImg = new Image();
     *   newImg.onload = function () {
     *     var height = newImg.height;
     *     // var width = newImg.width;
     *     el.css('height', height);
     *   };
     *   newImg.src = imgSrc;
     * }
     */

    // SinglePage slide activator
    if ($('.single-product-slider').length > 0) {
      var singlePSlider = $('.single-product-slider').owlCarousel({
        pagination: false,
        navigation: false, // hide next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
      });

      var gallery = singlePSlider.data('owlCarousel');

      /* // UNUSED?
       * var thumbSlider = $('.single-product-gallery .gallery-thumbs ul').owlCarousel({
       *   items: 5, // 10 items above 1000px browser width
       *   itemsDesktop: [1000, 4], // 5 items between 1000px and 901px
       *   itemsDesktopSmall: [900, 3], // betweem 900px and 601px
       *   itemsTablet: [400, 2], // 2 items between 600 and 0
       *   itemsMobile: false, // itemsMobile disabled - inherit from itemsTablet option
       * });
       * var thumbCtrls = thumbSlider.data('owlCarousel');
       */

      $('.single-product-gallery .gallery-thumbs .horizontal-thumb').click(function (event) {
        event.preventDefault();
        $(this).parent().parent().parent().find('.active').removeClass('active');

        $(this).parent().addClass('active');

        var tid = $(this).attr('href');
        var targetSlide = $('.single-product-gallery-item' + tid);

        var targetSlideIdx = $(targetSlide).parent().index();

        gallery.goTo(targetSlideIdx);
      });

      if ($('.single-product-vertical-gallery').length > 0) {
        // @ts-ignore
        $('.single-product-vertical-gallery ul').carouFredSel({
          direction: 'up',
          auto: false,
          items: 4,
          circular: true,
        });

        $('.single-product-vertical-gallery .up-btn').click(function (event) {
          event.preventDefault();
          $('.single-product-vertical-gallery ul').trigger('next', 1);
        });

        $('.single-product-vertical-gallery .down-btn').click(function (event) {
          event.preventDefault();
          $('.single-product-vertical-gallery ul').trigger('prev', 1);
        });

        $('.single-product-vertical-gallery .vertical-gallery-item').click(function (event) {
          event.preventDefault();
          var tid = $(this).attr('href');
          var targetSlide = $('.single-product-gallery-item' + tid);
          singlePSlider.trigger('slideTo', targetSlide);
        });
      }

      // Horizontal Single page gallery

      if ($('.single-product-horizontal-gallery').length > 0) {
        // @ts-ignore
        $('.single-product-horizontal-gallery ul').carouFredSel({
          auto: false,
          circular: true,
        });

        $('.single-product-horizontal-gallery .next-btn').click(function (event) {
          event.preventDefault();
          $('.single-product-horizontal-gallery ul').trigger('next', 1);
        });

        $('.single-product-horizontal-gallery .prev-btn').click(function (event) {
          event.preventDefault();
          $('.single-product-horizontal-gallery ul').trigger('prev', 1);
        });

        $('.single-product-horizontal-gallery .horizontal-gallery-item').click(function (event) {
          event.preventDefault();
          var tid = $(this).attr('href');
          var targetSlide = $('.single-product-gallery-item' + tid);
          // console.log(targetSlide);
          singlePSlider.trigger('slideTo', targetSlide);
        });
      }
    }

    // Brand Slider activator

    if ($('.brands-slider').length > 0) {
      // @ts-ignore
      $('.brands-slider img').lazyload({
        event: 'loadImagesNow',
        effect: 'fadeIn',
      });
    }

    // Lightbox activator

    var prettyPhotoNodes = $('a[data-rel^="prettyphoto"]');
    if (prettyPhotoNodes.length) {
      // @ts-ignore
      prettyPhotoNodes.prettyPhoto({
        social_tools: false,
        show_title: false,
        slideshow: false,
        // autoplay_slideshow: true,
        overlay_gallery: false,
        allow_expand: false,
        hook: 'data-rel',

        // theme: 'light_rounded',
        /* // Markup sample...
         * markup: '<div class="pp_pic_holder"> \
         *             <div class="ppt">&nbsp;</div> \
         *             <div class="pp_top"> \
         *                 <div class="pp_left"></div> \
         *                 <div class="pp_middle"></div> \
         *                 <div class="pp_right"></div> \
         *             </div> \
         *             <div class="pp_content_container"> \
         *                 <div class="pp_left"> \
         *                 <div class="pp_right"> \
         *                     <div class="pp_content"> \
         *                         <div class="pp_loaderIcon"></div> \
         *                         <div class="pp_fade"> \
         *                             <a href="#" class="pp_expand" title="Expand the image">Expand</a> \
         *                             <div class="pp_hoverContainer"> \
         *                                 <a class="pp_next" href="#">next</a> \
         *                                 <a class="pp_previous" href="#">previous</a> \
         *                             </div> \
         *                             <div id="pp_full_res"></div> \
         *                             <div class="pp_details"> \
         *                                 <div class="pp_nav"> \
         *                                     <a href="#" class="pp_arrow_previous">Previous</a> \
         *                                     <p class="currentTextHolder">0/0</p> \
         *                                     <a href="#" class="pp_arrow_next">Next</a> \
         *                                 </div> \
         *                                 <p class="pp_description"></p> \
         *                                 {pp_social} \
         *                                 <a class="pp_close" href="#">Close</a> \
         *                             </div> \
         *                         </div> \
         *                     </div> \
         *                 </div> \
         *                 </div> \
         *             </div> \
         *             <div class="pp_bottom"> \
         *                 <div class="pp_left"></div> \
         *                 <div class="pp_middle"></div> \
         *                 <div class="pp_right"></div> \
         *             </div> \
         *         </div> \
         *         <div class="pp_overlay"></div>',
         */
      });
    }

    // Image lazy activator
    if ($('img.lazy').length > 0) {
      var allImgs = $('img.lazy').length;
      $('img.lazy').each(function (i) {
        var src = $(this).attr('src');
        $(this).attr('data-original', src);
        if (i + 1 >= allImgs) {
          // @ts-ignore
          $('img.lazy').lazyload({
            effect: 'fadeIn',
          });
        }
      });
    }

    /*
     * Replace all SVG images with inline SVG
     */
    $('img.svg').each(function () {
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      jQuery.get(
        imgURL,
        function (data) {
          // Get the SVG tag, ignore the rest
          var $svg = jQuery(data).find('svg');

          // Add replaced image's ID to the new SVG
          if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
          }
          // Add replaced image's classes to the new SVG
          if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a');

          // Replace image with new SVG
          $img.replaceWith($svg);
        },
        'xml',
      );
    });

    /* // Issue #13: Searchbar is always open
     * if ($('.search-button').length > 0) {
     *   $('.search-button').click(function (e) {
     *     e.preventDefault();
     *     var fld = $(this).find('+ .field');
     *     fld.addClass('open');
     *   });
     *   $('html').click(function () {
     *     $('.search-holder .field').removeClass('open');
     *   });
     *   $('.search-holder').click(function (event) {
     *     event.stopPropagation();
     *   });
     * }
     */

    $('[data-placeholder]')
      .focus(function () {
        var input = $(this);
        if (input.val() == input.attr('data-placeholder')) {
          input.val('');
        }
      })
      .blur(function () {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('data-placeholder')) {
          input.addClass('placeholder');
          input.val(input.attr('data-placeholder'));
        }
      })
      .blur();

    $('[data-placeholder]')
      .parents('form')
      .submit(function () {
        $(this)
          .find('[data-placeholder]')
          .each(function () {
            var input = $(this);
            if (input.val() == input.attr('data-placeholder')) {
              input.val('');
            }
          });
      });
  }
  // onReady method end

  $(document).ready(onReady);

  // DEBUG: 11thy live-reload handler...
  (window.__onDebugReload = window.__onDebugReload || []).push(function delayedOnLoad() {
    // setTimeout(onLoad, 20);
  });

  $('.goto-top').click(function (e) {
    e.preventDefault();
    $('html,body').animate(
      {
        scrollTop: 0,
      },
      2000,
    );
  });

  /* // UNUSED
   * if ($('a[data-rel="prettyphoto"]').length) {
   *   // @ts-ignore
   *   $('a[data-rel="prettyphoto"]').prettyPhoto();
   * }
   */

  // @ts-ignore
  $.validator.setDefaults({
    debug: true,
    success: 'valid',
  });

  // Custom select buttons trigger
  if ($('.selectpicker').length > 0) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      // @ts-ignore
      $('.selectpicker').selectpicker('mobile');
    } else {
      // @ts-ignore
      $('.selectpicker').selectpicker();
    }
  }

  // Sidebar Price Slider
  if ($('.price-slider').length > 0) {
    // @ts-ignore
    $('.price-slider').slider({
      min: 100,
      max: 700,
      step: 10,
      value: [100, 400],
      handle: 'square',
    });
  }

  $('select.nav').change(function () {
    var loc = $(this).find('option:selected').val();
    // TODO: Process select option handler...
    goToSection(loc);
  });

  function goToSection(destSection) {
    location.href = destSection;
    // $('html, body').stop().animate({
    //   scrollTop: $(destSection).offset().top + scrollOffset
    // }, 2000, 'easeInOutExpo');
  }

  // $('.nav-menu a').bind('click', function (event) {
  //   event.preventDefault();
  //   var clickedMenu = $(this);
  //   $('.nav-menu .active').toggleClass('active');
  //   clickedMenu.parent().toggleClass('active');
  //   goToSection(clickedMenu.attr('href'));
  // });
})(jQuery);

(function ($) {
  'use strict';
  var currentItemIndex;
  var time = 7; // time in seconds

  var $progressBar, $bar, $elem, isPause, tick, percentTime;

  // Init progressBar where elem is $("#owl-demo")
  function progressBar(elem) {
    $elem = elem;
    // build progress bar elements
    buildProgressBar();
    // start counting
    start();
  }

  // create div#progressBar and div#bar then prepend to $("#owl-demo")
  function buildProgressBar() {
    $progressBar = $('<div>', {
      id: 'progressBar',
    });
    $bar = $('<div>', {
      id: 'bar',
    });
    $progressBar.append($bar).prependTo($elem);
  }

  function start() {
    // reset timer
    percentTime = 0;
    isPause = false;
    // run interval every 0.01 second
    tick = setInterval(interval, 10);
  }

  function showCaption() {
    var currentSlide = $elem.find('.owl-item').eq(currentItemIndex);
    currentSlide.find('.caption').addClass('show');
  }
  function removeCaption() {
    var currentSlide = $elem.find('.owl-item').eq(currentItemIndex);
    currentSlide.find('.caption').removeClass('show');
  }
  function interval() {
    if (isPause === false) {
      percentTime += 1 / time;
      $bar.css({
        width: percentTime + '%',
      });
      // if percentTime is equal or greater than 100
      if (percentTime >= 100) {
        // slide to next item
        $elem.trigger('owl.next');
      }
    }
  }

  // pause while dragging
  function pauseOnDragging() {
    isPause = true;
  }

  // moved callback
  function moved() {
    currentItemIndex = this.owl.currentItem;
    // clear interval
    clearTimeout(tick);
    // start again
    start();
    showCaption();
  }

  // Homepage2 slider trigger
  if ($('.homeslider').length > 0) {
    // Init the carousel
    $('.homeslider .owl-carousel').owlCarousel({
      slideSpeed: 500,
      paginationSpeed: 500,
      singleItem: true,
      afterInit: progressBar,
      afterMove: moved,
      beforeMove: removeCaption,
      startDragging: pauseOnDragging,
    });
  }
})(jQuery);

// Sticky Nav
$(window).scroll(function () {
  var nav_anchor = $('.top-menu-holder');
  // var gotop = $(document);
  if ($(this).scrollTop() >= 500) {
    $('.goto-top').css({ opacity: 1 });
  } else if ($(this).scrollTop() < 500) {
    $('.goto-top').css({ opacity: 0 });
  }
  if ($(this).scrollTop() >= $('header').height()) {
    nav_anchor.addClass('split');
  } else if ($(this).scrollTop() < $('header').height()) {
    nav_anchor.removeClass('split');
  }
});

/**
 Provides requestAnimationFrame in a cross browser way.
 @author paulirish / http://paulirish.com/ */
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (function () {
    return (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (/* function FrameRequestCallback / callback, / DOMElement Element */ _element) {}
    );
  })();
}
