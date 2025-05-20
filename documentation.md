# Tommaso Digre CV Website Documentation

## Overview

This documentation provides instructions for maintaining and updating your CV website. The website is a single-page scrolling design that showcases your dual expertise in design and furniture restoration, with sections for your CV, skills, portfolio, blog, and shop.

## Website Structure

The website consists of the following sections:

1. **Hero Section**: Introduction with your professional title
2. **About/CV Section**: Your professional background and experience
3. **Skills Section**: Visual representation of your design and restoration skills
4. **Portfolio Gallery**: Showcases your projects with filtering options
5. **Blog Section**: Area for sharing project details and insights
6. **Shop Section**: E-commerce functionality for selling restored pieces
7. **Contact Section**: Your contact information and a contact form

## Updating Content

### Updating Text Content

To update text content on the website, you'll need to edit the `index.html` file:

1. Open the `index.html` file in a text editor
2. Locate the section you want to update
3. Modify the text between the appropriate HTML tags
4. Save the file and upload it to your server

### Updating Images

#### Portfolio Images

Portfolio images should be placed in the `images/projects/` folder with the following naming conventions:

- For restoration projects with before/after views:
  - `[project-name]-before.jpg`
  - `[project-name]-after.jpg`
  
- For other projects:
  - `[project-name]-main.jpg`
  - `[project-name]-detail1.jpg`
  - `[project-name]-detail2.jpg`

The project name should match the title in your HTML, but converted to lowercase with spaces replaced by hyphens. For example, "Danish Modern Teak Dining Set" would be `danish-modern-teak-dining-set`.

#### Blog Images

Blog post images should be placed in the `images/blog/` folder with a descriptive name, such as `restoration-techniques.jpg`.

#### Shop Product Images

Product images should be placed in the `images/products/` folder with a naming convention that includes the product name, such as `teak-dining-chairs.jpg`.

#### Profile Image

To update your profile image, replace the file at `images/profile.jpg` with your own image, keeping the same filename.

#### Hero Background

To update the hero background image, replace the file at `images/hero-bg.jpg` with your own image, keeping the same filename.

## Adding New Content

### Adding Portfolio Items

To add a new portfolio item:

1. Open the `index.html` file
2. Locate the portfolio section (`<section id="portfolio">`)
3. Find the portfolio container (`<div class="row portfolio-container">`)
4. Add a new portfolio item using the following template:

```html
<div class="col-md-6 col-lg-4 mb-4 portfolio-item [category]">
    <div class="portfolio-card">
        <div class="portfolio-img-placeholder" data-src="images/projects/[project-name]-main.jpg"></div>
        <div class="portfolio-info">
            <h4>[Project Title]</h4>
            <p>[Category]</p>
            <a href="#" class="portfolio-link"><i class="fas fa-plus"></i></a>
        </div>
    </div>
</div>
```

Replace `[category]` with one of: `restoration`, `design`, or `interior`.
Replace `[project-name]` with the lowercase, hyphenated version of your project title.
Replace `[Project Title]` with the actual title of your project.
Replace `[Category]` with the category of the project.

5. Add the project description to the `getProjectDescription` function in the `portfolio-features.js` file

### Adding Blog Posts

To add a new blog post:

1. Open the `index.html` file
2. Locate the blog section (`<section id="blog">`)
3. Find the blog posts container (`<div class="row">`)
4. Add a new blog post using the following template:

```html
<div class="col-md-6 col-lg-4 mb-4">
    <div class="blog-card">
        <div class="blog-img-placeholder" data-src="images/blog/[blog-image].jpg"></div>
        <div class="blog-content">
            <h4>[Blog Title]</h4>
            <p class="blog-date">[Date]</p>
            <p class="blog-excerpt">[Brief excerpt of the blog post...]</p>
            <a href="#" class="btn btn-sm btn-outline-primary">Read More</a>
        </div>
    </div>
</div>
```

Replace `[blog-image]` with the name of your blog image file.
Replace `[Blog Title]` with the title of your blog post.
Replace `[Date]` with the date of the blog post.
Replace `[Brief excerpt of the blog post...]` with a short excerpt.

### Adding Shop Products

To add a new product to the shop:

1. Open the `index.html` file
2. Locate the shop section (`<section id="shop">`)
3. Find the shop items container (`<div class="row">`)
4. Add a new product using the following template:

```html
<div class="col-md-6 col-lg-4 mb-4">
    <div class="product-card">
        <div class="product-img-placeholder" data-src="images/products/[product-image].jpg"></div>
        <div class="product-info">
            <h4>[Product Title]</h4>
            <p class="product-price">$[Price]</p>
            <p class="product-status">Available</p>
            <button class="btn btn-primary btn-sm">Add to Cart</button>
        </div>
    </div>
</div>
```

Replace `[product-image]` with the name of your product image file.
Replace `[Product Title]` with the title of your product.
Replace `[Price]` with the price of the product.

For sold-out products, change `Available` to `Sold Out` and replace the button with:

```html
<button class="btn btn-secondary btn-sm" disabled>Sold Out</button>
```

## E-commerce Functionality

The current implementation includes a basic shopping cart system. For a full e-commerce solution with payment processing, you would need to integrate with a service like Stripe, PayPal, or Shopify.

## Responsive Design

The website is fully responsive and will adapt to different screen sizes. You can test this by resizing your browser window or viewing the site on different devices.

## Performance Optimization

The website includes several performance optimizations:

- Lazy loading of images
- Deferred loading of non-critical CSS
- Optimized animations based on user preferences

## Accessibility Features

The website includes several accessibility features:

- Keyboard navigation support
- Screen reader compatibility
- Reduced motion option for users who prefer minimal animations
- High contrast mode support
- Skip to content link for keyboard users

## Final Deployment to Your Domain

To deploy the website to your domain (tommas.no):

1. Access your domain's DNS settings or hosting provider
2. Point your domain to the server where the website files are hosted
3. Upload all website files to your hosting provider
4. Ensure all file permissions are set correctly

## Need Help?

If you need assistance with updating or maintaining your website, please don't hesitate to reach out. I'm here to help ensure your website continues to effectively showcase your unique skills and projects.
