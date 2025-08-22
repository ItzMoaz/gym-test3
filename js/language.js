// Language Management Module
export class LanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.langToggle = document.getElementById('lang-toggle');
    }

    init() {
        this.setupLanguageToggle();
        this.loadSavedLanguage();
    }

    setupLanguageToggle() {
        if (this.langToggle) {
            this.langToggle.addEventListener('click', () => {
                this.currentLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
                this.switchLanguage(this.currentLanguage);
                
                // Save preference
                localStorage.setItem('language', this.currentLanguage);
            });
        }
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;
        const html = document.documentElement;
        
        // Update language attributes
        html.lang = lang;
        html.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update toggle button
        if (this.langToggle) {
            this.langToggle.querySelector('.lang-text').textContent = lang === 'en' ? 'AR' : 'EN';
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
            this.ensureGalleriesWork();
        }, 100);
    }

    ensureGalleriesWork() {
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
                window.setupGallery && window.setupGallery(galleryId);
            } else if (slider) {
                // Ensure current slide is visible and force update for RTL
                window.updateSlider && window.updateSlider(galleryId);
                
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

    loadSavedLanguage() {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            this.currentLanguage = savedLanguage;
            this.switchLanguage(this.currentLanguage);
        }
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}