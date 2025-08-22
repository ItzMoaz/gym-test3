// Theme Management Module
export class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
    }

    init() {
        console.log('🎨 ThemeManager initializing...');
        console.log('Theme toggle found:', !!this.themeToggle);
        console.log('Theme icon found:', !!this.themeIcon);
        
        this.setupThemeToggle();
        this.loadSavedTheme();
        
        console.log('✅ ThemeManager initialized successfully');
    }

    setupThemeToggle() {
        if (this.themeToggle) {
            console.log('🔄 Setting up theme toggle event listener...');
            this.themeToggle.addEventListener('click', () => {
                console.log('🌙 Theme button clicked!');
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                console.log(`Switching theme: ${currentTheme} → ${newTheme}`);
                document.documentElement.setAttribute('data-theme', newTheme);
                
                // Update icon
                if (newTheme === 'dark') {
                    this.themeIcon.className = 'fas fa-sun';
                    console.log('Icon changed to SUN ☀️');
                } else {
                    this.themeIcon.className = 'fas fa-moon';
                    console.log('Icon changed to MOON 🌙');
                }
                
                // Save preference
                localStorage.setItem('theme', newTheme);
                console.log('Theme preference saved');
                
                // Add transition class for smooth theme change
                document.body.classList.add('theme-transitioning');
                setTimeout(() => {
                    document.body.classList.remove('theme-transitioning');
                }, 300);
            });
            console.log('✅ Theme toggle event listener added');
        } else {
            console.error('❌ Theme toggle button not found!');
        }
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (savedTheme === 'dark' && this.themeIcon) {
                this.themeIcon.className = 'fas fa-sun';
            }
        } else {
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                if (this.themeIcon) {
                    this.themeIcon.className = 'fas fa-sun';
                }
            }
        }
    }
}