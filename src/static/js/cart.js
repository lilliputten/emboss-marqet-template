// @ts-check
/* eslint-env jquery */

(function (/** @type {jQuery} */ _$) {
  // Configuration parameters...
  const {
    // Extract global parameters
    // @see:
    // - src/_includes/base/html-scripts.njk
    // - src/@types/window.d.ts
    buildHash,
    langRootUrl,
    // currencyId,
    currency,
    currencyAfter,
    i18n,
    isDev,
  } = window;

  /** Use fake api's */
  const useDemoApi = true;
  /** Don't make real api calls */
  const mockApi = isDev && false;

  const productUrl = langRootUrl + '/single-product?hash=' + buildHash + '&id=';

  const addToCartApiUrl = useDemoApi ? '/api-demo/add-to-cart.json' : '/api/add-to-cart';
  const removeFromWishlistApiUrl = useDemoApi
    ? '/api-demo/remove-from-wishlist.json'
    : '/api/remove-from-wishlist';
  const removeFromCartApiUrl = useDemoApi
    ? '/api-demo/remove-from-cart.json'
    : '/api/remove-to-cart';

  /**
   * @param {string} url
   * @param {RequestInit} options
   * @return {Promise}
   */
  function fetchRequest(url, options) {
    // DEBUG!
    if (mockApi) {
      return Promise.resolve();
    }
    return fetch(url, options).then((res) => {
      const { ok, headers, status, statusText } = res;
      const contentType = headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      /* console.log('[fetchRequest] res', {
       *   ok,
       *   headers,
       *   contentType,
       *   isJson,
       *   status,
       *   statusText,
       *   res,
       * });
       */
      if (!ok) {
        const reason =
          [statusText, status && 'status: ' + status].filter(Boolean).join(', ') || 'Unknown error';
        const error = new Error('Data loading error: ' + reason);
        // eslint-disable-next-line no-console
        console.error('[fetchRequest]: error (on then)', {
          reason,
          res,
          url,
        });
        // eslint-disable-next-line no-debugger
        debugger;
        throw error;
      }
      return isJson ? res.json() : res.text();
    });
  }

  /** @param {TBasketItem} itemData */
  function sendAddToCartApiRequest(itemData) {
    const url = addToCartApiUrl;
    const { id } = itemData;
    const postData = { id };
    /** @type {RequestInit} */
    const options = {
      method: useDemoApi ? 'GET' : 'POST',
      body: useDemoApi ? undefined : JSON.stringify(postData),
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
    };
    return (
      fetchRequest(url, options)
        /* .then((data) => {
         *   // Do something with response.
         *   console.log('[sendAddToCartApiRequest] Done', {
         *     addToCartApiUrl,
         *     itemData,
         *     postData,
         *     options,
         *     data,
         *   });
         * })
         */
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('[scripts:sendAddToCartApiRequest]', {
            error,
            url,
          });
          // eslint-disable-next-line no-debugger
          debugger;
          // TODO: Show error message?
          throw error;
        })
    );
  }

  /** @param {TBasketItem} itemData */
  function sendRemoveFromWishlistApiRequest(itemData) {
    const url = removeFromWishlistApiUrl;
    const { id } = itemData;
    const postData = { id };
    /** @type {RequestInit} */
    const options = {
      method: useDemoApi ? 'GET' : 'POST',
      body: useDemoApi ? undefined : JSON.stringify(postData),
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
    };
    return (
      fetchRequest(url, options)
        /* .then((data) => {
         *   // Do something with response.
         *   console.log('[sendRemoveFromWishlistApiRequest] Done', {
         *     removeFromWishlistApiUrl,
         *     itemData,
         *     postData,
         *     options,
         *     data,
         *   });
         * })
         */
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('[scripts:sendRemoveFromWishlistApiRequest]', {
            error,
            url,
          });
          // eslint-disable-next-line no-debugger
          debugger;
          // TODO: Show error message?
          throw error;
        })
    );
  }

  /** @param {TBasketItem} itemData */
  function sendRemoveFromCartApiRequest(itemData) {
    const url = removeFromCartApiUrl;
    const { id } = itemData;
    const postData = { id };
    /** @type {RequestInit} */
    const options = {
      method: useDemoApi ? 'GET' : 'POST',
      body: useDemoApi ? undefined : JSON.stringify(postData),
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
    };
    return (
      fetchRequest(url, options)
        /* .then((data) => {
         *   // Do something with response.
         *   console.log('[sendRemoveFromCartApiRequest] Done', {
         *     removeFromCartApiUrl,
         *     itemData,
         *     postData,
         *     options,
         *     data,
         *   });
         * })
         */
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('[scripts:sendRemoveFromCartApiRequest]', {
            error,
            url,
          });
          // eslint-disable-next-line no-debugger
          debugger;
          // TODO: Show error message?
          throw error;
        })
    );
  }

  /** @param {TBasketItem} itemData */
  function createCartItemHtml(itemData) {
    const {
      id, // number | string
      image, // string
      // priceOld, // number
      price, // number
      name, // string
      // count, // number
      inStock, // boolean
    } = itemData;
    // NOTE: Add only 1 item
    const count = 1;
    const priceBlock = [
      !currencyAfter && `<span class="currency">${currency}</span>`,
      `<span class="price-content">${price}</span>`,
      !!currencyAfter && `<span class="currency">${currency}</span>`,
    ]
      .filter(Boolean)
      .join('');
    /* console.log('[createCartItemHtml] Prepared data', {
     *   priceBlock,
     *   langRootUrl,
     *   buildHash,
     *   ...itemData,
     *   count,
     * });
     */
    // NOTE: According to template: src/_includes/layout/page-cart-items.njk
    const html = `
      <li
        data-id="${id}"
        data-image="${image}"
        data-price="${price}"
        data-name="${name}"
        data-count="${count}"
        data-inStock="${inStock}"
      >
      <div class="basket-item">
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <div class="thumb">
              <a href="${productUrl}${id}"><img alt="" src="${image}" /></a>
            </div>
          </div>
          <div class="col-xs-12 col-sm-8">
            <div class="title"><a href="${productUrl}${id}">${name}</a></div>
            <div class="priceBlock">
              <span class="text-label">${i18n.products.price}:</span>
              <span class="price">${priceBlock}</span>
            </div>
            <div class="countBlock">
              <span class="text-label">${i18n.products.count}:</span>
              <span class="count-content">${count}</span>
            </div>
          </div>
        </div>
        <a class="close-btn" href="javascript:void(0)" onClick="window.removeFromCart(this)" title="${i18n.products.remove}"></a>
      </div>
    </li>
    `;
    return html;
  }

  /** @param {TBasketItem} itemData */
  function addCartDomItem(itemData) {
    const {
      id, // number | string
    } = itemData;
    const cartItemsNode = document.querySelector('#basket .dropdown-menu');
    if (!cartItemsNode) {
      const error = new Error('Basket dom node has not found');
      // eslint-disable-next-line no-console
      console.error('[addCartDomItem]: error', {
        error,
      });
      // eslint-disable-next-line no-debugger
      debugger;
      throw error;
    }
    const query = 'li[data-id="' + id + '"]';
    const foundNode = cartItemsNode.querySelector(query);
    /* console.log('[addCartDomItem]', {
     *   buildHash,
     *   query,
     *   foundNode,
     *   ...itemData,
     * });
     */
    if (foundNode) {
      // Increase items count for existed node...
      const countNode = foundNode.querySelector('.count-content');
      const count = parseInt(countNode.textContent) || 0;
      countNode.innerHTML = String(count + 1);
    } else {
      // Add absent node...
      const html = createCartItemHtml(itemData);
      cartItemsNode.insertAdjacentHTML('beforeend', html);
    }
  }

  /** @param {TBasketItem} itemData */
  function removeCartDomItem(itemData) {
    const {
      id, // number | string
    } = itemData;
    const cartItemsNode = document.querySelector('#basket .dropdown-menu');
    if (!cartItemsNode) {
      const error = new Error('Basket dom node has not found');
      // eslint-disable-next-line no-console
      console.error('[removeCartDomItem]: error', {
        error,
      });
      // eslint-disable-next-line no-debugger
      debugger;
      throw error;
    }
    const query = 'li[data-id="' + id + '"]';
    const foundNode = cartItemsNode.querySelector(query);
    if (!foundNode) {
      const error = new Error('Not found target node to delete');
      // eslint-disable-next-line no-console
      console.error('[sendRemoveFromCartApiRequest]: error', {
        error,
      });
      // eslint-disable-next-line no-debugger
      debugger;
      throw error;
    }
    /* console.log('[removeCartDomItem]', {
     *   query,
     *   foundNode,
     *   ...itemData,
     * });
     */
    foundNode.remove();
  }

  /** @param {TBasketItem} itemData */
  function addItemDataToCart(itemData) {
    // @see src/_includes/layout/page-cart-items.njk
    /* console.log('[addItemDataToCart] Start', {
     *   buildHash,
     *   ...itemData,
     * });
     */
    sendAddToCartApiRequest(itemData).then(() => {
      /* console.log('[addItemDataToCart] Success', {
       *   buildHash,
       *   ...itemData,
       * });
       */
      addCartDomItem(itemData);
      updateBasketDropdown();
    });
  }

  /** @param {TBasketItem} itemData */
  function removeItemDataFromWishlist(itemData) {
    // @see src/_includes/layout/page-cart-items.njk
    /* console.log('[removeItemDataFromWishlist] Start', {
     *   buildHash,
     *   ...itemData,
     * });
     */
    sendRemoveFromWishlistApiRequest(itemData).then(() => {
      /* console.log('[removeItemDataFromWishlist] Success', {
       *   buildHash,
       *   ...itemData,
       * });
       */
      removeCartDomItem(itemData);
      updateBasketDropdown();
    });
  }

  /** @param {TBasketItem} itemData */
  function removeItemDataFromCart(itemData) {
    // @see src/_includes/layout/page-cart-items.njk
    /* console.log('[removeItemDataFromCart] Start', {
     *   buildHash,
     *   ...itemData,
     * });
     */
    sendRemoveFromCartApiRequest(itemData).then(() => {
      /* console.log('[removeItemDataFromCart] Success', {
       *   buildHash,
       *   ...itemData,
       * });
       */
      removeCartDomItem(itemData);
      updateBasketDropdown();
    });
  }

  /** @param {HTMLElement} node
   * @return {TBasketItem}
   */
  function getCartNodeData(node) {
    const id = node.getAttribute('data-id'); // number | string
    const image = node.getAttribute('data-image'); // string
    const price = parseInt(node.getAttribute('data-price'), 10); // number
    const name = node.getAttribute('data-name'); // string
    // const priceOld = parseInt(node.getAttribute('data-priceOld'), 10); // number
    const count = parseInt(node.getAttribute('data-count'), 10) || 1; // number
    const inStockAttr = node.getAttribute('data-inStock'); // boolean
    const inStock = !inStockAttr || inStockAttr !== 'false';
    /** @type {TBasketItem} */
    const data = {
      id, // number | string
      image, // string
      // priceOld, // number
      price, // number
      name, // string
      inStock, // boolean
      count, // number
    };
    return data;
  }

  /** @param {HTMLElement} node */
  function addNodeToCart(node) {
    const itemData = getCartNodeData(node);
    addItemDataToCart(itemData);
  }

  /** @param {HTMLElement} node */
  function removeNodeFromWishlist(node) {
    const itemData = getCartNodeData(node);
    removeItemDataFromWishlist(itemData);
    // Remove dom node itself
    node.remove();
    // Update class names...
    updateWishlist();
  }

  /** @param {HTMLElement} node */
  function removeNodeFromCart(node) {
    const itemData = getCartNodeData(node);
    removeItemDataFromCart(itemData);
  }

  /** @param {HTMLElement} node
   * @return {HTMLElement}
   */
  function getCartItemDataNode(node) {
    // const row = node.closest('tr') || node.closest('li');
    const row = /** @type {HTMLElement} */ (node.closest('.cart-item-data-node'));
    return row;
  }

  /** @param {HTMLElement} node */
  function removeFromWishlist(node) {
    // Get table row or cart list item...
    const row = getCartItemDataNode(node);
    const id = row.getAttribute('data-id');
    if (!id) {
      const error = new Error('Target node does not contain id attribute');
      // eslint-disable-next-line no-console
      console.error('[removeFromWishlist]: error', {
        error,
      });
      // eslint-disable-next-line no-debugger
      debugger;
      throw error;
    }
    /** console.log('[removeFromWishlist]', {
     *   id,
     *   row,
     *   node,
     * });
     */
    // Send request, add to cart
    removeNodeFromWishlist(row);
  }

  /**
   * @param {HTMLElement} node
   * @param {boolean} [removeThisFromWishlist]
   */
  function addToCart(node, removeThisFromWishlist) {
    // Get table row or cart list item...
    const row = getCartItemDataNode(node);
    const id = row.getAttribute('data-id');
    if (!id) {
      const error = new Error('Target node does not contain id attribute');
      // eslint-disable-next-line no-console
      console.error('[addToCart]: error', {
        error,
      });
      // eslint-disable-next-line no-debugger
      debugger;
      throw error;
    }
    /** console.log('[addToCart]', {
     *   id,
     *   row,
     *   node,
     *   removeThisFromWishlist,
     * });
     */
    // Send request, add to cart
    addNodeToCart(row);
    if (removeThisFromWishlist) {
      removeNodeFromWishlist(row);
    }
  }

  /** @param {HTMLElement} node */
  function removeFromCart(node) {
    const row = getCartItemDataNode(node);
    const id = row.getAttribute('data-id');
    if (!id) {
      const error = new Error('Target node does not contain id attribute');
      // eslint-disable-next-line no-console
      console.error('[removeFromCart]: error', {
        error,
      });
      // eslint-disable-next-line no-debugger
      debugger;
      throw error;
    }
    /* console.log('[removeFromCart]', {
     *   id,
     *   row,
     *   node,
     * });
     */
    // Send request, remove from cart
    removeNodeFromCart(row);
  }

  function updateBasketDropdown() {
    const cartNode = document.getElementById('basket');
    const items = cartNode.querySelectorAll('.basket-item');
    // Calculate multiple items (`count-content`)
    const totalCount = Array.from(items).reduce((count, item) => {
      const subCountNode = item.querySelector('.count-content');
      const subCount = parseInt(subCountNode.textContent, 10) || 1;
      return count + subCount;
    }, 0);
    const itemsCount = totalCount;
    const hasItems = !!itemsCount;
    cartNode.classList.toggle('has-items', hasItems);
    const countContainer = cartNode.querySelector('.item-count');
    countContainer.innerHTML = String(itemsCount);
  }

  function updateWishlist() {
    const rootNode = document.getElementById('section-profile-wishlist-page');
    if (rootNode) {
      const items = rootNode.querySelectorAll('.cart-item-data-node');
      const hasItems = !!(items && items.length);
      rootNode.classList.toggle('has-items', hasItems);
    }
  }

  function onCartLoad() {
    updateBasketDropdown();
    updateWishlist();
  }

  window.addEventListener('load', onCartLoad);

  // Expose to global object...
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.removeFromWishlist = removeFromWishlist;
})(jQuery);
