// Dummy user credentials database
const dummyUsers = {
    '412622104025': {
        password: 'password123',
        name: "Dhivya Shree",
        registerNumber: "412622104025",
        rollNumber: "22IT025",
        department: "Information Technology",
        email: "dhivya.it@dmifoundation.org",
        year: "3rd Year",
        libraryStats: {
            issuedCount: 2,
            remainingCount: 3,
            totalFine: 15.00,
            books: [
                {
                    title: "Introduction to Algorithms",
                    issueDate: "15 Jan 2026",
                    dueDate: "29 Jan 2026",
                    status: "due",
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
        }
    },
    '2026IT024': {
        password: 'joseph123',
        name: "Joseph Vijay",
        registerNumber: "2026IT024",
        rollNumber: "22IT024",
        department: "Information Technology",
        email: "joseph.vijay@dmifoundation.org",
        year: "1st Year",
        libraryStats: {
            issuedCount: 4,
            remainingCount: 1,
            totalFine: 50.00,
            books: [
                {
                    title: "Data Structures and Algorithms",
                    issueDate: "05 Jan 2026",
                    dueDate: "19 Feb 2026",
                    status: "ontime",
                    fine: 0
                },
                {
                    title: "Python Programming",
                    issueDate: "08 Jan 2026",
                    dueDate: "22 Feb 2026",
                    status: "ontime",
                    fine: 0
                },
                {
                    title: "Web Development Basics",
                    issueDate: "12 Jan 2026",
                    dueDate: "26 Feb 2026",
                    status: "ontime",
                    fine: 0
                },
                {
                    title: "Database Design",
                    issueDate: "20 Jan 2026",
                    dueDate: "03 Mar 2026",
                    status: "ontime",
                    fine: 0
                }
            ]
        }
    },
    '2026CSE001': {
        password: 'cse2026',
        name: "Priya Sharma",
        registerNumber: "2026CSE001",
        rollNumber: "22CSE001",
        department: "Computer Science and Engineering",
        email: "priya.sharma@dmifoundation.org",
        year: "2nd Year",
        libraryStats: {
            issuedCount: 3,
            remainingCount: 2,
            totalFine: 45.00,
            books: [
                {
                    title: "Computer Networks",
                    issueDate: "02 Jan 2026",
                    dueDate: "16 Jan 2026",
                    status: "overdue",
                    fine: 25.00
                },
                {
                    title: "Operating Systems",
                    issueDate: "18 Jan 2026",
                    dueDate: "01 Feb 2026",
                    status: "due",
                    fine: 0
                },
                {
                    title: "Compiler Design",
                    issueDate: "22 Jan 2026",
                    dueDate: "08 Mar 2026",
                    status: "ontime",
                    fine: 0
                }
            ]
        }
    },
    '2026ECE045': {
        password: 'ece2026',
        name: "Rajesh Kumar",
        registerNumber: "2026ECE045",
        rollNumber: "22ECE045",
        department: "Electronics and Communication Engineering",
        email: "rajesh.kumar@dmifoundation.org",
        year: "3rd Year",
        libraryStats: {
            issuedCount: 1,
            remainingCount: 4,
            totalFine: 50.00,
            books: [
                {
                    title: "Digital Signal Processing",
                    issueDate: "25 Jan 2026",
                    dueDate: "15 Mar 2026",
                    status: "ontime",
                    fine: 0
                }
            ]
        }
    },
    '2026MECH012': {
        password: 'mech2026',
        name: "Ananya Verma",
        registerNumber: "2026MECH012",
        rollNumber: "22MECH012",
        department: "Mechanical Engineering",
        email: "ananya.verma@dmifoundation.org",
        year: "2nd Year",
        libraryStats: {
            issuedCount: 1,
            remainingCount: 4,
            totalFine: 0.00,
            books: [
                {
                    title: "Thermodynamics: Principles and Practice",
                    issueDate: "12 Jan 2026",
                    dueDate: "26 Jan 2026",
                    status: "overdue",
                    fine: 0
                }
            ]
        }
    },
    '2026IT030': {
        password: 'it2026',
        name: "Arjun Patel",
        registerNumber: "2026IT030",
        rollNumber: "22IT030",
        department: "Information Technology",
        email: "arjun.patel@dmifoundation.org",
        year: "1st Year",
        libraryStats: {
            issuedCount: 0,
            remainingCount: 5,
            totalFine: 0.00,
            books: []
        }
    },
    'GUEST0001': {
        password: 'guest',
        name: "Guest User",
        registerNumber: "GUEST0001",
        rollNumber: "",
        department: "Visitor",
        email: "guest@example.com",
        year: "N/A",
        libraryStats: {
            issuedCount: 0,
            remainingCount: 0,
            totalFine: 0.00,
            books: []
        }
    },
    'STAFF001': {
        password: 'stafflib',
        name: "Librarian",
        registerNumber: "STAFF001",
        rollNumber: "",
        department: "Library Staff",
        email: "librarian@dmifoundation.org",
        year: "",
        libraryStats: {
            issuedCount: 0,
            remainingCount: 0,
            totalFine: 0.00,
            books: []
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Check for dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Redirect if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
        return;
    }

    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Disable button
        loginBtn.disabled = true;
        btnText.textContent = "Authenticating...";
        btnIcon.className = "fas fa-spinner fa-spin";
        loginBtn.style.cursor = "wait";

        // Simulate network request
        setTimeout(() => {
            // Check credentials against dummy database
            if (dummyUsers[username] && dummyUsers[username].password === password) {
                const userData = dummyUsers[username];

                // Store authentication state and user data
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userData', JSON.stringify(userData));

                // Success feedback
                btnText.textContent = "Success!";
                btnIcon.className = "fas fa-check-circle";
                loginBtn.style.background = "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)";

                // Smooth transition before redirect
                setTimeout(() => {
                    document.querySelector('.login-container').style.opacity = '0';
                    document.querySelector('.login-container').style.transform = 'scale(0.95)';

                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 300);
                }, 500);
            } else {
                // Failed authentication
                btnText.textContent = "Failed!";
                btnIcon.className = "fas fa-times-circle";
                loginBtn.style.background = "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)";
                loginBtn.disabled = false;

                // Reset form after 2 seconds
                setTimeout(() => {
                    btnText.textContent = "Login";
                    btnIcon.className = "fas fa-sign-in-alt";
                    loginBtn.style.background = "";
                    document.getElementById('password').value = '';
                    alert('Invalid credentials. Please check your Student ID and Password.\n\nDemo credentials:\n- 412622104025 / password123\n- 2026IT024 / joseph123\n- 2026CSE001 / cse2026\n- 2026ECE045 / ece2026');
                }, 2000);
            }
        }, 1500);
    });
});
