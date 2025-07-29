// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initAnimations();
    initScrollEffects();
    initInteractiveElements();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Change navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Animation functionality
function initAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.sport-card, .comic-panel, .event-card, .achievement-card, .art-piece, .post');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Floating characters animation
    const floatingChars = document.querySelectorAll('.floating-char');
    floatingChars.forEach((char, index) => {
        char.style.animationDelay = `${index * 0.5}s`;
    });

    // Section characters animation
    const sectionChars = document.querySelectorAll('.section-char');
    sectionChars.forEach((char, index) => {
        char.style.animationDelay = `${index * 0.3}s`;
    });
}

// Scroll effects
function initScrollEffects() {
    // Parallax effect for floating characters
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-char, .section-char');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Active section highlighting in navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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
}

// Interactive elements
function initInteractiveElements() {
    // Story avatars hover effect
    const storyAvatars = document.querySelectorAll('.story-avatar');
    storyAvatars.forEach(avatar => {
        avatar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        avatar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Post actions interaction
    const postActions = document.querySelectorAll('.post-actions span');
    postActions.forEach(action => {
        action.addEventListener('click', function() {
            // Simple animation for interaction feedback
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // You can add more functionality here like updating counts
            console.log('Post action clicked:', this.textContent);
        });
    });

    // Card hover effects
    const cards = document.querySelectorAll('.sport-card, .event-card, .achievement-card, .art-piece');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Comic panels interaction
    const comicPanels = document.querySelectorAll('.comic-panel');
    comicPanels.forEach(panel => {
        panel.addEventListener('click', function() {
            // Add a fun bounce effect
            this.style.animation = 'bounce 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
}

// Utility functions
function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function openRegistration(eventType) {
    // Show notification instead of alert
    showNotification(`Redirecting to registration for: ${getEventName(eventType)}`, 'info', 3000);

    // Redirect to events page with event type parameter
    setTimeout(() => {
        window.location.href = `events.html?event=${eventType}`;
    }, 1000);
}

function getEventName(eventType) {
    const eventNames = {
        'movie-day': 'Movie Day',
        'breakfast': 'Community Breakfast',
        'podcast': 'Student Podcast',
        'talent-show': 'Voice Talent Show',
        'journalism': 'Journalism Workshop',
        'design-bootcamp': 'Creative Design Bootcamp'
    };
    return eventNames[eventType] || 'Unknown Event';
}

// Add bounce animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 60%, 100% {
            transform: translateY(0) scale(1);
        }
        40% {
            transform: translateY(-10px) scale(1.05);
        }
        80% {
            transform: translateY(-5px) scale(1.02);
        }
    }
    
    .nav-link.active {
        color: #667eea !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Loading animation
window.addEventListener('load', function() {
    // Add a simple loading complete animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Random character positioning for floating elements
function randomizeCharacterPositions() {
    const floatingChars = document.querySelectorAll('.floating-char');
    
    floatingChars.forEach(char => {
        // Add slight random movement every few seconds
        setInterval(() => {
            const randomX = Math.random() * 20 - 10; // -10 to 10px
            const randomY = Math.random() * 20 - 10; // -10 to 10px
            
            char.style.transform += ` translate(${randomX}px, ${randomY}px)`;
            
            // Reset position after animation
            setTimeout(() => {
                char.style.transform = char.style.transform.replace(/translate\([^)]*\)/g, '');
            }, 2000);
        }, Math.random() * 5000 + 3000); // Random interval between 3-8 seconds
    });
}

// Initialize random character movement
setTimeout(randomizeCharacterPositions, 2000);

// Smooth reveal animation for hero section
function initHeroAnimation() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .cta-button');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200 + 500);
    });
}

// Initialize hero animation when page loads
window.addEventListener('load', initHeroAnimation);

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Accessibility improvements
function initAccessibility() {
    // Add keyboard navigation for cards
    const interactiveCards = document.querySelectorAll('.sport-card, .event-card, .achievement-card, .comic-panel');

    interactiveCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');

        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add ARIA labels for better screen reader support
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const text = link.textContent.trim();
        link.setAttribute('aria-label', `انتقل إلى ${text}`);
    });

    // Add focus indicators
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #feca57';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// Error handling for missing images
function handleImageErrors() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with a placeholder or hide the image
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', handleImageErrors);

// Touch device optimizations
function initTouchOptimizations() {
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');

        // Add touch feedback for interactive elements
        const touchElements = document.querySelectorAll('.sport-card, .event-card, .achievement-card, .cta-button, .register-btn');

        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });

            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }
}

// Initialize touch optimizations
document.addEventListener('DOMContentLoaded', initTouchOptimizations);

// Special Features Interactions
function initSpecialFeatures() {
    // Timeline animation on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'slideInTimeline 0.8s ease forwards';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Feature cards tilt effect
    const featureCards = document.querySelectorAll('.feature-card[data-tilt]');

    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
        });
    });

    // Animated counters for stats
    const statNumbers = document.querySelectorAll('.stat-number');

    const countUp = (element, target) => {
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (target >= 1000) {
                element.textContent = Math.floor(current).toLocaleString() + '+';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent.replace(/\D/g, ''));
                countUp(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Initialize special features
document.addEventListener('DOMContentLoaded', initSpecialFeatures);

// Voice Club specific interactions
function initVoiceClubFeatures() {
    // Podcast player simulation
    const podcastButtons = document.querySelectorAll('[onclick*="podcast"]');

    podcastButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Create a simple audio player interface
            const playerHTML = `
                <div class="podcast-player" style="
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: rgba(0,0,0,0.9);
                    color: white;
                    padding: 1rem;
                    border-radius: 15px;
                    z-index: 10000;
                    min-width: 300px;
                    backdrop-filter: blur(10px);
                ">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="font-size: 2rem;">🎧</div>
                        <div>
                            <h4 style="margin: 0; font-size: 0.9rem;">Now Playing</h4>
                            <p style="margin: 0; font-size: 0.8rem; opacity: 0.7;">AIU Voice Podcast - Latest Episode</p>
                        </div>
                        <button onclick="this.parentElement.parentElement.remove()" style="
                            background: none;
                            border: none;
                            color: white;
                            font-size: 1.2rem;
                            cursor: pointer;
                        ">×</button>
                    </div>
                    <div style="margin-top: 0.5rem; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px;">
                        <div style="height: 100%; width: 30%; background: #feca57; border-radius: 2px; animation: progress 3s linear infinite;"></div>
                    </div>
                </div>
            `;

            // Remove existing player if any
            const existingPlayer = document.querySelector('.podcast-player');
            if (existingPlayer) {
                existingPlayer.remove();
            }

            document.body.insertAdjacentHTML('beforeend', playerHTML);

            // Auto-remove after 10 seconds
            setTimeout(() => {
                const player = document.querySelector('.podcast-player');
                if (player) player.remove();
            }, 10000);
        });
    });

    // Dynamic content loading for newspaper section
    const newsItems = document.querySelectorAll('.news-item');

    newsItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add a "read more" functionality
            const content = item.querySelector('p');
            const originalText = content.textContent;

            if (content.dataset.expanded !== 'true') {
                content.textContent = originalText + ' Read the full story on our digital platform. This article covers in-depth analysis, interviews with key figures, and exclusive behind-the-scenes content that you won\'t find anywhere else.';
                content.dataset.expanded = 'true';
                item.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)';
            } else {
                content.textContent = originalText;
                content.dataset.expanded = 'false';
                item.style.background = 'white';
            }
        });
    });
}

// Initialize Voice Club features
document.addEventListener('DOMContentLoaded', initVoiceClubFeatures);

// Add progress animation for podcast player
const style2 = document.createElement('style');
style2.textContent = `
    @keyframes progress {
        0% { width: 30%; }
        50% { width: 70%; }
        100% { width: 30%; }
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.4s ease;
        max-width: 300px;
        backdrop-filter: blur(10px);
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-close {
        position: absolute;
        top: 5px;
        right: 10px;
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0.7;
    }

    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style2);

// Notification system
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = 'notification';

    let icon = '📢';
    if (type === 'success') icon = '✅';
    if (type === 'warning') icon = '⚠️';
    if (type === 'error') icon = '❌';

    notification.innerHTML = `
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">${icon}</span>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 400);
    }, duration);
}

// Welcome notification
window.addEventListener('load', () => {
    setTimeout(() => {
        showNotification('Welcome to AIU Voice Club! 🎉', 'success', 4000);
    }, 2000);
});

// Newsletter subscription handler
document.addEventListener('DOMContentLoaded', () => {
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const emailInput = document.querySelector('.email-input');

    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();

            if (!email) {
                showNotification('Please enter your email address', 'warning');
                return;
            }

            if (!email.includes('@')) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate subscription
            emailInput.value = '';
            showNotification('Successfully subscribed to our newsletter! 📧', 'success');
        });

        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
    }

    // Article rating system
    const starContainers = document.querySelectorAll('.stars');

    starContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                const rating = index + 1;
                container.dataset.rating = rating;

                // Update visual state
                stars.forEach((s, i) => {
                    if (i < rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });

                // Show feedback
                showNotification(`Thanks for rating! You gave ${rating} star${rating > 1 ? 's' : ''} ⭐`, 'success', 3000);
            });

            star.addEventListener('mouseenter', () => {
                const rating = index + 1;

                stars.forEach((s, i) => {
                    if (i < rating) {
                        s.style.opacity = '1';
                        s.style.transform = 'scale(1.1)';
                    } else {
                        s.style.opacity = '0.3';
                        s.style.transform = 'scale(1)';
                    }
                });
            });
        });

        container.addEventListener('mouseleave', () => {
            const currentRating = parseInt(container.dataset.rating) || 0;

            stars.forEach((s, i) => {
                if (i < currentRating) {
                    s.style.opacity = '1';
                    s.style.transform = 'scale(1.1)';
                } else {
                    s.style.opacity = '0.3';
                    s.style.transform = 'scale(1)';
                }
            });
        });
    });

    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Form submissions for all pages with Formspree integration
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const action = form.getAttribute('action');

            // Only handle Formspree forms
            if (action && action.includes('formspree.io')) {
                try {
                    const response = await fetch(action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        let message = 'Form submitted successfully! ✅';

                        const formType = form.className || form.id;
                        if (formType.includes('article-form') || formType.includes('newsletter')) {
                            message = 'Thank you! Your submission has been received! 📝';
                        } else if (formType.includes('artwork-form')) {
                            message = 'Artwork submitted successfully! 🎨';
                        } else if (formType.includes('member-nomination-form')) {
                            message = 'Nomination submitted! Thank you for recognizing excellence! ⭐';
                        } else if (formType.includes('Form')) {
                            message = 'Registration successful! We\'ll contact you soon! 🎉';
                        }

                        showNotification(message, 'success', 4000);
                        form.reset();

                        // Show success message if it exists
                        const successMsg = form.querySelector('.success-message');
                        if (successMsg) {
                            successMsg.style.display = 'block';
                            setTimeout(() => {
                                successMsg.style.display = 'none';
                            }, 5000);
                        }
                    } else {
                        throw new Error('Network response was not ok');
                    }
                } catch (error) {
                    showNotification('There was a problem submitting your form. Please try again.', 'error', 4000);
                }
            } else {
                // Handle non-Formspree forms (local forms)
                const formType = form.className || form.id;
                let message = 'Form submitted successfully!';

                if (formType.includes('article-form')) {
                    message = 'Article submitted for review! 📝';
                } else if (formType.includes('artwork-form')) {
                    message = 'Artwork submitted successfully! 🎨';
                } else if (formType.includes('member-nomination-form')) {
                    message = 'Nomination submitted! Thank you for recognizing excellence! ⭐';
                }

                showNotification(message, 'success', 4000);
                form.reset();
            }
        });
    });

    // Newsletter subscription for all pages
    const newsletterBtns = document.querySelectorAll('.newsletter-btn');
    const newsletterEmails = document.querySelectorAll('.newsletter-email');

    newsletterBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const email = newsletterEmails[index]?.value.trim();

            if (!email) {
                showNotification('Please enter your email address', 'warning');
                return;
            }

            if (!email.includes('@')) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            newsletterEmails[index].value = '';
            showNotification('Successfully subscribed to our newsletter! 📧', 'success');
        });
    });
});
