// Hero Carousel Enhanced Functionality

document.addEventListener('DOMContentLoaded', function () {
    // Initialize carousel elements
    const carousel = document.getElementById('heroCarousel');
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 6000,
        wrap: true,
        touch: true,
        pause: 'hover'
    });

    // Enhanced carousel functionality
    initializeCarouselEnhancements();
    initializeFloatingElements();
    initializeColorAnimations();
    initializeStatsCounters();
    initializeParallaxEffects();
    initializeProgressIndicators();
    initializeTouchGestures();
    initializeKeyboardNavigation();
    initializeAutoplayControls();
    initializeSlideTransitions();

    // Initialize carousel enhancements
    function initializeCarouselEnhancements() {
        const slides = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.carousel-indicators button');

        // Add custom slide change animations
        carousel.addEventListener('slide.bs.carousel', function (e) {
            const activeSlide = document.querySelector('.carousel-item.active');
            const nextSlide = e.relatedTarget;

            // Add exit animation to current slide
            if (activeSlide) {
                activeSlide.classList.add('slide-out');
            }

            // Add enter animation to next slide
            if (nextSlide) {
                nextSlide.classList.add('slide-in');
            }

            // Update progress indicators
            updateProgressIndicators(e.to);

            // Trigger slide-specific animations
            triggerSlideAnimations(e.to);
        });

        // Clean up animation classes after transition
        carousel.addEventListener('slid.bs.carousel', function (e) {
            slides.forEach(slide => {
                slide.classList.remove('slide-out', 'slide-in');
            });
        });

        // Enhanced indicator interactions
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('mouseenter', function () {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'scale(1.2)';
                }
            });

            indicator.addEventListener('mouseleave', function () {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'scale(1)';
                }
            });
        });
    }

    // Initialize floating color elements
    function initializeFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-swatch');

        floatingElements.forEach((element, index) => {
            // Add random floating animation delays
            const delay = Math.random() * 2;
            element.style.animationDelay = `${delay}s`;

            // Add interactive hover effects
            element.addEventListener('mouseenter', function () {
                this.style.animationPlayState = 'paused';
                this.style.transform = 'scale(1.2) rotate(0deg)';
            });

            element.addEventListener('mouseleave', function () {
                this.style.animationPlayState = 'running';
                this.style.transform = '';
            });
        });
    }

    // Initialize color sample animations
    function initializeColorAnimations() {
        const colorSamples = document.querySelectorAll('.color-sample');
        const colorDots = document.querySelectorAll('.color-dots .dot');

        // Color sample interactions
        colorSamples.forEach((sample, index) => {
            sample.addEventListener('mouseenter', function () {
                this.style.transform = 'scale(1.1) rotate(5deg)';
                this.style.zIndex = '10';

                // Show color name tooltip
                const colorName = this.getAttribute('data-color');
                if (colorName) {
                    showColorTooltip(this, colorName);
                }
            });

            sample.addEventListener('mouseleave', function () {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.zIndex = '1';
                hideColorTooltip();
            });

            // Add ripple effect on click
            sample.addEventListener('click', function (e) {
                createRippleEffect(this, e);
            });
        });

        // Color dots animations
        colorDots.forEach((dot, index) => {
            dot.addEventListener('mouseenter', function () {
                this.style.transform = 'scale(1.3)';
                this.style.boxShadow = '0 0 20px rgba(255,255,255,0.8)';
            });

            dot.addEventListener('mouseleave', function () {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            });
        });
    }

    // Initialize animated counters for stats
    function initializeStatsCounters() {
        const statNumbers = document.querySelectorAll('.stat-number, .global-stat h4');

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        statNumbers.forEach(stat => observer.observe(stat));
    }

    // Animate counter numbers
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const suffix = element.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, stepTime);
    }

    // Initialize parallax effects
    function initializeParallaxEffects() {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-swatch');

            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Initialize progress indicators
    function initializeProgressIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicators button');

        indicators.forEach((indicator, index) => {
            const progressBar = document.createElement('div');
            progressBar.className = 'indicator-progress';
            indicator.appendChild(progressBar);
        });
    }

    // Update progress indicators
    function updateProgressIndicators(activeIndex) {
        const indicators = document.querySelectorAll('.carousel-indicators button');

        indicators.forEach((indicator, index) => {
            const progressBar = indicator.querySelector('.indicator-progress');

            if (index === activeIndex) {
                indicator.classList.add('active');
                if (progressBar) {
                    progressBar.style.width = '100%';
                }
            } else {
                indicator.classList.remove('active');
                if (progressBar) {
                    progressBar.style.width = '0%';
                }
            }
        });
    }

    // Initialize touch gestures
    function initializeTouchGestures() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        carousel.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        carousel.addEventListener('touchend', function (e) {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;

            const deltaX = endX - startX;
            const deltaY = endY - startY;

            // Only trigger if horizontal swipe is dominant
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    carouselInstance.prev();
                } else {
                    carouselInstance.next();
                }
            }
        });
    }

    // Initialize keyboard navigation
    function initializeKeyboardNavigation() {
        document.addEventListener('keydown', function (e) {
            if (isCarouselInView()) {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        carouselInstance.prev();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        carouselInstance.next();
                        break;
                    case ' ':
                        e.preventDefault();
                        toggleAutoplay();
                        break;
                }
            }
        });
    }

    // Check if carousel is in viewport
    function isCarouselInView() {
        const rect = carousel.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    // Initialize autoplay controls
    function initializeAutoplayControls() {
        // Pause on hover
        carousel.addEventListener('mouseenter', function () {
            carouselInstance.pause();
        });

        carousel.addEventListener('mouseleave', function () {
            carouselInstance.cycle();
        });

        // Pause when tab is not visible
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                carouselInstance.pause();
            } else {
                carouselInstance.cycle();
            }
        });
    }

    // Toggle autoplay
    function toggleAutoplay() {
        const isPaused = carousel.classList.contains('paused');

        if (isPaused) {
            carouselInstance.cycle();
            carousel.classList.remove('paused');
        } else {
            carouselInstance.pause();
            carousel.classList.add('paused');
        }
    }

    // Initialize slide-specific transitions
    function initializeSlideTransitions() {
        const slides = document.querySelectorAll('.carousel-item');

        slides.forEach((slide, index) => {
            slide.setAttribute('data-slide-index', index);
        });
    }

    // Trigger slide-specific animations
    function triggerSlideAnimations(slideIndex) {
        const slide = document.querySelector(`[data-slide-index="${slideIndex}"]`);

        if (slide) {
            // Reset all animations
            const animatedElements = slide.querySelectorAll('.hero-content > *');
            animatedElements.forEach((el, index) => {
                el.style.animation = 'none';
                el.offsetHeight; // Trigger reflow
                el.style.animation = `slideInUp 0.8s ease-out ${index * 0.1}s both`;
            });

            // Trigger specific animations based on slide
            switch (slideIndex) {
                case 0:
                    animateColorPalette(slide);
                    break;
                case 1:
                    animateProductShowcase(slide);
                    break;
                case 2:
                    animateQualityMetrics(slide);
                    break;
                case 3:
                    animateWorldMap(slide);
                    break;
            }
        }
    }

    // Animate color palette (Slide 1)
    function animateColorPalette(slide) {
        const colorSamples = slide.querySelectorAll('.color-sample');
        colorSamples.forEach((sample, index) => {
            setTimeout(() => {
                sample.style.animation = 'bounceIn 0.6s ease-out both';
            }, index * 100);
        });
    }

    // Animate product showcase (Slide 2)
    function animateProductShowcase(slide) {
        const productCategories = slide.querySelectorAll('.product-category');
        productCategories.forEach((category, index) => {
            setTimeout(() => {
                category.style.animation = 'fadeInUp 0.8s ease-out both';
            }, index * 200);
        });
    }

    // Animate quality metrics (Slide 3)
    function animateQualityMetrics(slide) {
        const metrics = slide.querySelectorAll('.metric');
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                metric.style.animation = 'slideInLeft 0.8s ease-out both';
            }, index * 300);
        });
    }

    // Animate world map (Slide 4)
    function animateWorldMap(slide) {
        const mapPoints = slide.querySelectorAll('.map-point');
        mapPoints.forEach((point, index) => {
            setTimeout(() => {
                point.style.animation = 'pulse 1s ease-in-out infinite';
            }, index * 200);
        });
    }

    // Show color tooltip
    function showColorTooltip(element, colorName) {
        const tooltip = document.createElement('div');
        tooltip.className = 'color-tooltip';
        tooltip.textContent = colorName;

        const rect = element.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.top = (rect.top - 40) + 'px';
        tooltip.style.left = (rect.left + rect.width / 2) + 'px';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.background = 'rgba(0,0,0,0.8)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.zIndex = '1000';
        tooltip.style.pointerEvents = 'none';

        document.body.appendChild(tooltip);

        // Store reference for cleanup
        element._tooltip = tooltip;
    }

    // Hide color tooltip
    function hideColorTooltip() {
        const tooltips = document.querySelectorAll('.color-tooltip');
        tooltips.forEach(tooltip => tooltip.remove());
    }

    // Create ripple effect
    function createRippleEffect(element, event) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';

        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Performance optimization: Reduce animations on low-end devices
    function optimizeForPerformance() {
        const isLowEndDevice = navigator.hardwareConcurrency < 4 ||
            navigator.deviceMemory < 4 ||
            /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isLowEndDevice) {
            // Reduce animation complexity
            document.documentElement.style.setProperty('--animation-duration', '0.3s');

            // Disable some floating elements
            const floatingElements = document.querySelectorAll('.floating-swatch');
            floatingElements.forEach((el, index) => {
                if (index > 2) el.style.display = 'none';
            });
        }
    }

    // Initialize performance optimizations
    optimizeForPerformance();

    // Accessibility improvements
    function initializeAccessibility() {
        // Add ARIA labels
        const prevButton = carousel.querySelector('.carousel-control-prev');
        const nextButton = carousel.querySelector('.carousel-control-next');

        if (prevButton) prevButton.setAttribute('aria-label', 'Previous slide');
        if (nextButton) nextButton.setAttribute('aria-label', 'Next slide');

        // Add slide announcements for screen readers
        carousel.addEventListener('slid.bs.carousel', function (e) {
            const slideNumber = e.to + 1;
            const totalSlides = document.querySelectorAll('.carousel-item').length;

            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = `Slide ${slideNumber} of ${totalSlides}`;

            document.body.appendChild(announcement);
            setTimeout(() => announcement.remove(), 1000);
        });
    }

    // Initialize accessibility features
    initializeAccessibility();

    // Cleanup function
    window.addEventListener('beforeunload', function () {
        // Clean up event listeners and timers
        hideColorTooltip();
    });
});

// CSS animations keyframes (injected via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.1);
            opacity: 0.7;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .indicator-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background: var(--primary);
        width: 0%;
        transition: width 6s linear;
    }
    
    .carousel-indicators button.active .indicator-progress {
        width: 100%;
    }
    
    .slide-out {
        animation: slideOut 0.5s ease-in-out;
    }
    
    .slide-in {
        animation: slideIn 0.5s ease-in-out;
    }
    
    @keyframes slideOut {
        to {
            opacity: 0;
            transform: translateX(-100px);
        }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);