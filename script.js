// Portfolio Website JavaScript - Clean & Bug-Free

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initSkillBars();
    initContactForm();
    initScrollEffects();
}

// Mobile Menu Functionality
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const navItems = document.querySelectorAll('.nav-item');

    // Open mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close mobile menu
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu when nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Close menu and scroll function
function closeMenuAndScroll(sectionId) {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
        scrollToSection(sectionId);
    }, 300);
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                bar.classList.add('animated');
            }
        });
    };

    // Initial check
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
}

// Skills Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize skills section
    initSkillsSection();
});

function initSkillsSection() {
    // Add CSS animations and styles dynamically
    addSkillsStyles();
    
    // Initialize skill animations
    setupSkillAnimations();
    
    // Add scroll animation
    setupScrollAnimation();
    
    // Add interactive features
    addInteractiveFeatures();
    
    // Add performance optimizations
    addPerformanceOptimizations();
}

function addSkillsStyles() {
    // Add dynamic CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        /* Skill level label tooltip */
        .skill-level[data-level]::before {
            content: attr(data-level);
            position: absolute;
            top: -25px;
            right: 0;
            background: #3b82f6;
            color: white;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 0.75rem;
            font-weight: 600;
            opacity: 0;
            transform: translateY(5px);
            transition: all 0.3s ease;
            pointer-events: none;
            z-index: 10;
        }
        
        .skill:hover .skill-level[data-level]::before {
            opacity: 1;
            transform: translateY(0);
        }
        
        .dark-theme .skill-level[data-level]::before {
            background: #1e40af;
        }
        
        /* Skill bar click animation */
        .skill-bar {
            cursor: pointer;
            position: relative;
        }
        
        .skill-bar.clicked .skill-level {
            animation: pulseClick 0.8s ease;
        }
        
        @keyframes pulseClick {
            0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
            100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        
        /* Skill notification */
        .skill-notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            color: white;
            padding: 12px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 9999;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .skill-notification.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .skill-notification i {
            font-size: 1.2rem;
        }
        
        /* Enhanced skill animations */
        .skill.animated {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .skill-level.animated {
            animation: skillProgress 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        
        @keyframes skillProgress {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
        }
        
        /* Skill percentage counting animation */
        .skill-info span:last-child.counting {
            animation: countUp 0.5s ease forwards;
            opacity: 0;
        }
        
        @keyframes countUp {
            from { 
                opacity: 0;
                transform: translateY(10px) scale(0.9);
            }
            to { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        /* Category icon animation */
        .skills-category:hover h3 i {
            transform: rotate(360deg);
            transition: transform 0.6s ease;
        }
        
        .skills-category h3 i {
            transition: transform 0.6s ease;
        }
        
        /* Floating animation for categories */
        .skills-category {
            animation: float 6s ease-in-out infinite;
        }
        
        .skills-category:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .skills-category:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        /* Skill tooltip */
        .skill-tooltip {
            position: absolute;
            bottom: calc(100% + 10px);
            left: 0;
            background: rgba(30, 41, 59, 0.95);
            backdrop-filter: blur(10px);
            color: #f8fafc;
            padding: 12px;
            border-radius: 8px;
            font-size: 0.85rem;
            min-width: 200px;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            pointer-events: none;
        }
        
        .skill-tooltip::before {
            content: '';
            position: absolute;
            top: 100%;
            left: 20px;
            border-width: 6px;
            border-style: solid;
            border-color: rgba(30, 41, 59, 0.95) transparent transparent transparent;
        }
        
        .skill-tooltip.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .dark-theme .skill-tooltip {
            background: rgba(15, 23, 42, 0.95);
            border-color: rgba(255, 255, 255, 0.05);
        }
        
        .dark-theme .skill-tooltip::before {
            border-color: rgba(15, 23, 42, 0.95) transparent transparent transparent;
        }
        
        .tooltip-content h4 {
            margin: 0 0 8px 0;
            font-size: 0.95rem;
            color: #3b82f6;
        }
        
        .tooltip-content p {
            margin: 0 0 12px 0;
            color: #cbd5e1;
            line-height: 1.5;
        }
        
        .tooltip-stats {
            display: flex;
            justify-content: space-between;
            font-size: 0.75rem;
            color: #94a3b8;
        }
        
        .tooltip-stats span {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .skills-category {
                animation: none;
            }
            
            .skill-tooltip {
                min-width: 150px;
                font-size: 0.8rem;
            }
        }
    `;
    
    document.head.appendChild(style);
}

function setupSkillAnimations() {
    // Add data attributes to skill levels
    document.querySelectorAll('.skill-level').forEach(level => {
        const width = level.style.width;
        level.dataset.originalWidth = width;
        level.style.width = '0';
        level.style.transform = 'translateX(-100%)';
        level.dataset.level = width;
    });
    
    // Add animated class to skills for staggered animation
    document.querySelectorAll('.skill').forEach((skill, index) => {
        skill.style.animationDelay = `${index * 0.1}s`;
        skill.classList.add('animated');
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(20px)';
    });
    
    // Prepare percentage spans for counting animation
    document.querySelectorAll('.skill-info span:last-child').forEach(span => {
        const percentage = span.textContent;
        span.dataset.targetValue = percentage.replace('%', '');
        span.textContent = '0%';
        span.classList.add('counting');
    });
}

function setupScrollAnimation() {
    const skillsSection = document.getElementById('skills');
    
    if (!skillsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill bars
                animateSkillBars();
                
                // Animate skill percentages
                animateSkillPercentages();
                
                // Animate skill items
                animateSkillItems();
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });
    
    observer.observe(skillsSection);
}

function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach((level, index) => {
        setTimeout(() => {
            level.style.width = level.dataset.originalWidth;
            level.style.transition = 'transform 1.5s cubic-bezier(0.65, 0, 0.35, 1)';
            level.style.transform = 'translateX(0)';
            level.classList.add('animated');
        }, index * 150);
    });
}

function animateSkillPercentages() {
    const percentageSpans = document.querySelectorAll('.skill-info span:last-child');
    
    percentageSpans.forEach((span, index) => {
        const targetValue = parseInt(span.dataset.targetValue);
        let currentValue = 0;
        const duration = 1500;
        const increment = targetValue / (duration / 16);
        
        setTimeout(() => {
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(timer);
                    
                    // Remove counting class and show final value
                    span.classList.remove('counting');
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0) scale(1)';
                }
                span.textContent = Math.round(currentValue) + '%';
            }, 16);
        }, index * 150);
    });
}

function animateSkillItems() {
    const skills = document.querySelectorAll('.skill');
    
    skills.forEach((skill, index) => {
        setTimeout(() => {
            skill.style.opacity = '1';
            skill.style.transform = 'translateY(0)';
            skill.style.transition = 'all 0.6s ease';
        }, index * 100);
    });
}

function addInteractiveFeatures() {
    // Add click functionality to skill bars
    document.querySelectorAll('.skill-bar').forEach(bar => {
        // Make skill bar clickable
        bar.style.cursor = 'pointer';
        bar.setAttribute('tabindex', '0');
        bar.setAttribute('role', 'button');
        bar.setAttribute('aria-label', 'Click to view skill details');
        
        bar.addEventListener('click', handleSkillBarClick);
        bar.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSkillBarClick(e);
            }
        });
    });
    
    // Add hover tooltips
    addSkillTooltips();
    
    // Add category hover effects
    addCategoryEffects();
}

function handleSkillBarClick(event) {
    const skillBar = event.currentTarget;
    const skill = skillBar.closest('.skill');
    const skillName = skill.querySelector('.skill-info span:first-child').textContent;
    const skillLevel = skill.querySelector('.skill-level');
    const percentage = skillLevel.dataset.level;
    
    // Add click animation
    skillBar.classList.add('clicked');
    setTimeout(() => {
        skillBar.classList.remove('clicked');
    }, 800);
    
    // Show notification
    showSkillNotification(skillName, percentage);
    
    // Log interaction (for analytics)
    console.log(`Skill clicked: ${skillName} (${percentage})`);
}

function showSkillNotification(skillName, percentage) {
    // Remove existing notification
    const existingNotification = document.querySelector('.skill-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'skill-notification';
    
    const skillLevel = getSkillLevel(parseInt(percentage));
    const icon = getSkillIcon(skillLevel);
    
    notification.innerHTML = `
        <i class="${icon}"></i>
        <div>
            <strong>${skillName}</strong><br>
            <span>${skillLevel} level • ${percentage} proficiency</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }, 3000);
}

function getSkillLevel(percentage) {
    if (percentage >= 90) return 'Expert';
    if (percentage >= 80) return 'Advanced';
    if (percentage >= 70) return 'Intermediate';
    return 'Beginner';
}

function getSkillIcon(level) {
    const icons = {
        'Expert': 'fas fa-crown',
        'Advanced': 'fas fa-rocket',
        'Intermediate': 'fas fa-chart-line',
        'Beginner': 'fas fa-seedling'
    };
    return icons[level] || 'fas fa-star';
}

function addSkillTooltips() {
    const skillData = {
        'HTML/CSS': {
            description: 'Responsive design, CSS animations, Flexbox, Grid, and modern layout techniques',
            years: '6+ years',
            projects: '50+ projects'
        },
        'JavaScript/TypeScript': {
            description: 'ES6+, TypeScript, async programming, and modern JavaScript patterns',
            years: '5+ years',
            projects: '40+ projects'
        },
        'React.js': {
            description: 'React hooks, context API, Redux, and performance optimization',
            years: '4+ years',
            projects: '30+ projects'
        },
        'Node.js': {
            description: 'REST APIs, Express.js, authentication, and backend architecture',
            years: '4+ years',
            projects: '25+ projects'
        },
        'Python/Django': {
            description: 'Backend development, data processing, and automation',
            years: '3+ years',
            projects: '15+ projects'
        },
        'Database Design': {
            description: 'SQL optimization, schema design, and data modeling',
            years: '4+ years',
            projects: '20+ projects'
        },
        'Git & GitHub': {
            description: 'Version control, CI/CD, and collaborative workflows',
            years: '5+ years',
            projects: 'All projects'
        },
        'UI/UX Design': {
            description: 'User-centered design, prototyping, and design systems',
            years: '3+ years',
            projects: '20+ projects'
        },
        'AWS/Cloud': {
            description: 'Cloud infrastructure, deployment, and serverless architecture',
            years: '2+ years',
            projects: '10+ projects'
        }
    };
    
    document.querySelectorAll('.skill-info').forEach(info => {
        const skillName = info.querySelector('span:first-child').textContent;
        const skillKey = Object.keys(skillData).find(key => skillName.includes(key));
        const data = skillData[skillKey];
        
        if (!data) return;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <h4>${skillName}</h4>
                <p>${data.description}</p>
                <div class="tooltip-stats">
                    <span><i class="fas fa-clock"></i> ${data.years}</span>
                    <span><i class="fas fa-code"></i> ${data.projects}</span>
                </div>
            </div>
        `;
        
        info.style.position = 'relative';
        info.appendChild(tooltip);
        
        // Add hover events
        info.addEventListener('mouseenter', () => {
            tooltip.classList.add('show');
        });
        
        info.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });
        
        // Touch support for mobile
        info.addEventListener('touchstart', (e) => {
            e.preventDefault();
            tooltip.classList.toggle('show');
        });
    });
}

function addCategoryEffects() {
    document.querySelectorAll('.skills-category').forEach(category => {
        const icon = category.querySelector('h3 i');
        
        // Add hover effect for icon rotation
        category.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotate(360deg)';
        });
        
        category.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotate(0)';
        });
    });
}

function addPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Check if skills section is in view for re-animation
            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
                const rect = skillsSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    // Section is in view, ensure animations are active
                    document.querySelectorAll('.skill-level').forEach(level => {
                        if (!level.style.width || level.style.width === '0px') {
                            level.style.width = level.dataset.originalWidth;
                        }
                    });
                }
            }
        }, 100);
    });
    
    // Optimize animations with requestAnimationFrame
    function animateWithRAF(callback) {
        let rafId;
        function animate() {
            callback();
            rafId = requestAnimationFrame(animate);
        }
        animate();
        return () => cancelAnimationFrame(rafId);
    }
    
    // Monitor animation performance
    if (typeof PerformanceObserver !== 'undefined') {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 50) {
                    console.warn(`Long animation frame: ${entry.duration}ms`);
                }
            }
        });
        observer.observe({ entryTypes: ['long-animation-frame'] });
    }
}

// Reset animations function (for debugging)
function resetSkillAnimations() {
    document.querySelectorAll('.skill-level').forEach(level => {
        level.style.width = '0';
        level.style.transform = 'translateX(-100%)';
        level.classList.remove('animated');
    });
    
    document.querySelectorAll('.skill-info span:last-child').forEach(span => {
        span.textContent = '0%';
        span.classList.add('counting');
        span.style.opacity = '0';
        span.style.transform = 'translateY(10px) scale(0.9)';
    });
    
    document.querySelectorAll('.skill').forEach(skill => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(20px)';
    });
    
    console.log('Skill animations reset');
}

// Export functions for debugging
window.skillsModule = {
    init: initSkillsSection,
    reset: resetSkillAnimations,
    animate: () => {
        animateSkillBars();
        animateSkillPercentages();
        animateSkillItems();
    }
};

// Handle theme changes
document.addEventListener('themeChanged', () => {
    // Re-initialize tooltips when theme changes
    setTimeout(() => {
        document.querySelectorAll('.skill-tooltip').forEach(tooltip => tooltip.remove());
        addSkillTooltips();
    }, 100);
});
// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Scroll Effects
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header hide/show on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add scroll transition to header
    header.style.transition = 'transform 0.3s ease';
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
function optimizePerformance() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}, 250));

// Prevent zoom on double tap for iOS
document.addEventListener('touchend', function(e) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

let lastTouchEnd = 0;


