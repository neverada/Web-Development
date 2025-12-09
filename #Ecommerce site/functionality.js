window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0'; // Start the fade-out effect
    setTimeout(function() {
      preloader.style.display = 'none'; // Hide the element completely after it fades
    }, 1500); // The time should match the CSS transition duration
  }
});
// Sidebar Toggle Functionality
// Get DOM elements
const mainLayout = document.getElementById('mainLayout');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarClose = document.getElementById('closeSidebarBtn');
const sidebarinner = document.getElementById("category-sidebar-inner")

// Function to toggle the sidebar
function toggleSidebar() {
    mainLayout.classList.toggle('sidebar-open');
    sidebarToggle.classList.toggle('justify-content-end')
    // sidebarinner.classList.toggle('position-fixed');
}

// Event Listeners
sidebarToggle.addEventListener('click', toggleSidebar);
sidebarClose.addEventListener('click', toggleSidebar);

// Optional: Close sidebar if user clicks outside of it on desktop
document.addEventListener('click', (event) => {
    // Only run this logic on desktop where the sidebar is visible
    if (window.innerWidth >= 992 && mainLayout.classList.contains('sidebar-open')) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = sidebarToggle.contains(event.target);
        sidebarToggle.classList.remove('justify-content-end')

        if (!isClickInsideSidebar && !isClickOnToggle) {
            toggleSidebar();
        }
    }
});

// Optional: On resize, close the sidebar if we go to mobile view
window.addEventListener('resize', () => {
    if (window.innerWidth < 992) {
        mainLayout.classList.remove('sidebar-open');
    }
});
// Deal Timer Script
document.addEventListener('DOMContentLoaded', () => {
    const dealTimer = document.getElementById('deal-timer');

    // Set your own expiry time (e.g., 5 days from now)
    const end = new Date();
    end.setDate(end.getDate() + 344);
    end.setHours(4, 51, 49);

    function updateTimer() {
        const now = new Date();
        const total = end - now;

        if (total < 0) {
            dealTimer.textContent = 'DEAL ENDED';
            return;
        }

        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((total / (1000 * 60)) % 60);
        const seconds = Math.floor((total / 1000) % 60);

        dealTimer.textContent = `${days} Days ${hours} : ${minutes} : ${seconds}`;
    }

    setInterval(updateTimer, 1000);
    updateTimer(); // Initial call
});
// function initializeResponsiveCarousel(carouselId, cardsPerSlideConfig) {
//     const carouselElement = document.getElementById(carouselId);
//     // If carousel doesn't exist on the page, stop the function
//     if (!carouselElement) {
//         console.warn(`Carousel with ID #${carouselId} not found. Skipping initialization.`);
//         return;
//     }

//     const carouselInner = carouselElement.querySelector('.carousel-inner');
//     const indicatorsContainer = carouselElement.querySelector('.carousel-indicators');
//     const allCards = Array.from(carouselInner.children); // Get all original cards
//     const carousel = new bootstrap.Carousel(carouselElement);

//     // Default configuration if none is provided
//     const config = cardsPerSlideConfig || {
//         1200: 5, // xl
//         992: 4,  // lg
//         768: 3,  // md
//         0: 2     // sm and xs
//     };

//     function getCardsPerSlide() {
//         const windowWidth = window.innerWidth;
//         // Find the correct number of cards for the current window width
//         const breakpoints = Object.keys(config).sort((a, b) => b - a); // [1200, 992, 768, 0]
//         for (const breakpoint of breakpoints) {
//             if (windowWidth >= breakpoint) {
//                 return config[breakpoint];
//             }
//         }
//         return 1; // Fallback
//     }

//     function setupCarousel() {
//         const cardsPerSlide = getCardsPerSlide();

//         // Clear existing content
//         carouselInner.innerHTML = '';
//         indicatorsContainer.innerHTML = '';

//         let slideIndex = 0;

//         // Group cards into new carousel items
//         for (let i = 0; i < allCards.length; i += cardsPerSlide) {
//             const carouselItem = document.createElement('div');
//             carouselItem.classList.add('carousel-item');
//             if (i === 0) carouselItem.classList.add('active');

//             const cardsWrapper = document.createElement('div');
//             cardsWrapper.classList.add('d-flex', 'justify-content-center', 'gap-3');

//             const slideCards = allCards.slice(i, i + cardsPerSlide);
//             slideCards.forEach(card => cardsWrapper.appendChild(card));

//             carouselItem.appendChild(cardsWrapper);
//             carouselInner.appendChild(carouselItem);

//             // Create and append an indicator
//             const indicator = document.createElement('button');
//             indicator.type = 'button';
//             indicator.dataset.bsTarget = `#${carouselId}`; // Dynamic target
//             indicator.dataset.bsSlideTo = slideIndex;
//             indicator.classList.add('rounded-pill');
//             if (i === 0) {
//                 indicator.classList.add('active');
//                 indicator.setAttribute('aria-current', 'true');
//             }
//             indicatorsContainer.appendChild(indicator);
//             slideIndex++;
//         }

//         // Re-initialize carousel to the first slide
//         carousel.to(0);
//     }

//     // Initial setup
//     setupCarousel();

//     // Add a debounced resize listener to re-setup the carousel
//     let resizeTimer;
//     window.addEventListener('resize', function () {
//         clearTimeout(resizeTimer);
//         resizeTimer = setTimeout(setupCarousel, 250);
//     });
// }

// document.addEventListener("DOMContentLoaded", function () {

//     /**
//      * Initializes a responsive Bootstrap carousel that adjusts the number of
//      * items per slide based on the screen width.
//      * @param {string} carouselId The ID of the carousel element.
//      * @param {object} cardsPerSlideConfig A configuration object for breakpoints.
//      */


//     // --- NOW, INITIALIZE ALL YOUR CAROUSELS ---

//     // Initialize the "Day of the Deals" carousel
//     initializeResponsiveCarousel('dealCarousel', {
//         992: 4,
//         1200: 5,
//         768: 3,
//         0: 2
//     });

//     // Initialize the "Our Blog" carousel
//     // Let's say we want a different configuration for this one
//     initializeResponsiveCarousel('blogCarousel', {
//         1200: 4,
//         992: 4,
//         768: 3,
//         0: 2
//     });
//     initializeResponsiveCarousel('teamCarousel', {
//         992: 4,
//         1200: 5,
//         768: 3,
//         0: 2
//     });
    
//     //  initializeResponsiveCarousel('thumbnailCarousel', {
//     //     992: 4,
//     //     1200: 5,
//     //     768: 3,
//     //     0: 2
//     // });

//     // You can add more carousels here just by calling the function again!
//     // initializeResponsiveCarousel('testimonialCarousel', { 992: 2, 0: 1 });

// });
// Your existing initializeResponsiveCarousel function (unchanged)
function initializeResponsiveCarousel(carouselId, cardsPerSlideConfig) {
    const carouselElement = document.getElementById(carouselId);
    // If carousel doesn't exist on the page, stop the function
    if (!carouselElement) {
        console.warn(`Carousel with ID #${carouselId} not found. Skipping initialization.`);
        return;
    }

    const carouselInner = carouselElement.querySelector('.carousel-inner');
    const indicatorsContainer = carouselElement.querySelector('.carousel-indicators');
    const allCards = Array.from(carouselInner.children); // Get all original cards
    const carousel = new bootstrap.Carousel(carouselElement);

    // Default configuration if none is provided
    const config = cardsPerSlideConfig || {
        1200: 5, // xl
        992: 4,  // lg
        768: 3,  // md
        0: 1     // sm and xs
    };

    function getCardsPerSlide() {
        const windowWidth = window.innerWidth;
        // Find the correct number of cards for the current window width
        const breakpoints = Object.keys(config).sort((a, b) => b - a); // [1200, 992, 768, 0]
        for (const breakpoint of breakpoints) {
            if (windowWidth >= breakpoint) {
                return config[breakpoint];
            }
        }
        return 1; // Fallback
    }

    function setupCarousel() {
        const cardsPerSlide = getCardsPerSlide();

        // Clear existing content
        carouselInner.innerHTML = '';
        indicatorsContainer.innerHTML = '';

        let slideIndex = 0;

        // Group cards into new carousel items
        for (let i = 0; i < allCards.length; i += cardsPerSlide) {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (i === 0) carouselItem.classList.add('active');

            const cardsWrapper = document.createElement('div');
            cardsWrapper.classList.add('d-flex', 'justify-content-center', 'gap-3');

            const slideCards = allCards.slice(i, i + cardsPerSlide);
            slideCards.forEach(card => cardsWrapper.appendChild(card));

            carouselItem.appendChild(cardsWrapper);
            carouselInner.appendChild(carouselItem);

            // Create and append an indicator
            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.dataset.bsTarget = `#${carouselId}`; // Dynamic target
            indicator.dataset.bsSlideTo = slideIndex;
            indicator.classList.add('rounded-pill');
            if (i === 0) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            }
            indicatorsContainer.appendChild(indicator);
            slideIndex++;
        }

        // Re-initialize carousel to the first slide
        carousel.to(0);
    }

    // Initial setup
    setupCarousel();

    // Add a debounced resize listener to re-setup the carousel
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setupCarousel, 250);
    });
}

// Your existing fetch function (minor tweak: pass the carousel ID for init)
async function fetchNewArrivals(carouselIdToInit = 'carouselExampleControls') {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=10');
        const data = await response.json();
        createNewArrivalsCards(data.products, carouselIdToInit); // Pass the ID for post-population init
    } catch (error) {
        console.error("Error fetching new arrivals:", error);
    }
}

// Updated createNewArrivalsCards: Populate cards, THEN initialize the carousel
function createNewArrivalsCards(products, carouselId) {
    const carouselInner = document.querySelector('#newArrivalsInner'); // Assuming this is .carousel-inner
    if (!carouselInner) {
        console.warn('Carousel inner container (#newArrivalsInner) not found.');
        return;
    }

    carouselInner.innerHTML = ''; // Clear existing (if any)

    products.forEach(product => {
        const productCardHTML = `
            <div class="col">
                <div class="product-card rounded-4 shadow-sm p-3">
                    <div class="product-image-container">
                        <img src="${product.images[0]}" alt="${product.title}" class="img-fluid rounded-3 product-image-default" style="width: 100%;">
                        <img src="${product.thumbnail}" alt="${product.title}" class="product-image-hover img-fluid rounded-3">
                        <div class="product-actions">
                            <a class="action-btn btn" title="View Product" href="product-detail.html?id=${product.id}" ><i class="fas fa-eye"></i></a>
                            <a href="#" class="action-btn btn" title="Compare"  onclick="addToCompare(${product.id})"><i class="fas fa-random "></i></a>
                            <a href="#" class="action-btn btn" title="Add to Cart" data-id="${product.id}"  onclick="addToCart(${product.id},${product.price})"><i class="fas fa-shopping-cart"></i></a>
                        </div>
                    </div>
                    <div class="mt-3">
                        <span class="badge bg-primary">${product.category}</span>
                        <h6 class="mt-2 fw-bold"><a href="#" class="text-decoration-none text-dark">${product.title}</a></h6>
                        <p class="text-muted small mb-1">S M XL</p>
                        <div class="d-inline-block">
                            <span class="fs-5 fw-bold">$${product.price}</span>
                        </div>
                        <div class="mt-2 d-flex">
                            <div>
                                <span class="color-dot bg-info rounded-circle d-inline-block" style="width:14px;height:14px;"></span>
                                <span class="color-dot bg-warning rounded-circle d-inline-block ms-2" style="width:14px;height:14px;"></span>
                                <span class="color-dot bg-success rounded-circle d-inline-block ms-2" style="width:14px;height:14px;"></span>
                            </div>
                            <button class="btn btn-small ms-auto text-danger" onclick="addToWish(${product.id},${product.price})"><i class="fa-regular fa-heart"></i></button>
                        </div>
                    </div>
                </div>
            </div>`;
        carouselInner.innerHTML += productCardHTML;
    });

    // CRITICAL: Initialize the carousel AFTER populating the cards
    // Use the passed carouselId (defaults to 'carouselExampleControls')
    initializeResponsiveCarousel(carouselId, {
        992: 4,
        1200: 5,
        768: 3,
        0: 1
    });
}

// Your existing DOMContentLoaded for static carousels (unchanged)
document.addEventListener("DOMContentLoaded", function () {
    // Initialize static carousels here (they work as-is)
    initializeResponsiveCarousel('dealCarousel', {
        992: 4,
        1200: 5,
        768: 3,
        0: 1
    });

    initializeResponsiveCarousel('blogCarousel', {
        1200: 4,
        992: 4,
        768: 3,
        0: 1
    });
    
    initializeResponsiveCarousel('teamCarousel', {
        992: 4,
        1200: 5,
        768: 3,
        0: 2
    });
    
    // Start the dynamic fetch (no separate init call needed anymore)
    fetchNewArrivals(); // Defaults to 'carouselExampleControls'
});
document.addEventListener("DOMContentLoaded", function () {

    // 1. DATA: Store your testimonial data in an array of objects.
    // I'm using placeholder images. Replace with your actual image URLs.
    const testimonials = [
        {
            image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&q=80",
            text: "This is a fantastic product! It exceeded all of my expectations. The quality and customer service are second to none. I would highly recommend this to everyone.",
            author: "John Doe",
            title: "CEO, Tech Solutions"
        },
        {
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
            text: "I was looking for a solution that was both powerful and easy to use. I found it here. The team has been incredibly supportive throughout the entire process.",
            author: "Jane Smith",
            title: "Marketing Director"
        },
        {
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80",
            text: "An absolutely essential tool for our business. It has streamlined our workflow and saved us countless hours. We can't imagine working without it anymore.",
            author: "Samuel Lee",
            title: "Operations Manager"
        }
    ];

    // 2. DOM Elements: Get references to the HTML elements we need to update.
    const contentContainer = document.getElementById('testimonial-content');
    const imgEl = document.getElementById('testimonial-img');
    const textEl = document.getElementById('testimonial-text');
    const authorEl = document.getElementById('testimonial-author');
    const titleEl = document.getElementById('testimonial-title');

    let currentIndex = 0;

    // 3. Update Function: A function to update the content based on the current index.
    function updateTestimonial() {
        const currentTestimonial = testimonials[currentIndex];

        imgEl.src = currentTestimonial.image;
        textEl.textContent = currentTestimonial.text;
        authorEl.textContent = currentTestimonial.author;
        titleEl.textContent = `(${currentTestimonial.title})`;
    }

    // 4. Animation Logic: The function that handles the fade effect and content switching.
    function showNextTestimonial() {
        // Step A: Fade out the current content
        contentContainer.style.opacity = 0;

        // Step B: Wait for the fade-out animation to finish (500ms, matches the CSS transition)
        setTimeout(() => {
            // Update the index to the next testimonial, looping back to 0 if at the end
            currentIndex = (currentIndex + 1) % testimonials.length;

            // Update the content in the DOM (while it's still invisible)
            updateTestimonial();

            // Step C: Fade the new content back in
            contentContainer.style.opacity = 1;

        }, 500); // This delay must match the CSS transition duration
    }

    // 5. Initialization: Display the first testimonial immediately on page load.
    updateTestimonial();

    // 6. Automation: Start the continuous loop, changing testimonials every 3 seconds.
    // We use 3500ms to allow 3 seconds of visibility + 0.5 seconds for the transition.
    setInterval(showNextTestimonial, 3500);

});
//    insta scroller script
document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector('.marquee__track');

    // Make sure the track exists
    if (track) {
        // Get all items inside the track
        const items = Array.from(track.children);

        // Clone each item and append it to the end of the track
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {

    // --- SMOOTH ACCORDION FOR FILTER SIDEBAR ---

    const filterHeaders = document.querySelectorAll('.filter-header');

    filterHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const filterContent = header.nextElementSibling;
            const filterIcon = header.querySelector('.filter-toggle-icon');

            // Toggle 'open' class for styling and state tracking
            header.classList.toggle('open');

            if (filterContent.style.maxHeight) {
                // If it's open, close it
                filterContent.style.maxHeight = null;
                filterIcon.classList.remove('fa-minus');
                filterIcon.classList.add('fa-plus');
            } else {
                // If it's closed, open it
                // scrollHeight gets the full height of the content, even when hidden
                filterContent.style.maxHeight = filterContent.scrollHeight + 'px';
                filterIcon.classList.remove('fa-plus');
                filterIcon.classList.add('fa-minus');
            }
        });
    });

    // --- OPEN THE FIRST FEW FILTERS BY DEFAULT (OPTIONAL) ---
    // You can trigger a click on the headers you want to be open initially
    const openByDefault = document.querySelectorAll('.filter-header');
    if (openByDefault.length > 0) {
        openByDefault[0].click(); // Open the 'Clothes' filter
        // openByDefault[3].click(); // Open the 'Brand' filter, for example
    }

});
// $('#newArrivalsCarousel').carousel({
//   interval: 10000
// })

// $('.carousel .carousel-item').each(function(){
//     var minPerSlide = 3;
//     var next = $(this).next();
//     if (!next.length) {
//     next = $(this).siblings(':first');
//     }
//     next.children(':first-child').clone().appendTo($(this));
    
//     for (var i=0;i<minPerSlide;i++) {
//         next=next.next();
//         if (!next.length) {
//         	next = $(this).siblings(':first');
//       	}
        
//         next.children(':first-child').clone().appendTo($(this));
//       }
// });

