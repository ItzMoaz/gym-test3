// Section Tracking Module
export class SectionTracker {
    constructor(languageManager) {
        this.languageManager = languageManager;
        this.sections = document.querySelectorAll('section[id]');
        this.sectionNameElement = document.getElementById('section-name');
        this.sectionBadge = document.querySelector('.section-badge');
        this.currentActiveSection = 'hero';
        this.isUpdating = false;
        
        // Section names mapping
        this.sectionNames = {
            'hero': { en: 'Welcome', ar: 'مرحباً' },
            'about': { en: 'About Us', ar: 'من نحن' },
            'district3': { en: '3rd District Gym', ar: 'جيم الحي الثالث' },
            'district8': { en: '8th District Gym', ar: 'جيم الحي الثامن' },
            'contact': { en: 'Contact Us', ar: 'تواصل معنا' }
        };
    }

    init() {
        if (!this.sections.length || !this.sectionNameElement || !this.sectionBadge) return;
        
        this.setupSectionTracking();
        this.setupLanguageListener();
        
        // Set initial section display
        this.updateCurrentSectionDisplay('hero', false);
    }

    setupSectionTracking() {
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
                
                this.sections.forEach(section => {
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
                
                if (sectionId && sectionId !== this.currentActiveSection && !this.isUpdating) {
                    console.log('Updating section to:', sectionId); // Debug log
                    this.updateCurrentSectionDisplay(sectionId);
                    this.currentActiveSection = sectionId;
                }
            }
        }, observerOptions);
        
        // Observe all sections
        this.sections.forEach(section => {
            sectionObserver.observe(section);
        });
        
        // Add scroll listener as backup
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Trigger a manual check if observer isn't working
                const scrollY = window.scrollY;
                const headerHeight = document.getElementById('header').offsetHeight;
                
                this.sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    const sectionTop = rect.top + scrollY;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    const viewportCenter = scrollY + headerHeight + (window.innerHeight - headerHeight) / 2;
                    
                    if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
                        const sectionId = section.id;
                        if (sectionId && sectionId !== this.currentActiveSection && !this.isUpdating) {
                            console.log('Scroll fallback updating section to:', sectionId); // Debug log
                            this.updateCurrentSectionDisplay(sectionId);
                            this.currentActiveSection = sectionId;
                        }
                    }
                });
            }, 100);
        });
    }

    setupLanguageListener() {
        // Update section display when language changes
        document.addEventListener('languageChange', () => {
            if (this.currentActiveSection && !this.isUpdating) {
                this.updateCurrentSectionDisplay(this.currentActiveSection, false);
            }
        });
    }

    updateCurrentSectionDisplay(sectionId, animate = true) {
        const sectionData = this.sectionNames[sectionId];
        if (!sectionData || this.isUpdating) return;
        
        this.isUpdating = true;
        
        if (animate) {
            // Add animation classes
            this.sectionBadge.classList.add('changing', 'updating');
            
            setTimeout(() => {
                // Update text content
                const currentLang = this.languageManager.getCurrentLanguage();
                const text = sectionData[currentLang] || sectionData.en;
                this.sectionNameElement.textContent = text;
                
                // Update data attributes for language switching
                this.sectionNameElement.setAttribute('data-en', sectionData.en);
                this.sectionNameElement.setAttribute('data-ar', sectionData.ar);
                
                // Add pulse effect
                this.sectionBadge.classList.add('pulse');
                
                setTimeout(() => {
                    this.sectionBadge.classList.remove('changing', 'updating', 'pulse');
                    this.isUpdating = false;
                }, 400);
            }, 300);
        } else {
            // Direct update without animation
            const currentLang = this.languageManager.getCurrentLanguage();
            const text = sectionData[currentLang] || sectionData.en;
            this.sectionNameElement.textContent = text;
            this.sectionNameElement.setAttribute('data-en', sectionData.en);
            this.sectionNameElement.setAttribute('data-ar', sectionData.ar);
            this.isUpdating = false;
        }
    }
}