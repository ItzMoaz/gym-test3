// Global variables
let currentLanguage = 'en';
let currentSlides = {
    district3: 0,
    district8: 0
};

// Image arrays for galleries
const galleryImages = {
    district3: [
        '3rd district gym/2023-04-29-04.21.25-768x576.jpg',
        '3rd district gym/2023-04-29-04.21.49-768x576.jpg',
        '3rd district gym/2023-04-29-04.21.53-768x576.jpg',
        '3rd district gym/2023-04-29-04.22.01-768x576.jpg',
        '3rd district gym/2023-04-29-04.22.08-768x576.jpg',
        '3rd district gym/2023-04-29-04.22.16-768x576.jpg',
        '3rd district gym/IMG_2402-683x1024.jpg',
        '3rd district gym/IMG_2441-768x512.jpg',
        '3rd district gym/IMG_2444-768x512.jpg',
        '3rd district gym/IMG_2445-768x512.jpg',
        '3rd district gym/IMG_2448.jpg',
        '3rd district gym/IMG_2478-683x1024.jpg',
        '3rd district gym/IMG_2479-768x512.jpg',
        '3rd district gym/IMG_2486-768x512.jpg',
        '3rd district gym/IMG_2488.jpg'
    ],
    district8: [
        '8th district gym/3-768x512.jpg',
        '8th district gym/IMG_2574-1536x1024.jpg',
        '8th district gym/IMG_2575-1536x1024.jpg',
        '8th district gym/IMG_2576-1-768x573.jpg',
        '8th district gym/IMG_2577-768x512.jpg',
        '8th district gym/IMG_2579-768x512.jpg',
        '8th district gym/IMG_2580-768x512.jpg',
        '8th district gym/IMG_2581-768x512.jpg',
        '8th district gym/IMG_2582-768x512.jpg',
        '8th district gym/IMG_2583-768x512.jpg',
        '8th district gym/IMG_2584-768x414.jpg',
        '8th district gym/IMG_2585-768x512.jpg',
        '8th district gym/IMG_2586-768x512.jpg',
        '8th district gym/IMG_2587-768x512.jpg',
        '8th district gym/IMG_2588-768x512.jpg',
        '8th district gym/IMG_2589-768x512.jpg',
        '8th district gym/IMG_2590-768x512.jpg',
        '8th district gym/IMG_2591-768x512.jpg',
        '8th district gym/IMG_2592-768x512.jpg',
        '8th district gym/IMG_2593-768x512.jpg',
        '8th district gym/IMG_2594-768x490.jpg',
        '8th district gym/IMG_2596-1536x1024.jpg',
        '8th district gym/photo_2025-01-05_00-39-52-768x576.jpg',
        '8th district gym/photo_2025-01-05_00-39-54-768x576.jpg',
        '8th district gym/photo_2025-01-05_00-39-59-768x576.jpg',
        '8th district gym/photo_2025-01-05_00-40-04-768x576.jpg',
        '8th district gym/photo_2025-01-06_15-09-21-768x576.jpg',
        '8th district gym/photo_2025-01-06_15-09-28.jpg',
        '8th district gym/photo_2025-01-06_15-09-40-768x576.jpg',
        '8th district gym/photo_2025-01-06_15-09-43-768x576.jpg'
    ]
};

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupThemeToggle();
    setupLanguageToggle();
    setupMobileMenu();
    setupStickyHeader();
    setupSmoothScrolling();
    setupGalleries();
    setupContactForm();
    setupScrollAnimations();
    setupSectionTracking();
    
    // Load saved theme
    loadSavedTheme();
    // Load saved language
    loadSavedLanguage();
}

// Theme Toggle Functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Update icon
            if (newTheme === 'dark') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
            
            // Save preference
            localStorage.setItem('theme', newTheme);
            
            // Add transition class for smooth theme change
            document.body.classList.add('theme-transitioning');
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 300);
        });
    }
}

// Load saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark' && themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
            }
        }
    }
}

// Language Toggle Functionality
function setupLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
            switchLanguage(currentLanguage);
            
            // Save preference
            localStorage.setItem('language', currentLanguage);
        });
    }
}

// Switch Language
function switchLanguage(lang) {
    const langToggle = document.getElementById('lang-toggle');
    const html = document.documentElement;
    
    // Update language attributes
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update toggle button
    if (langToggle) {
        langToggle.querySelector('.lang-text').textContent = lang === 'en' ? 'AR' : 'EN';
    }
    
    // Update all text elements with language attributes
    const elements = document.querySelectorAll('[data-en], [data-ar]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update form placeholders
    const placeholderElements = document.querySelectorAll(`[data-${lang}-placeholder]`);
    placeholderElements.forEach(element => {
        const placeholder = element.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
    
    // Show/hide language-specific content (exclude gallery elements)
    const langElements = document.querySelectorAll('[data-lang]');
    langElements.forEach(element => {
        // Skip gallery-related elements
        if (element.closest('.district-gallery') || 
            element.classList.contains('district-gallery') ||
            element.classList.contains('gallery-container') ||
            element.classList.contains('gallery-slider')) {
            return;
        }
        
        const elementLang = element.getAttribute('data-lang');
        element.style.display = elementLang === lang ? 'block' : 'none';
    });
    
    
    // Dispatch language change event for section display
    document.dispatchEvent(new CustomEvent('languageChange'));
    
    // Ensure galleries remain functional after language switch
    setTimeout(() => {
        ensureGalleriesWork();
    }, 100);
}

// Ensure galleries work after language switch
function ensureGalleriesWork() {
    const galleries = ['district3', 'district8'];
    galleries.forEach(galleryId => {
        const slider = document.getElementById(`${galleryId}-slider`);
        const galleryContainer = document.querySelector(`#${galleryId} .district-gallery`);
        
        // Ensure gallery containers are always visible
        if (galleryContainer) {
            galleryContainer.style.display = 'block';
            // Ensure all gallery children are visible
            const galleryElements = galleryContainer.querySelectorAll('*');
            galleryElements.forEach(el => {
                if (el.style.display === 'none' && !el.hasAttribute('data-lang')) {
                    el.style.display = '';
                }
            });
        }
        
        if (slider && slider.children.length === 0) {
            // Re-setup gallery if slides are missing
            setupGallery(galleryId);
        } else if (slider) {
            // Ensure current slide is visible and force update for RTL
            updateSlider(galleryId);
            
            // Double-check that slides are visible
            const slides = slider.children;
            for (let i = 0; i < slides.length; i++) {
                const slide = slides[i];
                if (slide.classList.contains('gallery-slide')) {
                    slide.style.display = 'block';
                    slide.style.minWidth = '100%';
                    slide.style.flexShrink = '0';
                }
            }
        }
    });
}

// Load saved language
function loadSavedLanguage() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        switchLanguage(currentLanguage);
    }
}

// Mobile Menu Functionality
function setupMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Sticky Header Functionality
function setupStickyHeader() {
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Section Tracking for Current Section Display
function setupSectionTracking() {
    const sections = document.querySelectorAll('section[id]');
    const sectionNameElement = document.getElementById('section-name');
    const sectionBadge = document.querySelector('.section-badge');
    
    if (!sections.length || !sectionNameElement || !sectionBadge) return;
    
    // Section names mapping
    const sectionNames = {
        'hero': { en: 'Welcome', ar: 'مرحباً' },
        'about': { en: 'About Us', ar: 'من نحن' },
        'district3': { en: '3rd District Gym', ar: 'جيم الحي الثالث' },
        'district8': { en: '8th District Gym', ar: 'جيم الحي الثامن' },
        'contact': { en: 'Contact Us', ar: 'تواصل معنا' }
    };
    
    let currentActiveSection = 'hero';
    let isUpdating = false;
    
    const observerOptions = {
        rootMargin: '-10% 0px -70% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        let mostVisibleSection = null;
        let maxVisibility = 0;
        
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > maxVisibility) {
                maxVisibility = entry.intersectionRatio;
                mostVisibleSection = entry.target;
            }
        });
        
        // If no section is intersecting enough, find the closest one based on scroll position
        if (!mostVisibleSection || maxVisibility < 0.1) {
            const scrollY = window.scrollY;
            const headerHeight = document.getElementById('header').offsetHeight;
            let closestSection = null;
            let minDistance = Infinity;
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + scrollY;
                const distance = Math.abs(sectionTop - scrollY - headerHeight);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    closestSection = section;
                }
            });
            
            mostVisibleSection = closestSection;
        }
        
        if (mostVisibleSection) {
            const sectionId = mostVisibleSection.id;
            
            if (sectionId && sectionId !== currentActiveSection && !isUpdating) {
                console.log('Updating section to:', sectionId); // Debug log
                updateCurrentSectionDisplay(sectionId, sectionNames);
                currentActiveSection = sectionId;
            }
        }
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Update section display when language changes
    document.addEventListener('languageChange', () => {
        if (currentActiveSection && !isUpdating) {
            updateCurrentSectionDisplay(currentActiveSection, sectionNames, false);
        }
    });
    
    // Add scroll listener as backup
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Trigger a manual check if observer isn't working
            const scrollY = window.scrollY;
            const headerHeight = document.getElementById('header').offsetHeight;
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + scrollY;
                const sectionBottom = sectionTop + section.offsetHeight;
                const viewportCenter = scrollY + headerHeight + (window.innerHeight - headerHeight) / 2;
                
                if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
                    const sectionId = section.id;
                    if (sectionId && sectionId !== currentActiveSection && !isUpdating) {
                        console.log('Scroll fallback updating section to:', sectionId); // Debug log
                        updateCurrentSectionDisplay(sectionId, sectionNames);
                        currentActiveSection = sectionId;
                    }
                }
            });
        }, 100);
    });
    
    // Set initial section display
    updateCurrentSectionDisplay('hero', sectionNames, false);
    
    function updateCurrentSectionDisplay(sectionId, sectionNames, animate = true) {
        const sectionData = sectionNames[sectionId];
        if (!sectionData || isUpdating) return;
        
        isUpdating = true;
        
        if (animate) {
            // Add animation classes
            sectionBadge.classList.add('changing', 'updating');
            
            setTimeout(() => {
                // Update text content
                const text = sectionData[currentLanguage] || sectionData.en;
                sectionNameElement.textContent = text;
                
                // Update data attributes for language switching
                sectionNameElement.setAttribute('data-en', sectionData.en);
                sectionNameElement.setAttribute('data-ar', sectionData.ar);
                
                // Add pulse effect
                sectionBadge.classList.add('pulse');
                
                setTimeout(() => {
                    sectionBadge.classList.remove('changing', 'updating', 'pulse');
                    isUpdating = false;
                }, 400);
            }, 300);
        } else {
            // Direct update without animation
            const text = sectionData[currentLanguage] || sectionData.en;
            sectionNameElement.textContent = text;
            sectionNameElement.setAttribute('data-en', sectionData.en);
            sectionNameElement.setAttribute('data-ar', sectionData.ar);
            isUpdating = false;
        }
    }
}


// Smooth Scrolling
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Gallery Setup
function setupGalleries() {
    setupGallery('district3');
    setupGallery('district8');
    
    // Auto-advance galleries
    setInterval(() => {
        nextSlide('district3');
        nextSlide('district8');
    }, 5000);
}

// Setup individual gallery
function setupGallery(galleryId) {
    const slider = document.getElementById(`${galleryId}-slider`);
    if (!slider) return;
    
    const images = galleryImages[galleryId];
    currentSlides[galleryId] = 0;
    
    // Create slides
    images.forEach((imagePath, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.style.backgroundImage = `url('${imagePath}')`;
        slider.appendChild(slide);
    });
    
    updateSlider(galleryId);
}

// Update slider position
function updateSlider(galleryId) {
    const slider = document.getElementById(`${galleryId}-slider`);
    if (slider) {
        // Always use LTR behavior for sliders regardless of page language
        const translateX = -currentSlides[galleryId] * 100;
        slider.style.transform = `translateX(${translateX}%)`;
        
        // Force a repaint to ensure the transform is applied
        slider.offsetHeight;
    }
}

// Next slide
function nextSlide(galleryId) {
    const images = galleryImages[galleryId];
    if (!images) return;
    
    currentSlides[galleryId] = (currentSlides[galleryId] + 1) % images.length;
    updateSlider(galleryId);
}

// Previous slide
function prevSlide(galleryId) {
    const images = galleryImages[galleryId];
    if (!images) return;
    
    currentSlides[galleryId] = currentSlides[galleryId] === 0 
        ? images.length - 1 
        : currentSlides[galleryId] - 1;
    updateSlider(galleryId);
}

// Contact Form Functionality
function setupContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                message: formData.get('message'),
                timestamp: new Date().toISOString()
            };
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = currentLanguage === 'en' ? 'Sending...' : 'جاري الإرسال...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                // Show success message
                showNotification(
                    currentLanguage === 'en' 
                        ? 'Message sent successfully! We will contact you soon.' 
                        : 'تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.',
                    'success'
                );
                
                // Reset form
                form.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Here you would typically send the data to your backend
                console.log('Form data:', data);
                
                // For Airtable/Google Sheets integration, you would make an API call here
                // Example: submitToAirtable(data) or submitToGoogleSheets(data)
                
            }, 2000);
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: var(--font-primary);
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Scroll Animations
function setupScrollAnimations() {
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
    
    // Observe sections for animation
    const animatedElements = document.querySelectorAll('.about, .contact, .district-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Utility function for API submissions (example for future use)
async function submitToAirtable(data) {
    const AIRTABLE_API_KEY = 'your_api_key';
    const AIRTABLE_BASE_ID = 'your_base_id';
    const AIRTABLE_TABLE_NAME = 'your_table_name';
    
    try {
        const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fields: {
                    'Name': data.name,
                    'Phone': data.phone,
                    'Email': data.email,
                    'Message': data.message,
                    'Timestamp': data.timestamp
                }
            }),
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error submitting to Airtable:', error);
        throw error;
    }
}

// Utility function for Google Sheets submission (example for future use)
async function submitToGoogleSheets(data) {
    const GOOGLE_APPS_SCRIPT_URL = 'your_google_apps_script_url';
    
    try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        throw error;
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Performance optimization - Lazy loading images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Handle touch events for mobile gallery swiping
function setupTouchGestures() {
    const galleries = document.querySelectorAll('.gallery-container');
    
    galleries.forEach((gallery, index) => {
        const galleryId = index === 0 ? 'district3' : 'district8';
        let startX = null;
        let startTime = null;
        
        gallery.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startTime = Date.now();
        });
        
        gallery.addEventListener('touchmove', function(e) {
            e.preventDefault(); // Prevent scrolling
        });
        
        gallery.addEventListener('touchend', function(e) {
            if (!startX) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            const diffTime = Date.now() - startTime;
            
            // Swipe detection (minimum 50px, maximum 300ms)
            if (Math.abs(diffX) > 50 && diffTime < 300) {
                if (diffX > 0) {
                    nextSlide(galleryId);
                } else {
                    prevSlide(galleryId);
                }
            }
            
            startX = null;
            startTime = null;
        });
    });
}

// Initialize touch gestures
document.addEventListener('DOMContentLoaded', setupTouchGestures);

// Export functions for global access
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;