// Main Application Controller
import { ThemeManager } from './theme.js';
import { LanguageManager } from './language.js';
import { NavigationManager } from './navigation.js';
import { SectionTracker } from './section-tracker.js';

class VoltFitnessApp {
    constructor() {
        this.modules = {};
    }

    async init() {
        try {
            // Initialize all modules
            this.modules.theme = new ThemeManager();
            this.modules.language = new LanguageManager();
            this.modules.navigation = new NavigationManager();
            this.modules.sectionTracker = new SectionTracker(this.modules.language);
            
            // Initialize modules
            this.modules.theme.init();
            this.modules.language.init();
            this.modules.navigation.init();
            this.modules.sectionTracker.init();
            
            console.log('Volt Fitness App initialized successfully');
        } catch (error) {
            console.error('Error initializing Volt Fitness App:', error);
        }
    }

    getModule(name) {
        return this.modules[name];
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.voltApp = new VoltFitnessApp();
    window.voltApp.init();
});

export default VoltFitnessApp;