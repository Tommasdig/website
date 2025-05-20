// Before-After Slider Component for Portfolio
class BeforeAfterSlider {
    constructor(element) {
        this.element = element;
        this.beforeImage = element.querySelector('.before-image');
        this.afterImage = element.querySelector('.after-image');
        this.slider = element.querySelector('.slider-handle');
        this.sliderLine = element.querySelector('.slider-line');
        this.isDragging = false;
        
        this.init();
    }
    
    init() {
        // Set initial position
        this.setSliderPosition(50);
        
        // Add event listeners
        this.slider.addEventListener('mousedown', this.startDrag.bind(this));
        this.element.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.stopDrag.bind(this));
        
        // Touch events for mobile
        this.slider.addEventListener('touchstart', this.startDrag.bind(this));
        this.element.addEventListener('touchmove', this.drag.bind(this));
        document.addEventListener('touchend', this.stopDrag.bind(this));
        
        // Prevent image dragging
        this.element.querySelectorAll('img').forEach(img => {
            img.addEventListener('dragstart', e => e.preventDefault());
        });
    }
    
    startDrag(e) {
        e.preventDefault();
        this.isDragging = true;
    }
    
    stopDrag() {
        this.isDragging = false;
    }
    
    drag(e) {
        if (!this.isDragging) return;
        
        e.preventDefault();
        
        const rect = this.element.getBoundingClientRect();
        let x = (e.clientX || e.touches[0].clientX) - rect.left;
        
        // Constrain x to the element width
        x = Math.max(0, Math.min(x, rect.width));
        
        // Calculate percentage
        const percent = (x / rect.width) * 100;
        
        this.setSliderPosition(percent);
    }
    
    setSliderPosition(percent) {
        this.afterImage.style.width = `${percent}%`;
        this.slider.style.left = `${percent}%`;
        this.sliderLine.style.left = `${percent}%`;
    }
}

// Portfolio Modal Component
class PortfolioModal {
    constructor() {
        this.modal = document.getElementById('portfolioModal');
        this.modalTitle = document.getElementById('portfolioModalTitle');
        this.modalCategory = document.getElementById('portfolioModalCategory');
        this.modalDescription = document.getElementById('portfolioModalDescription');
        this.modalContent = document.getElementById('portfolioModalContent');
        this.closeBtn = document.querySelector('.modal-close');
        
        this.init();
    }
    
    init() {
        // Add event listeners to portfolio items
        document.querySelectorAll('.portfolio-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const portfolioItem = link.closest('.portfolio-item');
                this.openModal(portfolioItem);
            });
        });
        
        // Close modal when clicking close button
        this.closeBtn.addEventListener('click', () => this.closeModal());
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }
    
    openModal(portfolioItem) {
        // Get data from portfolio item
        const title = portfolioItem.querySelector('h4').textContent;
        const category = portfolioItem.querySelector('p').textContent;
        const itemClass = Array.from(portfolioItem.classList).find(cls => 
            ['restoration', 'design', 'interior'].includes(cls)
        );
        
        // Set modal content
        this.modalTitle.textContent = title;
        this.modalCategory.textContent = category;
        
        // Clear previous content
        this.modalContent.innerHTML = '';
        
        // Add appropriate content based on category
        if (itemClass === 'restoration') {
            this.addBeforeAfterSlider(title);
        } else {
            this.addGalleryImages(title);
        }
        
        // Add description based on project
        this.modalDescription.innerHTML = this.getProjectDescription(title);
        
        // Show modal
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    addBeforeAfterSlider(title) {
        // Create before-after slider for restoration projects
        const sliderHtml = `
            <div class="before-after-slider">
                <div class="before-image">
                    <img src="images/projects/${this.getImageFilename(title)}-before.jpg" alt="${title} Before">
                </div>
                <div class="after-image">
                    <img src="images/projects/${this.getImageFilename(title)}-after.jpg" alt="${title} After">
                </div>
                <div class="slider-line"></div>
                <div class="slider-handle">
                    <i class="fas fa-arrows-alt-h"></i>
                </div>
            </div>
            <div class="slider-labels">
                <span class="before-label">Before</span>
                <span class="after-label">After</span>
            </div>
        `;
        
        this.modalContent.innerHTML = sliderHtml;
        
        // Initialize slider
        new BeforeAfterSlider(this.modalContent.querySelector('.before-after-slider'));
    }
    
    addGalleryImages(title) {
        // Create gallery for design and interior projects
        const galleryHtml = `
            <div class="project-gallery">
                <div class="gallery-main">
                    <img src="images/projects/${this.getImageFilename(title)}-main.jpg" alt="${title}">
                </div>
                <div class="gallery-thumbs">
                    <div class="thumb active">
                        <img src="images/projects/${this.getImageFilename(title)}-main.jpg" alt="${title}">
                    </div>
                    <div class="thumb">
                        <img src="images/projects/${this.getImageFilename(title)}-detail1.jpg" alt="${title} Detail">
                    </div>
                    <div class="thumb">
                        <img src="images/projects/${this.getImageFilename(title)}-detail2.jpg" alt="${title} Detail">
                    </div>
                </div>
            </div>
        `;
        
        this.modalContent.innerHTML = galleryHtml;
        
        // Add click events to thumbnails
        this.modalContent.querySelectorAll('.thumb').forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Update main image
                const mainImg = this.modalContent.querySelector('.gallery-main img');
                mainImg.src = thumb.querySelector('img').src;
                
                // Update active thumb
                this.modalContent.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    }
    
    getImageFilename(title) {
        // Convert title to filename format
        return title.toLowerCase().replace(/\s+/g, '-');
    }
    
    getProjectDescription(title) {
        // Return description based on project title
        const descriptions = {
            'Danish Modern Teak Dining Set': `
                <p>This restoration project involved a complete overhaul of a 1960s Danish teak dining set, including table and four chairs.</p>
                <h5>Restoration Process:</h5>
                <ul>
                    <li>Disassembly and structural repair of loose joints</li>
                    <li>Careful sanding to remove damaged finish while preserving patina</li>
                    <li>Application of teak oil to restore natural wood tones</li>
                    <li>Replacement of chair upholstery with period-appropriate wool fabric</li>
                </ul>
                <p>The goal was to maintain the original character while making the set fully functional for everyday use.</p>
            `,
            'Mid-Century Walnut Credenza': `
                <p>This 1950s walnut credenza required extensive restoration to address veneer damage, drawer issues, and hardware replacement.</p>
                <h5>Restoration Process:</h5>
                <ul>
                    <li>Veneer repair and replacement on damaged areas</li>
                    <li>Drawer reconstruction with dovetail joinery</li>
                    <li>Custom fabrication of missing brass hardware</li>
                    <li>French polishing to achieve a period-appropriate finish</li>
                </ul>
                <p>Special attention was paid to maintaining the piece's original proportions and design details.</p>
            `,
            'Custom Coffee Table': `
                <p>This custom coffee table was designed for a client seeking a piece that would complement their mid-century furniture collection while meeting specific functional needs.</p>
                <h5>Design Features:</h5>
                <ul>
                    <li>Solid walnut construction with hand-cut joinery</li>
                    <li>Floating top design with integrated magazine storage</li>
                    <li>Custom brass inlays and adjustable leveling feet</li>
                    <li>Hand-rubbed oil finish for durability and natural appearance</li>
                </ul>
                <p>The design balances contemporary functionality with classic mid-century aesthetic principles.</p>
            `,
            'Apartment Interior': `
                <p>Complete interior design project for a private apartment in Jordan, focusing on creating a cohesive space that highlights the client's furniture collection.</p>
                <h5>Project Scope:</h5>
                <ul>
                    <li>Space planning and layout optimization</li>
                    <li>Kitchen and bathroom redesign</li>
                    <li>Custom furniture selection and placement</li>
                    <li>Color scheme development and material selection</li>
                </ul>
                <p>The design emphasizes natural light, open flow between spaces, and a neutral palette that showcases the client's wood furniture pieces.</p>
            `,
            'Scandinavian Lounge Chair': `
                <p>Restoration of a classic Scandinavian lounge chair from the 1960s, addressing structural issues while preserving its distinctive design.</p>
                <h5>Restoration Process:</h5>
                <ul>
                    <li>Frame repair with traditional woodworking techniques</li>
                    <li>Spring replacement and new high-density foam cushioning</li>
                    <li>Reupholstery with premium wool fabric in original colorway</li>
                    <li>Refinishing of wooden elements with traditional Scandinavian oil</li>
                </ul>
                <p>The restoration maintains the chair's authentic character while ensuring it will provide comfortable seating for decades to come.</p>
            `,
            'Modular Shelving System': `
                <p>Custom-designed modular shelving system created to showcase both books and decorative objects while adapting to changing needs.</p>
                <h5>Design Features:</h5>
                <ul>
                    <li>Modular components that can be reconfigured as needed</li>
                    <li>Mix of open shelving and closed storage</li>
                    <li>Integrated lighting system to highlight displayed objects</li>
                    <li>Combination of solid oak and veneered plywood construction</li>
                </ul>
                <p>The system was designed with sustainability in mind, using responsibly sourced materials and finishes.</p>
            `
        };
        
        return descriptions[title] || '<p>Detailed project information coming soon.</p>';
    }
}

// Shopping Cart Component
class ShoppingCart {
    constructor() {
        this.cartItems = [];
        this.cartIcon = document.querySelector('.cart-icon');
        this.cartCount = document.querySelector('.cart-count');
        this.cartDropdown = document.querySelector('.cart-dropdown');
        this.cartTotal = document.querySelector('.cart-total');
        this.cartItemsList = document.querySelector('.cart-items');
        this.checkoutBtn = document.querySelector('.checkout-btn');
        
        this.init();
    }
    
    init() {
        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.product-info button:not([disabled])').forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = button.closest('.product-card');
                const title = productCard.querySelector('h4').textContent;
                const price = productCard.querySelector('.product-price').textContent;
                const imgPlaceholder = productCard.querySelector('.product-img-placeholder');
                
                // Get background color as temporary image representation
                const bgColor = window.getComputedStyle(imgPlaceholder).backgroundColor;
                
                this.addToCart({
                    id: this.generateId(),
                    title: title,
                    price: price,
                    color: bgColor,
                    quantity: 1
                });
            });
        });
        
        // Toggle cart dropdown
        this.cartIcon.addEventListener('click', () => {
            this.cartDropdown.classList.toggle('show');
        });
        
        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.cartIcon.contains(e.target) && !this.cartDropdown.contains(e.target)) {
                this.cartDropdown.classList.remove('show');
            }
        });
        
        // Checkout button
        this.checkoutBtn.addEventListener('click', () => {
            if (this.cartItems.length === 0) {
                alert('Your cart is empty.');
                return;
            }
            
            alert('Proceeding to checkout...');
            // In a real implementation, this would redirect to a checkout page
        });
    }
    
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
    
    addToCart(item) {
        // Check if item already exists in cart
        const existingItem = this.cartItems.find(i => i.title === item.title);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cartItems.push(item);
        }
        
        this.updateCart();
    }
    
    removeFromCart(id) {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
        this.updateCart();
    }
    
    updateCart() {
        // Update cart count
        const totalItems = this.cartItems.reduce((total, item) => total + item.quantity, 0);
        this.cartCount.textContent = totalItems;
        
        // Show/hide cart count
        if (totalItems > 0) {
            this.cartCount.classList.add('show');
        } else {
            this.cartCount.classList.remove('show');
        }
        
        // Update cart items list
        this.cartItemsList.innerHTML = '';
        
        this.cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-color" style="background-color: ${item.color}"></div>
                <div class="cart-item-details">
                    <h6>${item.title}</h6>
                    <div class="cart-item-price">${item.price} x ${item.quantity}</div>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            this.cartItemsList.appendChild(itemElement);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                this.removeFromCart(id);
            });
        });
        
        // Update cart total
        const total = this.cartItems.reduce((sum, item) => {
            const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
            return sum + (price * item.quantity);
        }, 0);
        
        this.cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize portfolio modal
    new PortfolioModal();
    
    // Initialize shopping cart
    new ShoppingCart();
    
    // Add cart icon to navbar if not present
    if (!document.querySelector('.cart-icon')) {
        const navbarNav = document.querySelector('.navbar-nav');
        
        const cartIconLi = document.createElement('li');
        cartIconLi.className = 'nav-item cart-icon-container';
        cartIconLi.innerHTML = `
            <a class="nav-link cart-icon" href="#">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count">0</span>
            </a>
            <div class="cart-dropdown">
                <div class="cart-header">
                    <h5>Shopping Cart</h5>
                </div>
                <div class="cart-items">
                    <!-- Cart items will be added here -->
                </div>
                <div class="cart-footer">
                    <div class="cart-total-container">
                        <span>Total:</span>
                        <span class="cart-total">$0.00</span>
                    </div>
                    <button class="btn btn-primary checkout-btn">Checkout</button>
                </div>
            </div>
        `;
        
        navbarNav.appendChild(cartIconLi);
    }
    
    // Add portfolio modal if not present
    if (!document.getElementById('portfolioModal')) {
        const modalHtml = `
            <div id="portfolioModal" class="portfolio-modal">
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <div class="modal-header">
                        <h3 id="portfolioModalTitle"></h3>
                        <p id="portfolioModalCategory"></p>
                    </div>
                    <div id="portfolioModalContent" class="modal-body">
                        <!-- Content will be added dynamically -->
                    </div>
                    <div id="portfolioModalDescription" class="modal-description">
                        <!-- Description will be added dynamically -->
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
});
