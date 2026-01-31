// ========================
// Navigation Menu Toggle
// ========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger icon
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ========================
// Smooth Scrolling
// ========================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================
// Active Navigation Link on Scroll
// ========================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================
// Navbar Background on Scroll
// ========================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        navbar.style.padding = '1rem 0';
    }
});

// ========================
// Intersection Observer for Animations
// ========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate skill bars when in view
            if (entry.target.classList.contains('skill-item')) {
                const skillProgress = entry.target.querySelector('.skill-progress');
                const width = skillProgress.style.width;
                skillProgress.style.width = '0';
                setTimeout(() => {
                    skillProgress.style.width = width;
                }, 100);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .strength-card, .contact-card');

animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ========================
// Skill Progress Bar Animation
// ========================
const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            const targetWidth = skillProgress.style.width;
            
            // Reset width
            skillProgress.style.width = '0';
            
            // Animate to target width
            setTimeout(() => {
                skillProgress.style.width = targetWidth;
            }, 200);
            
            // Unobserve after animation
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

skillItems.forEach(item => {
    skillObserver.observe(item);
});

// ========================
// Typing Effect for Hero Section
// ========================
const heroTitle = document.querySelector('.hero-title');
const titleText = heroTitle.textContent;
let index = 0;

// Only run typing effect on first load
if (sessionStorage.getItem('heroAnimated') !== 'true') {
    heroTitle.textContent = '';
    
    function typeText() {
        if (index < titleText.length) {
            heroTitle.textContent += titleText.charAt(index);
            index++;
            setTimeout(typeText, 50);
        } else {
            sessionStorage.setItem('heroAnimated', 'true');
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeText, 500);
} else {
    heroTitle.textContent = titleText;
}

// ========================
// Dynamic Year in Footer
// ========================
const footerYear = document.querySelector('.footer p');
const currentYear = new Date().getFullYear();
footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);

// ========================
// Scroll to Top Button (Optional Enhancement)
// ========================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

// Add styles for scroll to top button
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 999;
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        background: var(--primary-dark);
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }
    
    .scroll-to-top:active {
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================
// Prevent FOUC (Flash of Unstyled Content)
// ========================
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.visibility = 'visible';
});

// ========================
// Performance Optimization: Lazy Loading
// ========================
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================
// Enhanced Mobile Menu Close on Outside Click
// ========================
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            
            // Reset hamburger icon
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// ========================
// Prevent scroll when mobile menu is open
// ========================
hamburger.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.style.overflow = 'auto';
    });
});

// ========================
// Console Easter Egg (Optional)
// ========================
console.log('%c👋 Hello, curious developer!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cThis portfolio was crafted with care for Kola Mounika', 'font-size: 14px; color: #4b5563;');
console.log('%cInterested in connecting? Reach out at kolamounika22@gmail.com', 'font-size: 12px; color: #10b981;');

// ========================
// Analytics Event Tracking (Placeholder)
// ========================
// Track button clicks
const ctaButtons = document.querySelectorAll('.btn');
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent.trim();
        console.log(`CTA Button clicked: ${buttonText}`);
        // Add your analytics tracking code here
        // Example: gtag('event', 'button_click', { button_name: buttonText });
    });
});

// Track social link clicks
const socialLinks = document.querySelectorAll('.social-icon');
socialLinks.forEach(link => {
    link.addEventListener('click', () => {
        const platform = link.getAttribute('aria-label');
        console.log(`Social link clicked: ${platform}`);
        // Add your analytics tracking code here
    });
});

// Track contact card interactions
const contactCards = document.querySelectorAll('.contact-card a');
contactCards.forEach(link => {
    link.addEventListener('click', () => {
        const contactType = link.closest('.contact-card').querySelector('h3').textContent;
        console.log(`Contact clicked: ${contactType}`);
        // Add your analytics tracking code here
    });
});

// ========================
// Initialize
// ========================
console.log('Portfolio initialized successfully! 🚀');
