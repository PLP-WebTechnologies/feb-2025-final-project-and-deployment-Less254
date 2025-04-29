     // Mobile Navigation Toggle
     const menuToggle = document.querySelector('.menu-toggle');
     const navLinks = document.querySelector('.nav-links');
     
     menuToggle.addEventListener('click', () => {
         menuToggle.classList.toggle('active');
         navLinks.classList.toggle('active');
     });
     
     // Close mobile menu when clicking outside
     document.addEventListener('click', (e) => {
         if (!menuToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
             menuToggle.classList.remove('active');
             navLinks.classList.remove('active');
         }
     });
     
     // Newsletter subscription functionality
     const newsletterForm = document.getElementById('newsletter-form');
     const subscriptionMessage = document.getElementById('subscription-message');
     
     if (newsletterForm) {
         newsletterForm.addEventListener('submit', (e) => {
             e.preventDefault();
             
             const email = document.getElementById('email').value;
             
             // Simulate form submission with a delay
             subscriptionMessage.textContent = 'Processing...';
             
             setTimeout(() => {
                 // In a real application, you would send this data to a server
                 console.log('Subscription email:', email);
                 
                 // Clear the form and show success message
                 newsletterForm.reset();
                 subscriptionMessage.textContent = 'Thank you for subscribing!';
                 subscriptionMessage.style.color = '#8fdb69';
                 
                 // Clear the message after 5 seconds
                 setTimeout(() => {
                     subscriptionMessage.textContent = '';
                 }, 5000);
             }, 1500);
         });
     }
     
     // Create a simple post view counter (simulated)
     const postLinks = document.querySelectorAll('.read-more');
     
     postLinks.forEach(link => {
         link.addEventListener('click', (e) => {
             const postTitle = e.target.closest('.post-card').querySelector('h3').textContent;
             
             // Get current view count from localStorage or set to 0 if not exists
             const viewCounts = JSON.parse(localStorage.getItem('postViewCounts')) || {};
             viewCounts[postTitle] = (viewCounts[postTitle] || 0) + 1;
             
             // Save updated view count
             localStorage.setItem('postViewCounts', JSON.stringify(viewCounts));
             console.log(`Post "${postTitle}" has been viewed ${viewCounts[postTitle]} times.`);
         });
     });
     
     // Add smooth scrolling for anchor links
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
         anchor.addEventListener('click', function(e) {
             e.preventDefault();
             
             const targetId = this.getAttribute('href').substring(1);
             const targetElement = document.getElementById(targetId);
             
             if (targetElement) {
                 window.scrollTo({
                     top: targetElement.offsetTop - 70, // Adjust for header height
                     behavior: 'smooth'
                 });
             }
         });
     });
     
     // Add animation on scroll for post cards
     const observeElements = () => {
         const observer = new IntersectionObserver((entries) => {
             entries.forEach(entry => {
                 if (entry.isIntersecting) {
                     entry.target.classList.add('animated');
                     observer.unobserve(entry.target);
                 }
             });
         }, { threshold: 0.1 });
         
         document.querySelectorAll('.post-card').forEach(card => {
             observer.observe(card);
         });
     };
     
     // Run the animation observer when DOM is loaded
     if ('IntersectionObserver' in window) {
         document.addEventListener('DOMContentLoaded', observeElements);
     }
     
     // Current year for footer copyright
     document.addEventListener('DOMContentLoaded', () => {
         const copyrightEl = document.querySelector('.copyright p');
         if (copyrightEl) {
             const currentYear = new Date().getFullYear();
             copyrightEl.textContent = copyrightEl.textContent.replace('2025', currentYear);
         }
     });
     
     // Dynamic theme toggle functionality
     const createThemeToggle = () => {
         const header = document.querySelector('header');
         
         // Create toggle button
         const themeToggle = document.createElement('button');
         themeToggle.className = 'theme-toggle';
         themeToggle.setAttribute('aria-label', 'Toggle dark mode');
         themeToggle.innerHTML = '🌙';
         
         // Append to header
         header.appendChild(themeToggle);
         
         // Check for saved theme preference
         const savedTheme = localStorage.getItem('theme');
         if (savedTheme === 'dark') {
             document.body.classList.add('dark-mode');
             themeToggle.innerHTML = '☀️';
         }
         
         // Add toggle functionality
         themeToggle.addEventListener('click', () => {
             document.body.classList.toggle('dark-mode');
             
             if (document.body.classList.contains('dark-mode')) {
                 localStorage.setItem('theme', 'dark');
                 themeToggle.innerHTML = '☀️';
             } else {
                 localStorage.setItem('theme', 'light');
                 themeToggle.innerHTML = '🌙';
             }
         });
         
         // Add styles for dark mode
         const styleEl = document.createElement('style');
         styleEl.textContent = `
             .theme-toggle {
                 background: none;
                 border: none;
                 font-size: 1.5rem;
                 cursor: pointer;
                 margin-left: 1rem;
                 transition: transform 0.3s ease;
             }
             
             .theme-toggle:hover {
                 transform: rotate(30deg);
             }
             
             body.dark-mode {
                 background-color: #222;
                 color: #f9f9f9;
             }
             
             body.dark-mode header {
                 background-color: #333;
             }
             
             body.dark-mode .logo h1 {
                 color: #65a6e0;
             }
             
             body.dark-mode .nav-links a {
                 color: #f9f9f9;
             }
             
             body.dark-mode .bar {
                 background-color: #f9f9f9;
             }
             
             body.dark-mode .post-card {
                 background-color: #333;
                 box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
             }
             
             body.dark-mode .post-category,
             body.dark-mode .read-more {
                 color: #65a6e0;
             }
             
             body.dark-mode footer {
                 background-color: #111;
             }
         `;
         document.head.appendChild(styleEl);
     };
     
     // Initialize theme toggle
     document.addEventListener('DOMContentLoaded', createThemeToggle);