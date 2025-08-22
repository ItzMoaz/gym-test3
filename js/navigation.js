// Navigation Management Module
export class NavigationManager {
    constructor() {
        this.header = document.getElementById('header');
        this.mobileToggle = document.getElementById('mobile-toggle');
        this.navMenu = document.getElementById('nav-menu');
    }

    init() {
        this.setupStickyHeader();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    }

    setupStickyHeader() {
        if (this.header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    this.header.classList.add('scrolled');
                } else {
                    this.header.classList.remove('scrolled');
                }
            });
        }
    }

    setupMobileMenu() {
        console.log('Setting up mobile menu...'); // Debug log
        console.log('Mobile toggle found:', !!this.mobileToggle); // Debug log
        console.log('Nav menu found:', !!this.navMenu); // Debug log
        
        if (this.mobileToggle && this.navMenu) {
            // Simple click handler for mobile toggle
            this.mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isActive = this.navMenu.classList.contains('active');
                console.log('Before toggle - Menu active:', isActive); // Debug log
                
                if (isActive) {
                    this.navMenu.classList.remove('active');
                    this.mobileToggle.classList.remove('active');
                    console.log('Menu closed'); // Debug log
                } else {
                    this.navMenu.classList.add('active');
                    this.mobileToggle.classList.add('active');
                    console.log('Menu opened'); // Debug log
                }
                
                // Force a style recalculation
                this.navMenu.offsetHeight;
            });
            
            // Close menu when clicking on links
            const navLinks = this.navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    console.log('Nav link clicked, closing menu'); // Debug log
                    this.navMenu.classList.remove('active');
                    this.mobileToggle.classList.remove('active');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.navMenu.classList.contains('active') && 
                    !this.mobileToggle.contains(e.target) && 
                    !this.navMenu.contains(e.target)) {
                    console.log('Clicking outside, closing menu'); // Debug log
                    this.navMenu.classList.remove('active');
                    this.mobileToggle.classList.remove('active');
                }
            });
            
            console.log('Mobile menu setup complete'); // Debug log
        } else {
            console.error('Mobile menu elements not found:', {
                mobileToggle: !!this.mobileToggle,
                navMenu: !!this.navMenu
            });
            
            // Try to find elements again
            setTimeout(() => {
                this.mobileToggle = document.getElementById('mobile-toggle');
                this.navMenu = document.getElementById('nav-menu');
                if (this.mobileToggle && this.navMenu) {
                    console.log('Found elements on retry, setting up mobile menu...');
                    this.setupMobileMenu();
                }
            }, 1000);
        }
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = this.header.offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}