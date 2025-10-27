document.addEventListener('DOMContentLoaded', function () {

    // --- 1. GET THE PRODUCT ID FROM THE URL ---
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    // If there's no ID, we can't show a product.
    if (!productId) {
        document.querySelector('.product-detail-card').innerHTML = '<h2 class="text-center text-danger">Product Not Found!</h2><p class="text-center">Please go back to the shop and select a product.</p>';
        return;
    }

    // --- 2. FETCH THE SPECIFIC PRODUCT'S DATA ---
    async function fetchProductDetails() {
        try {
            const response = await fetch(`https://dummyjson.com/products/${productId}`);
            if (!response.ok) {
                throw new Error('Product not found');
            }
            const product = await response.json();
            renderProductDetails(product);
        } catch (error) {
            console.error('Failed to fetch product details:', error);
            document.querySelector('.product-detail-card').innerHTML = `<h2 class="text-center text-danger">Error Loading Product</h2><p class="text-center">${error.message}</p>`;
        }
    }

    // --- 3. RENDER THE DATA ONTO THE PAGE ---
    function renderProductDetails(product) {
        // Populate main info
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-sku').textContent = product.sku;
        document.getElementById('product-stock-status').textContent = product.availabilityStatus;

        // Price logic
        const oldPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-discount').textContent = `-${product.discountPercentage.toFixed(0)}%`;
        document.getElementById('product-old-price').textContent = `$${oldPrice}`;

        // Populate Rating Stars
        const ratingContainer = document.getElementById('product-rating');
        ratingContainer.innerHTML = ''; // Clear previous
        for (let i = 1; i <= 5; i++) {
            ratingContainer.innerHTML += `<i class="fa-${i <= product.rating ? 'solid' : 'regular'} fa-star"></i>`;
        }
        document.getElementById('product-reviews-count').textContent = `(${product.reviews.length} reviews)`;

        // Populate Image Gallery
        const mainImage = document.getElementById('main-product-image');
        mainImage.src = product.images[0];
  
        const thumbnailImages = document.querySelectorAll('.thumbnail-img')
        thumbnailImages.forEach(thumbImg => {
            thumbImg.src = product.images[0];
        });
      

        // Populate Specifications Tab
        const specsContainer = document.getElementById('specifications-pane');
        specsContainer.innerHTML = `
            <ul class="list-unstyled">
                <li><strong>Brand:</strong> ${product.brand}</li>
                <li><strong>Weight:</strong> ${product.weight}g</li>
                <li><strong>Dimensions:</strong> ${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm</li>
                <li><strong>Warranty:</strong> ${product.warrantyInformation}</li>
                <li><strong>Shipping:</strong> ${product.shippingInformation}</li>
            </ul>
        `;

        // Populate Reviews Tab
        const reviewsContainer = document.getElementById('reviews-container');
        reviewsContainer.innerHTML = '';
        if (product.reviews.length > 0) {
            product.reviews.forEach(review => {
                const reviewerInitial = review.reviewerName.charAt(0);
                const reviewDate = new Date(review.date).toLocaleDateString();
                const reviewItemHTML = `
                    <div class="review-item">
                        <div class="reviewer-avatar">${reviewerInitial}</div>
                        <div>
                            <div class="d-flex justify-content-between">
                                <span class="reviewer-name">${review.reviewerName}</span>
                                <span class="review-date">${reviewDate}</span>
                            </div>
                            <div class="product-rating">
                                ${[...Array(5)].map((_, i) => `<i class="fa-${i < review.rating ? 'solid' : 'regular'} fa-star"></i>`).join('')}
                            </div>
                            <p class="mb-0 mt-2">${review.comment}</p>
                        </div>
                    </div>
                `;
                reviewsContainer.innerHTML += reviewItemHTML;
            });
        } else {
            reviewsContainer.innerHTML = '<p>No reviews yet for this product.</p>';
        }
    }

    // --- 4. INITIALIZE THE PAGE ---
    

    fetchProductDetails();
    






})
