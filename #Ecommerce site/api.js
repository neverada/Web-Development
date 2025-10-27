document.addEventListener('DOMContentLoaded', function () {
    const productGrid = document.querySelector("#product-grid");
    const paginationContainer = document.querySelector("#PaginationProducts");
    const productPageTitle = document.getElementById('product-page-title'); // Assuming you have this H1 in products.html

    let currentPage = 1;
    const productsPerPage = 9; // Number of items to display per page

    // Utility function to get a query parameter from the URL
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    async function fetchProducts(page) {
        const categorySlug = getUrlParameter('category');
        const skip = (page - 1) * productsPerPage;
        const limit = productsPerPage;

        let apiUrl;
        if (categorySlug) {
            // Fetch products for a specific category
            apiUrl = `https://dummyjson.com/products/category/${categorySlug}?limit=${limit}&skip=${skip}`;
            if (productPageTitle) {
                productPageTitle.textContent = `Products in ${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace('-', ' ')}`;
            }
        } else {
            // Fetch all products
            apiUrl = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
            if (productPageTitle) {
                productPageTitle.textContent = 'All Products';
            }
        }

        // Show a loading spinner
        if (productGrid) {
            productGrid.innerHTML = `<div class="col-12 text-center p-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-2">Loading products...</p></div>`;
        }
        if (paginationContainer) {
            paginationContainer.innerHTML = ''; // Clear pagination while loading
        }

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data && data.products) {
                return { products: data.products, total: data.total };
            } else {
                console.error("API response structure unexpected:", data);
                return { products: [], total: 0 };
            }

        } catch (error) {
            console.error("Could not fetch products:", error);
            if (productGrid) {
                productGrid.innerHTML = `<p class="col-12 text-center text-danger">Failed to load products. Please check your internet connection and try again.</p>`;
            }
            return { products: [], total: 0 };
        }
    }


    function renderProducts(products) {
        if (!productGrid) return; // Ensure productGrid exists

        if (!products || products.length === 0) {
            productGrid.innerHTML = `<p class="col-12 text-center">No products found.</p>`;
            return;
        }
        productGrid.innerHTML = ''; // Clear previous products

        products.forEach(product => {
            const productCardHTML = `
                <div class="col">
                    <div class="product-card rounded-4 shadow-sm p-3 h-100 d-flex flex-column">
                        <div class="product-image-container mb-3 flex-grow-1 d-flex align-items-center justify-content-center">
                            <img src="${product.images[0] || product.thumbnail}" alt="${product.title}" class="img-fluid rounded-3 product-image-default" style="max-height: 200px; object-fit: contain;">
                            ${product.images[1] ? `<img src="${product.images[1]}" alt="${product.title}" class="product-image-hover img-fluid rounded-3" style="max-height: 200px; object-fit: contain;">` : ''}
                            <div class="product-actions">
                                <a class="action-btn btn" title="View Product" href="product-detail.html?id=${product.id}" ><i class="fas fa-eye"></i></a>
                                <a href="#" class="action-btn btn" title="Compare" onclick="addToCompare(${product.id})"><i class="fas fa-random "></i></a>
                                <a href="#" class="action-btn btn" title="Add to Cart" data-id="${product.id}"  onclick="addToCart(${product.id},${product.price})"><i class="fas fa-shopping-cart"></i></a>
                            </div>
                        </div>
                        <div class="mt-auto">
                            <span class="badge bg-primary">${product.category}</span>
                            <h6 class="mt-2 fw-bold"><a href="product-detail.html?id=${product.id}" class="text-decoration-none text-dark">${product.title}</a></h6>
                            <p class="text-muted small mb-1">Stock: ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                            <div class="d-flex align-items-center justify-content-between">
                                <span class="fs-5 fw-bold">$${product.price.toFixed(2)}</span>
                                <button class="btn btn-small text-danger" onclick="addToWish(${product.id},${product.price})"><i class="fa-regular fa-heart"></i></button>
                            </div>
                        </div>
                    </div>
                </div>`;
            productGrid.innerHTML += productCardHTML;
        });
    }
    

    // --- PAGINATION HELPERS ---
    function renderPagination(totalProducts, currentPage) {
        if (!paginationContainer) return;

        paginationContainer.innerHTML = ''; // Clear existing pagination
        const totalPages = Math.ceil(totalProducts / productsPerPage);

        if (totalPages <= 1 && totalProducts > 0) { // Don't show pagination if only one page, but still products
            return;
        } else if (totalProducts === 0) { // If no products, no pagination
            return;
        }

        // Previous button
        const prevLi = document.createElement('li');
        prevLi.classList.add('page-item');
        if (currentPage === 1) prevLi.classList.add('disabled');
        const prevLink = document.createElement('a');
        prevLink.classList.add('page-link');
        prevLink.href = '#';
        prevLink.textContent = 'Prev';
        prevLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) handlePageChange(currentPage - 1);
        });
        prevLi.appendChild(prevLink);
        paginationContainer.appendChild(prevLi);

        // Page number buttons (simplified for brevity)
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.classList.add('page-item');
            if (i === currentPage) li.classList.add('active');
            const link = document.createElement('a');
            link.classList.add('page-link');
            link.href = '#';
            link.textContent = i;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                handlePageChange(i);
            });
            li.appendChild(link);
            paginationContainer.appendChild(li);
        }

        // Next button
        const nextLi = document.createElement('li');
        nextLi.classList.add('page-item');
        if (currentPage === totalPages) nextLi.classList.add('disabled');
        const nextLink = document.createElement('a');
        nextLink.classList.add('page-link');
        nextLink.href = '#';
        nextLink.textContent = 'Next';
        nextLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) handlePageChange(currentPage + 1);
        });
        nextLi.appendChild(nextLink);
        paginationContainer.appendChild(nextLi);
    }

    async function handlePageChange(pageNumber) {
        currentPage = pageNumber;
        const { products, total } = await fetchProducts(currentPage); // Fetch products for the new page
        renderProducts(products);
        renderPagination(total, currentPage);
        // Scroll to top of product grid for better UX
        if (productGrid) {
            productGrid.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // --- INITIALIZATION ---
    async function initializeShop() {
        await handlePageChange(1); // Load the first page of products (either all or by category)
    }

    initializeShop();

});
// helper function
function save() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wish', JSON.stringify(wish));

}
// wishlist
const wishToast = document.getElementById('wish-toast');
const wishalert = new bootstrap.Toast(wishToast);
let wish = [];
let wishTotal = 0;
function updateWishlist() {
    const wishlistContainer = document.querySelector("#wishlist-items-container");
    if (!wishlistContainer) return;
    wishlistContainer.innerHTML = '';

    wish.forEach(item => {
        wishlistContainer.innerHTML += `
            <div class="d-flex mb-3 border-bottom pb-3 wishlist-item" data-id="${item.id}">
                <img src="${item.thumbnail || ''}" alt="${item.title || ''}" style="width: 60px; height: 60px; object-fit: cover;" class="rounded">
                <div class="ms-3 flex-grow-1">
                    <h6 class="mb-1">${item.title || ''}</h6>
                    <div class="d-flex align-items-center justify-content-between">
                        <span class="text-primary">$${item.price}</span>
                        <div>
                            <button class="btn btn-sm btn-primary me-2" onclick="addToCart(${item.id}, ${item.price})">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                            <button class="btn btn-sm btn-danger remove-wish" data-id="${item.id}">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
    });

    // Add event listeners for remove buttons
    const removeButtons = wishlistContainer.querySelectorAll('.remove-wish');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const id = this.dataset.id;
            wish = wish.filter(item => item.id != id);
            save();
            updateWishlist();
        });
    });


    const totalItems = wish.length;
    const wishBadge = document.getElementById("wish-count-badge");
    wishBadge.innerText = totalItems;




}

async function addToWish(id, price) {
    try {
        if (!wish.some(item => item.id == id)) {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const product = await response.json();
            wish.push({
                id: id,
                price: price,
                title: product.title || '',
                thumbnail: product.thumbnail || ''
            });
            save();
            updateWishlist();
            wishalert.show();
        }
    } catch (error) {
        console.error("Error adding to wishlist:", error);
    }
}

// Load wishlist on page load
document.addEventListener('DOMContentLoaded', function () {
    const storedWish = localStorage.getItem('wish');
    wish = storedWish ? JSON.parse(storedWish) : [];
    updateWishlist();
});
// cart
const cartToast = document.getElementById('cart-toast');
const toast = new bootstrap.Toast(cartToast);
let cart = [];
let total = 0;
// --- Helper Functions ---
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    cart = storedCart ? JSON.parse(storedCart) : [];
    console.log('Cart loaded on this page:', cart);
}
document.addEventListener('DOMContentLoaded', function () {
    loadCart();
    updateCart();
    //    updateBadge(); // Update cart display immediately after loading
});
async function addToCart(id, price) {
    try {
        let productExist = cart.find(item => item.id == id);
        if (productExist) {
            productExist.quantity += 1;
        } else {

            // Fetch product details to get title/thumbnail
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const product = await response.json();
            cart.push({
                id: id,
                price: price,
                quantity: 1,
                title: product.title || '',
                thumbnail: product.thumbnail || ''
            });
        }
        updateCart();
        save()
        toast.show();

    } catch (error) {
        console.error("Error adding to cart:", error);
    }
}
function updateCart() {

    console.log('updateCartUI is running. Cart data:', cart);
    const cartProducts = document.querySelector("#cart-items-container");
    if (!cartProducts) return;
    cartProducts.innerHTML = ``;

    cart.forEach(cartp => {
        cartProducts.innerHTML += `<div class="d-flex mb-3 border-bottom pb-3 cart-item-row" data-id="${cartp.id}">
            <img src="${cartp.thumbnail || ''}" alt="${cartp.title || ''}" style="width: 60px; height: 60px; object-fit: cover;" class="rounded">
            <div class="ms-3 flex-grow-1">
                <h6 class="mb-1">${cartp.title || ''}</h6>
                <div class="d-flex align-items-center">
                    <small>Qty:</small>
                    <button class="btn btn-sm btn-outline-secondary ms-2 cart-quantity-btn" data-id="${cartp.id}" data-change="-1">-</button>
                    <span class="mx-2 cart-quantity">${cartp.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary cart-quantity-btn" data-id="${cartp.id}" data-change="1">+</button>
                </div>
            </div>
        </div>`;
    });

    // Attach quantity button handlers
    // Attach quantity button handlers
    const qtyButtons = cartProducts.querySelectorAll('.cart-quantity-btn');
    qtyButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const id = this.dataset.id;
            const change = parseInt(this.dataset.change, 10);
            const item = cart.find(i => i.id == id);
            if (!item) return;
            item.quantity = Math.max(0, item.quantity + change);
            if (item.quantity === 0) {
                cart = cart.filter(i => i.id != id);
            }

            // Persist the updated cart to localStorage, then re-render UI
            save();
            updateCart();

        });
    });

    // Get a reference to the element where you display the total
    const cartTotalElement = document.querySelector("#cart-total");

    // A function to calculate and update the total
    function updateCartTotal() {
        // Calculate the total price of all items in the cart array
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }
    const cartCountBadge = document.getElementById("cart-count-badge");

    function updateBadge() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountBadge.innerText = totalItems;
    }

    // Initial call to update the badge when the page loads
    updateBadge();
    updateCartTotal()




    // Optionally disable checkout button when cart is empty
    const checkoutBtn = document.querySelector("#checkout-btn, .checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }
}

function renderOrderSummary() {
    let cart = JSON.parse(localStorage.getItem("cart"))

    const orderSummaryContainer = document.querySelector("#order-summary-container");
    if (!orderSummaryContainer) return;
    orderSummaryContainer.innerHTML = '';

    cart.forEach(item => {
        orderSummaryContainer.innerHTML += `
         <div class="summary-item">
                                        <img src="${item.image}"
                                            alt="">
                                        <div class="flex-grow-1">
                                            <div class="item-title">${item.title}</div>
                                        
                                            <div class="d-flex align-items-center mt-2">
                                                <span class="qty-badge">Qty: ${item.quantity}</span>
                                            </div>
                                        </div>
                                        <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
          `;
    });

    console.log(cart);
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    console.log('Total quantity:', totalQuantity);
    document.getElementById('checkoutbadge').innerText = `${totalQuantity} items`



    const subtotal = (cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    const TAX_RATE = 0.05; // adjust if needed
    const tax = (subtotal * TAX_RATE);


    const shipping = 5;
    const total = (subtotal + shipping + tax).toFixed(2);
    orderSummaryContainer.innerHTML += `<ul class="list-unstyled totals mb-0">
                                        <li class="d-flex justify-content-between">
                                            <span>Subtotal</span><span id="summary-subtotal">$${subtotal.toFixed(2)}</span>
                                        </li>
                                        <li class="d-flex justify-content-between">
                                            <span>Shipping</span><span id="summary-shipping">$5</span>
                                        </li>
                                        <li class="d-flex justify-content-between">
                                            <span>Tax</span><span id="summary-tax">$${tax.toFixed(2)}</span>
                                        </li>
                                        <li class="d-flex justify-content-between fw-bold fs-5 mt-2 pt-2 border-top">
                                            <span>Total</span><span class="text-primary" id="summary-total">$${total}</span>
                                        </li>
                                    </ul>`

}


// Call this function on the totals page to render the order summary
renderOrderSummary();
console.log(renderOrderSummary)

const COMPARE_KEY = 'compare';
const COMPARE_LIMIT = 4;

function getCompare() {
  try { const a = JSON.parse(localStorage.getItem(COMPARE_KEY)) || []; return Array.isArray(a) ? a : []; }
  catch { return []; }
}
function saveCompare(arr) { localStorage.setItem(COMPARE_KEY, JSON.stringify(arr)); }

function showCompareToast(msg) {
  const el = document.getElementById('compare-toast');
  if (!el) return;
  const msgEl = document.getElementById('compare-toast-msg');
  if (msgEl) msgEl.textContent = msg || 'Added to Compare';
  bootstrap.Toast.getOrCreateInstance(el).show();
}

function addToCompare(id) {
  id = Number(id);
  if (!id) return;
  let list = getCompare();
  if (list.includes(id)) { showCompareToast('Already in Compare');  return; }
  if (COMPARE_LIMIT && list.length >= COMPARE_LIMIT) list.shift();
  list.push(id);
  saveCompare(list);
  
  showCompareToast('Added to Compare');
}

function removeFromCompare(id) {
  id = Number(id);
  let list = getCompare().filter(x => Number(x) !== id);
  saveCompare(list);
  
  showCompareToast('Removed from Compare');
}

// Compare page helpers
function truncate(str, n=140){ if(!str) return ''; return str.length>n? str.slice(0,n)+'…' : str; }
function stars(r=0){ const f=Math.round(Math.max(0,Math.min(5,r))); let h=''; for(let i=0;i<5;i++){ h+=`<i class="fa-${i<f?'solid':'regular'} fa-star me-1"></i>` } return `<span class="rating">${h}</span>`; }
function money(n){ return `$${Number(n||0).toFixed(2)}`; }

async function fetchProductsByIds(ids){
  const reqs = ids.map(id => fetch(`https://dummyjson.com/products/${id}`).then(r=>r.json()));
  return Promise.all(reqs);
}

function renderCompareGrid(products){
  const grid = document.getElementById('compare-grid');
  if (!grid) return;

  grid.style.gridTemplateColumns = `220px ${'minmax(240px,1fr) '.repeat(products.length)}`.trim();
  grid.innerHTML = '';

  function addRow(label, vals){
    grid.insertAdjacentHTML('beforeend', `<div class="compare-cell feature">${label}</div>`);
    vals.forEach(v => grid.insertAdjacentHTML('beforeend', `<div class="compare-cell">${v}</div>`));
  }

  // Header
  addRow('Product Image', products.map(p => `
    <div class="product-header">
      <button type="button" class="remove-btn compare-remove" data-id="${p.id}" title="Remove">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <img class="product-thumb" src="${(p.images&&p.images[0])||p.thumbnail}" alt="${p.title}">
    </div>
  `));
  addRow('Name', products.map(p => `<div class="value">${p.title}</div>`));
  addRow('Category', products.map(p => `<div class="value text-capitalize">${p.category||'-'}</div>`));
  addRow('Ratings', products.map(p => `
    <div class="value d-flex align-items-center gap-2">${stars(p.rating)}<span class="muted">(${Math.floor(Math.random()*900)+50} Review)</span></div>
  `));
  addRow('Availability', products.map(p => (p.stock>0)
    ? `<span class="badge badge-soft-success rounded-pill px-3 py-2">In Stock</span>`
    : `<span class="badge badge-soft-danger rounded-pill px-3 py-2">Out Of Stock</span>`
  ));
  addRow('Brand', products.map(p => `<div class="value">${p.brand||'-'}</div>`));
  addRow('Price', products.map(p => `<div class="value fw-semibold">${money(p.price)}</div>`));
  addRow('Description', products.map(p => `<div class="muted">${truncate(p.description,220)}</div>`));
}

// ONE delegated click handler (attach once)
async function handleCompareGridClick(e){
  const btn = e.target.closest('.compare-remove');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  removeFromCompare(id); // global util
  const ids = getCompare();
  const products = ids.length ? await fetchProductsByIds(ids) : [];
  if (products.length) {
    renderCompareGrid(products);
  } else {
    document.getElementById('compare-grid').innerHTML = `<div class="p-4 text-center text-muted">Nothing to compare.</div>`;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const ids = getCompare();
  const products = ids.length ? await fetchProductsByIds(ids) : [];
  if (products.length) {
    renderCompareGrid(products);
  } else {
    document.getElementById('compare-grid').innerHTML = `<div class="p-4 text-center text-muted">Nothing to compare.</div>`;
  }
  // attach once, outside render
  const grid = document.getElementById('compare-grid');
  grid.addEventListener('click', handleCompareGridClick);
});


// (function () {
//   const SELECTORS = {
//     inner: '#newArrivalsInner',
//     ind:   '#newArrivalsIndicators',
//     id:    '#newArrivalsCarousel'
//   };

//   const MAX_ITEMS = 12;     // how many products to show
//   const PER_SLIDE = 4;      // items per slide (lg). Grid classes handle smaller screens

//   function bySel(s) { return document.querySelector(s); }
//   function chunk(arr, size) {
//     const out = [];
//     for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
//     return out;
//   }
//   function cardHTML(p) {
//     const imgMain = (p.images && p.images[0]) || p.thumbnail || 'https://via.placeholder.com/400x300?text=Product';
//     const thumb   = p.thumbnail || imgMain;
//     return `
//       <div class="col-6 col-md-4 col-lg-3">
//         <div class="product-card rounded-4 shadow-sm p-3 h-100">
//           <div class="product-image-container">
//             <img src="${imgMain}" alt="${p.title}" class="img-fluid rounded-3 product-image-default w-100">
//             <img src="${thumb}"   alt="${p.title}" class="product-image-hover img-fluid rounded-3">
//             <div class="product-actions">
//               <a class="action-btn btn" title="View Product" href="product-detail.html?id=${p.id}"><i class="fas fa-eye"></i></a>
//               <a href="#" class="action-btn btn" title="Compare"><i class="fas fa-random"></i></a>
//               <a href="#" class="action-btn btn" title="Add to Cart" onclick="addToCart(${p.id}, ${p.price})"><i class="fas fa-shopping-cart"></i></a>
//             </div>
//           </div>
//           <div class="mt-3">
//             <span class="badge bg-primary">${p.category}</span>
//             <h6 class="mt-2 fw-bold"><a href="#" class="text-decoration-none text-dark">${p.title}</a></h6>
//             <div class="d-inline-block"><span class="fs-5 fw-bold">$${p.price}</span></div>
//           </div>
//         </div>
//       </div>`;
//   }

//   function buildSlides(products) {
//     const inner = bySel(SELECTORS.inner);
//     const ind   = bySel(SELECTORS.ind);
//     const wrap  = bySel(SELECTORS.id);
//     if (!inner || !ind || !wrap) return;

//     inner.innerHTML = '';
//     ind.innerHTML = '';

//     const list = (products || []).slice(0, MAX_ITEMS);
//     if (!list.length) {
//       inner.innerHTML = `<div class="p-4 text-center text-muted">No new arrivals.</div>`;
//       return;
//     }

//     const groups = chunk(list, PER_SLIDE);
//     groups.forEach((group, idx) => {
//       const slide = document.createElement('div');
//       slide.className = `carousel-item ${idx === 0 ? 'active' : ''}`;
//       slide.innerHTML = `<div class="row g-3">${group.map(cardHTML).join('')}</div>`;
//       inner.appendChild(slide);

//       const btn = document.createElement('button');
//       btn.type = 'button';
//       btn.setAttribute('data-bs-target', SELECTORS.id);
//       btn.setAttribute('data-bs-slide-to', String(idx));
//       if (idx === 0) { btn.classList.add('active'); btn.setAttribute('aria-current', 'true'); }
//       ind.appendChild(btn);
//     });
//   }

//   async function fetchSample(limit = MAX_ITEMS) {
//     const res = await fetch(`https://dummyjson.com/products?limit=${limit}`);
//     const data = await res.json();
//     return data.products || [];
//   }

//   async function render(products) {
//     try {
//       let list = Array.isArray(products) && products.length ? products : await fetchSample(MAX_ITEMS);
//       buildSlides(list);
//     } catch (e) {
//       console.error('NewArrivals.render error:', e);
//       buildSlides([]);
//     }
//   }

//   // Expose API
//   window.NewArrivals = { render };

//   // Auto-run after DOM is ready; tries window.allProducts first, otherwise fetches
//   document.addEventListener('DOMContentLoaded', () => {
//     const fromGlobal = Array.isArray(window.allProducts) && window.allProducts.length ? window.allProducts : null;
//     render(fromGlobal);
//   });
// })();

//     const SELECTORS = {
//     inner: '#newArrivalsInner',
//     ind:   '#newArrivalsIndicators',
//     id:    '#newArrivalsCarousel'
//   };

//   const MAX_ITEMS = 12;     // how many products to show
//   const PER_SLIDE = 4;      // items per slide (lg). Grid classes handle smaller screens

//   function bySel(s) { return document.querySelector(s); }
//   function chunk(arr, size) {
//     const out = [];
//     for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
//     return out;
//   }
//   function cardHTML(p) {
//     const imgMain = (p.images && p.images[0]) || p.thumbnail || 'https://via.placeholder.com/400x300?text=Product';
//     const thumb   = p.thumbnail || imgMain;
//     return `
//       <div class="col-6 col-md-4 col-lg-3">
//         <div class="product-card rounded-4 shadow-sm p-3 h-100">
//           <div class="product-image-container">
//             <img src="${imgMain}" alt="${p.title}" class="img-fluid rounded-3 product-image-default w-100">
//             <img src="${thumb}"   alt="${p.title}" class="product-image-hover img-fluid rounded-3">
//             <div class="product-actions">
//               <a class="action-btn btn" title="View Product" href="product-detail.html?id=${p.id}"><i class="fas fa-eye"></i></a>
//               <a href="#" class="action-btn btn" title="Compare"><i class="fas fa-random"></i></a>
//               <a href="#" class="action-btn btn" title="Add to Cart" onclick="addToCart(${p.id}, ${p.price})"><i class="fas fa-shopping-cart"></i></a>
//             </div>
//           </div>
//           <div class="mt-3">
//             <span class="badge bg-primary">${p.category}</span>
//             <h6 class="mt-2 fw-bold"><a href="#" class="text-decoration-none text-dark">${p.title}</a></h6>
//             <div class="d-inline-block"><span class="fs-5 fw-bold">$${p.price}</span></div>
//           </div>
//         </div>
//       </div>`;
//   }

//   function buildSlides(products) {
//     const inner = bySel(SELECTORS.inner);
//     const ind   = bySel(SELECTORS.ind);
//     const wrap  = bySel(SELECTORS.id);
//     if (!inner || !ind || !wrap) return;

//     inner.innerHTML = '';
//     ind.innerHTML = '';

//     const list = (products || []).slice(0, MAX_ITEMS);
//     if (!list.length) {
//       inner.innerHTML = `<div class="p-4 text-center text-muted">No new arrivals.</div>`;
//       return;
//     }

//     const groups = chunk(list, PER_SLIDE);
//     groups.forEach((group, idx) => {
//       const slide = document.createElement('div');
//       slide.className = `carousel-item ${idx === 0 ? 'active' : ''}`;
//       slide.innerHTML = `<div class="row g-3">${group.map(cardHTML).join('')}</div>`;
//       inner.appendChild(slide);

//       const btn = document.createElement('button');
//       btn.type = 'button';
//       btn.setAttribute('data-bs-target', SELECTORS.id);
//       btn.setAttribute('data-bs-slide-to', String(idx));
//       if (idx === 0) { btn.classList.add('active'); btn.setAttribute('aria-current', 'true'); }
//       ind.appendChild(btn);
//     });
//   }

//   async function fetchSample(limit = MAX_ITEMS) {
//     const res = await fetch(`https://dummyjson.com/products?limit=${limit}`);
//     const data = await res.json();
//     return data.products || [];
//   }

//   async function render(products) {
//     try {
//       let list = Array.isArray(products) && products.length ? products : await fetchSample(MAX_ITEMS);
//       buildSlides(list);
//     } catch (e) {
//       console.error('NewArrivals.render error:', e);
//       buildSlides([]);
//     }
//   }

//   // Expose API
//   window.NewArrivals = { render };

//   // Auto-run after DOM is ready; tries window.allProducts first, otherwise fetches
//   document.addEventListener('DOMContentLoaded', () => {
//     const fromGlobal = Array.isArray(window.allProducts) && window.allProducts.length ? window.allProducts : null;
//     render(fromGlobal);
//   })

// }
// newArrivalsCards()

// async function fetchNewArrivals() {
//     try {
//         const response = await fetch('https://dummyjson.com/products?limit=10');
//         const data = await response.json();
//         createNewArrivalsCards(data.products);
//     } catch (error) {
//         console.error("Error fetching new arrivals:", error);
//     }
// }

// function createNewArrivalsCards(products) {
//     const carouselInner = document.querySelector('#newArrivalsInner');
//     carouselInner.innerHTML = '';

//     products.forEach(product => {
        
//         const productCardHTML = `
//                 <div class="col">
//                     <div class="product-card rounded-4 shadow-sm p-3">
//                         <div class="product-image-container">
//                             <img src="${product.images[0]}" alt="${product.title}" class="img-fluid rounded-3 product-image-default" style="width: 100%;">
//                             <img src="${product.thumbnail}" alt="${product.title}" class="product-image-hover img-fluid rounded-3">
//                             <div class="product-actions">
//                                 <a class="action-btn btn" title="View Product" href="product-detail.html?id=${product.id}" ><i class="fas fa-eye"></i></a>
//                                 <a href="#" class="action-btn btn" title="Compare"><i class="fas fa-random "></i></a>
//                                 <a href="#" class="action-btn btn" title="Add to Cart" data-id="${product.id}"  onclick="addToCart(${product.id},${product.price})"><i class="fas fa-shopping-cart"></i></a>
//                             </div>
//                         </div>
//                         <div class="mt-3">
//                             <span class="badge bg-primary">${product.category}</span>
//                             <h6 class="mt-2 fw-bold"><a href="#" class="text-decoration-none text-dark">${product.title}</a></h6>
//                             <p class="text-muted small mb-1">S M XL</p>
//                             <div class="d-inline-block">
//                                 <span class="fs-5 fw-bold">$${product.price}</span>
//                             </div>
//                             <div class="mt-2 d-flex">
//                                 <div>
//                                     <span class="color-dot bg-info rounded-circle d-inline-block" style="width:14px;height:14px;"></span>
//                                     <span class="color-dot bg-warning rounded-circle d-inline-block ms-2" style="width:14px;height:14px;"></span>
//                                     <span class="color-dot bg-success rounded-circle d-inline-block ms-2" style="width:14px;height:14px;"></span>
//                                 </div>
//                                 <button class="btn btn-small ms-auto text-danger" onclick="addToWish(${product.id},${product.price})"><i class="fa-regular fa-heart"></i></button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>`;
//         carouselInner.innerHTML += productCardHTML;
//     });
// }

// document.addEventListener('DOMContentLoaded', fetchNewArrivals);

//  initializeResponsiveCarousel('carouselExampleControls', {
//         992: 4,
//         1200: 5,
//         768: 3,
//         0: 2
//     });