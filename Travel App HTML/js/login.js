// login.js

// Password visibility toggle
document.getElementById('toggle-password').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        this.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        this.textContent = 'Show';
    }
});

// Show success/reset messages from other pages via localStorage
window.addEventListener('load', () => {
    const message = localStorage.getItem('authMessage');
    if (message) {
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = message;
        errorDiv.style.color = 'green'; // Change to success color
        errorDiv.style.backgroundColor = '#1f8f4b'; // Green background for success
        errorDiv.style.display = 'block';
        localStorage.removeItem('authMessage');
    }
});

// Client-side validation and error handling
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent actual submission for demo

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('error-message');

    // Reset error div styles to default error
    errorDiv.style.color = 'white';
    errorDiv.style.backgroundColor = '#b00020';

    if (!username || !password) {
        errorDiv.textContent = 'Please fill in all fields.';
        errorDiv.style.display = 'block';
        return;
    }

    // Simulate successful login
    errorDiv.style.display = 'none';
    localStorage.setItem('loggedIn', 'true');

    // Check for redirect after login (e.g., from notifications page)
    const redirect = localStorage.getItem('redirectAfterLogin');
    if (redirect) {
        location.href = redirect;
        localStorage.removeItem('redirectAfterLogin');
    } else {
        location.href = 'notifications.html'; // Default redirect if no specific page
    }
});