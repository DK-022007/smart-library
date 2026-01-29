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
        })

        // Dashboard Data Loading (Mock Data)
        const issuedCountEl = document.getElementById('issuedCount');
        const issuedBooksBody = document.getElementById('issuedBooksBody');

        if (issuedCountEl && issuedBooksBody) {
            // Mock Data
            const dashboardData = {
                issuedCount: 2,
                remainingCount: 3,
                totalFine: 0,
                books: [
                    {
                        title: "Introduction to Algorithms",
                        issueDate: "15 Jan 2026",
                        dueDate: "29 Jan 2026",
                        status: "due", // due soon
                        fine: 0
                    },
                    {
                        title: "Clean Code",
                        issueDate: "10 Jan 2026",
                        dueDate: "24 Jan 2026",
                        status: "overdue",
                        fine: 15.00
                    }
                ]
            };

            // Populate Stats
            document.getElementById('issuedCount').innerText = `${dashboardData.issuedCount}/5`;
            document.getElementById('remainingCount').innerText = dashboardData.remainingCount;

            const fineEl = document.getElementById('totalFine');
            fineEl.innerText = `₹${dashboardData.books.reduce((acc, book) => acc + book.fine, 0).toFixed(2)}`;
            if (dashboardData.books.some(b => b.status === 'overdue')) {
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
        }
    };
})
