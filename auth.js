// Authentication Utility for Smart Library Management System
// Handles login state, user data management, and page protection

const Auth = {
    // Check if user is authenticated
    isAuthenticated() {
        return localStorage.getItem('isLoggedIn') === 'true';
    },

    // Get current user data
    getUserData() {
        if (!this.isAuthenticated()) {
            return null;
        }

        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    },

    // Login user with data
    login(userData) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
    },

    // Logout user and clear all data
    logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
    },

    // Protect page - redirect to login if not authenticated
    protectPage() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    // Update navigation based on auth state
    updateNavigation() {
        const desktopNav = document.querySelector('.desktop-nav');
        const sidebar = document.querySelector('.sidebar-menu');

        if (this.isAuthenticated()) {
            // Update desktop navigation
            if (desktopNav) {
                const authBtn = desktopNav.querySelector('.nav-btn');
                if (authBtn) {
                    authBtn.textContent = 'Logout';
                    authBtn.href = '#';
                    authBtn.onclick = (e) => {
                        e.preventDefault();
                        this.handleLogout();
                    };
                }
            }

            // Update sidebar navigation
            if (sidebar) {
                const logoutLink = sidebar.querySelector('a[href*="login.html"]');
                if (logoutLink) {
                    logoutLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
                    logoutLink.href = '#';
                    logoutLink.onclick = (e) => {
                        e.preventDefault();
                        this.handleLogout();
                    };
                }
            }

            // Update welcome message if exists
            const heroContent = document.querySelector('.hero-content h1');
            if (heroContent && heroContent.textContent.includes('Welcome')) {
                const userData = this.getUserData();
                if (userData) {
                    heroContent.textContent = `Welcome back, ${userData.name}`;
                }
            }
        } else {
            // Update desktop navigation for logged out state
            if (desktopNav) {
                const authBtn = desktopNav.querySelector('.nav-btn');
                if (authBtn) {
                    authBtn.textContent = 'Login';
                    authBtn.href = 'login.html';
                    authBtn.onclick = null;
                }
            }

            // Update sidebar navigation for logged out state
            if (sidebar) {
                const loginLink = sidebar.querySelector('a[href="#"]');
                if (loginLink && loginLink.textContent.includes('Logout')) {
                    loginLink.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
                    loginLink.href = 'login.html';
                    loginLink.onclick = null;
                }
            }
        }
    },

    // Handle logout with smooth transition
    handleLogout() {
        // Add fade out effect
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
            // Completely clear all session and local storage data
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');
            sessionStorage.clear();
            
            // Redirect to login page
            window.location.href = 'login.html';
        }, 300);
    },

    // Initialize auth on page load
    init() {
        this.updateNavigation();
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Auth.init());
} else {
    Auth.init();
}
