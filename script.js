document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');

    if (menuToggle && sidebar && overlay) {
        function toggleMenu() {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        }

        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Header Effect (Optional enhancement)
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.85)';
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
        }
    });

    // Dark Mode Toggle Logic
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check local storage for preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.className = 'fas fa-toggle-on';
            darkModeToggle.style.color = '#4facfe';
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.className = 'fas fa-toggle-on';
                darkModeToggle.style.color = '#4facfe';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkModeToggle.className = 'fas fa-toggle-off';
                darkModeToggle.style.color = '#aaa';
            }
        });
    }

    // Opening Animation Logic
    const introOverlay = document.getElementById('introOverlay');
    if (introOverlay) {
        // Wait a slight delay to ensure visuals are ready, then animate
        setTimeout(() => {
            introOverlay.classList.add('intro-active');

            // Remove from DOM after animation completes to free resources
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 800); // Short delay before opening
        }, 100);
    }

    // Update Hero Welcome Message based on Authentication
    if (Auth && Auth.isAuthenticated()) {
        const userData = Auth.getUserData();
        if (userData) {
            const heroHeading = document.querySelector('.hero-content h1');
            if (heroHeading) {
                heroHeading.textContent = `Welcome back, ${userData.name}!`;
            }
        }
    } else {
        // Not authenticated - show generic welcome message
        const heroHeading = document.querySelector('.hero-content h1');
        if (heroHeading) {
            heroHeading.textContent = 'Welcome to Smart Library';
        }
    }

    // Dashboard Data Loading
    const issuedCountEl = document.getElementById('issuedCount');
    const issuedBooksBody = document.getElementById('issuedBooksBody');

    if (issuedCountEl && issuedBooksBody) {
        // Get user data from localStorage
        const userData = localStorage.getItem('userData');

        if (userData) {
            const user = JSON.parse(userData);
            const dashboardData = user.libraryStats;

            // Populate Stats
            document.getElementById('issuedCount').innerText = `${dashboardData.issuedCount}/5`;
            document.getElementById('remainingCount').innerText = dashboardData.remainingCount;

            const fineEl = document.getElementById('totalFine');
            fineEl.innerText = `₹${dashboardData.totalFine.toFixed(2)}`;
            if (dashboardData.totalFine > 0) {
                fineEl.style.color = '#e74c3c';
            }

            // Populate Table
            issuedBooksBody.innerHTML = '';
            dashboardData.books.forEach(book => {
                let statusBadge = '';

                // Determine badge based on status
                if (book.status === 'ontime') {
                    statusBadge = '<span class="status-badge status-ontime">On Time</span>';
                } else if (book.status === 'due') {
                    statusBadge = '<span class="status-badge status-returned">Due Soon</span>';
                } else if (book.status === 'overdue') {
                    statusBadge = '<span class="status-badge status-overdue">Overdue</span>';
                }

                const row = `
                <tr>
                    <td><strong>${book.title}</strong></td>
                    <td>${book.issueDate}</td>
                    <td style="${book.status === 'overdue' ? 'color: #e74c3c; font-weight: 600;' : ''}">${book.dueDate}</td>
                    <td>${statusBadge}</td>
                    <td>${book.fine > 0 ? `<span style="color: #e74c3c;">₹${book.fine.toFixed(2)}</span>` : '-'}</td>
                </tr>
            `;
                issuedBooksBody.innerHTML += row;
            });

            // Add fade-in animation
            const dashboardStats = document.querySelector('.dashboard-stats');
            if (dashboardStats) {
                dashboardStats.classList.add('auth-fade-in');
            }
        }
    }

    // Profile Data Loading
    const profileContainer = document.querySelector('.glass-container');
    if (profileContainer && window.location.pathname.includes('profile.html')) {
        const userData = localStorage.getItem('userData');

        if (userData) {
            const user = JSON.parse(userData);

            // Update profile information
            const nameElement = profileContainer.querySelector('h2');
            const yearElement = profileContainer.querySelector('p[style*="color"]');

            if (nameElement) nameElement.textContent = user.name;
            if (yearElement) yearElement.textContent = `${user.department} - ${user.year}`;

            // Update profile grid data
            const infoCards = profileContainer.querySelectorAll('.profile-info-card p, div[style*="rgba(255,255,255,0.5)"] p');
            if (infoCards.length >= 4) {
                infoCards[0].textContent = user.registerNumber;
                infoCards[1].textContent = user.email;
                infoCards[2].textContent = `${user.libraryStats.issuedCount} / 5`;
                infoCards[3].textContent = `₹${user.libraryStats.totalFine.toFixed(2)}`;
                if (user.libraryStats.totalFine > 0) {
                    infoCards[3].style.color = '#e74c3c';
                }
            }

            profileContainer.classList.add('auth-fade-in');
        }
    }
});

