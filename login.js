document.addEventListener('DOMContentLoaded', () => {
    // Check for dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Disable button
        loginBtn.disabled = true;
        btnText.textContent = "Authenticating...";
        btnIcon.className = "fas fa-spinner fa-spin";
        loginBtn.style.cursor = "wait";

        // Simulate network request
        setTimeout(() => {
            alert('Login Successful! Welcome to the Smart Library.');

            // Reset button (or redirect in a real app)
            loginBtn.disabled = false;
            btnText.textContent = "Login";
            btnIcon.className = "fas fa-sign-in-alt";
            loginBtn.style.cursor = "pointer";

            // Redirect to index.html (Main Dashboard)
            window.location.href = 'index.html';
        }, 2000);
    });
});
