// Main JavaScript for Tommaso Digre's Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const navbar = document.getElementById('mainNav');
    const backToTopButton = document.querySelector('.back-to-top');
    const portfolioFilters = document.querySelectorAll('.portfolio-filters button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactForm = document.getElementById('contactForm');
    
    // Navbar scroll behavior
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
            backToTopButton.classList.add('active');
        } else {
            navbar.classList.remove('navbar-scrolled');
            backToTopButton.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Portfolio filtering
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            portfolioFilters.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide portfolio items based on filter
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Initialize portfolio item placeholders with random colors for demo
    document.querySelectorAll('.portfolio-img-placeholder').forEach(placeholder => {
        const colors = ['#A67C52', '#7D8C75', '#2C3E50'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        placeholder.style.backgroundColor = randomColor;
    });
    
    // Initialize blog image placeholders
    document.querySelectorAll('.blog-img-placeholder').forEach(placeholder => {
        const colors = ['#A67C52', '#7D8C75', '#2C3E50'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        placeholder.style.backgroundColor = randomColor;
    });
    
    // Initialize product image placeholders
    document.querySelectorAll('.product-img-placeholder').forEach(placeholder => {
        const colors = ['#A67C52', '#7D8C75', '#2C3E50'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        placeholder.style.backgroundColor = randomColor;
    });
    
    // Simple shopping cart functionality
    const addToCartButtons = document.querySelectorAll('.product-info button');
    let cartCount = 0;
    
    addToCartButtons.forEach(button => {
        if (!button.disabled) {
            button.addEventListener('click', function() {
                cartCount++;
                alert(`Item added to cart! Cart total: ${cartCount} item(s)`);
            });
        }
    });
});
