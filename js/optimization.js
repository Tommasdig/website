// Optimization script for website performance
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading for images
    const lazyLoadImages = () => {
        // Get all image placeholders
        const imagePlaceholders = document.querySelectorAll(
            '.portfolio-img-placeholder, .blog-img-placeholder, .product-img-placeholder, .profile-placeholder'
        );
        
        // Create IntersectionObserver to load images when they come into view
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const placeholder = entry.target;
                    
                    // If this is a real image (not just a placeholder), load it
                    if (placeholder.dataset.src) {
                        placeholder.style.backgroundImage = `url(${placeholder.dataset.src})`;
                        placeholder.dataset.loaded = 'true';
                        observer.unobserve(placeholder);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        // Observe each placeholder
        imagePlaceholders.forEach(placeholder => {
            imageObserver.observe(placeholder);
        });
    };
    
    // Defer non-critical CSS
    const deferNonCriticalCSS = () => {
        const nonCriticalStyles = document.querySelectorAll('link[data-defer]');
        
        nonCriticalStyles.forEach(styleLink => {
            styleLink.setAttribute('rel', 'stylesheet');
            styleLink.removeAttribute('data-defer');
        });
    };
    
    // Optimize animations to respect user preferences
    const optimizeAnimations = () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.classList.add('reduced-motion');
        }
    };
    
    // Initialize performance optimizations
    lazyLoadImages();
    deferNonCriticalCSS();
    optimizeAnimations();
    
    // Add event listener for print media
    window.addEventListener('beforeprint', function() {
        // Add print-specific styles
        const printStyles = document.createElement('style');
        printStyles.innerHTML = `
            .navbar, .hero, .back-to-top, .portfolio-filters, .blog-card .btn,
            .product-card button, #contactForm, footer {
                display: none !important;
            }
            
            body, section {
                padding: 0 !important;
                margin: 0 !important;
            }
            
            section {
                page-break-inside: avoid;
            }
            
            h2.section-heading {
                page-break-after: avoid;
            }
            
            .portfolio-card, .blog-card, .product-card {
                break-inside: avoid;
            }
        `;
        document.head.appendChild(printStyles);
    });
});
