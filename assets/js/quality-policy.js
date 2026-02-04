// Quality Policy Page JavaScript
// Minimal animations and interactions for the Quality Policy page

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all quality policy page functionality
    initializeScrollAnimations();
    initializeFloatingElements();
    initializeCommitmentCards();
    initializeParallaxEffects();
    
    // Initialize scroll-triggered animations
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Initialize floating color swatches
    function initializeFloatingElements() {
        const floatingSwatches = document.querySelectorAll('.quality-floating-swatch');
        
        floatingSwatches.forEach((swatch, index) => {
            // Add random floating animation delays
            const delay = Math.random() * 2;
            swatch.style.animationDelay = `${delay}s`;
            
            // Add interactive hover effects
            swatch.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
                this.style.transform = 'scale(1.2) rotate(0deg)';
                this.style.opacity = '0.8';
            });
            
            swatch.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
                this.style.transform = '';
                this.style.opacity = '0.4';
            });
        });
    }

    // Initialize commitment cards interactions
    function initializeCommitmentCards() {
        const commitmentCards = document.querySelectorAll('.commitment-card');
        
        commitmentCards.forEach((card, index) => {
            // Add ripple effect on click
            card.addEventListener('click', function(e) {
                createRippleEffect(this, e);
            });
            
            // Add enhanced hover effects
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.commitment-icon');
                
                if (icon) {
                    icon.style.transform = 'scale(1.15) rotate(10deg)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.commitment-icon');
                
                if (icon) {
                    icon.style.transform = '';
                }
            });
        });
    }

    // Initialize parallax effects
    function initializeParallaxEffects() {
        const heroSection = document.querySelector('.quality-hero-section');
        
        if (heroSection) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                
                const floatingElements = document.querySelectorAll('.quality-floating-swatch');
                floatingElements.forEach((element, index) => {
                    const speed = 0.3 + (index * 0.1);
                    const yPos = scrolled * speed;
                    element.style.transform = `translateY(${yPos}px)`;
                });
            });
        }
    }

    // Utility Functions
    
    // Create ripple effect
    function createRippleEffect(element, event) {
        const ripple = document.createElement('div');
        ripple.className = 'quality-ripple-effect';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(8, 145, 178, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'qualityRipple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Performance optimization for mobile devices
    function optimizeForMobile() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Reduce animation complexity on mobile
            const floatingElements = document.querySelectorAll('.quality-floating-swatch');
            floatingElements.forEach(element => {
                element.style.display = 'none';
            });
        }
    }

    // Initialize mobile optimizations
    optimizeForMobile();
    
    // Re-optimize on resize
    window.addEventListener('resize', optimizeForMobile);

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// CSS animations injected via JavaScript
const qualityStyle = document.createElement('style');
qualityStyle.textContent = `
    @keyframes qualityRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .quality-ripple-effect {
        z-index: 1;
    }
    
    /* Enhanced hover states */
    .commitment-card:hover {
        transform: translateY(-0.5rem);
        box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
    }
    
    /* Smooth transitions for all interactive elements */
    .commitment-card,
    .quality-floating-swatch {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

document.head.appendChild(qualityStyle);