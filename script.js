// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Dropdown functionality for mobile
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Carousel functionality
const carouselItems = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentSlide = 0;
const totalSlides = carouselItems.length;
let autoPlayInterval;

// Function to show a specific slide
function showSlide(index) {
    // Remove active class from all items
    carouselItems.forEach(item => item.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Handle wrap around
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    
    // Add active class to current slide
    carouselItems[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Previous slide
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto play
function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Event listeners
prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoPlay();
    startAutoPlay(); // Restart auto play after manual control
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoPlay();
    startAutoPlay(); // Restart auto play after manual control
});

// Indicator clicks
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        stopAutoPlay();
        startAutoPlay(); // Restart auto play after manual control
    });
});

// Pause auto play on hover
const carousel = document.getElementById('carousel');
carousel.addEventListener('mouseenter', stopAutoPlay);
carousel.addEventListener('mouseleave', startAutoPlay);

// Start auto play on page load
startAutoPlay();

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#myCarousel') {
            e.preventDefault();
            navMenu.classList.remove('active'); // Close mobile menu
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
