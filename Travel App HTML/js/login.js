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
        errorDiv.classList.add('success-message'); // Override to green if needed in CSS
        errorDiv.style.color = 'green';
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

    if (!username || !password) {
        errorDiv.textContent = 'Please fill in all fields.';
        errorDiv.style.color = 'red';
        errorDiv.style.display = 'block';
        return;
    }
    // Simulate successful login (in real app, this would be server response)
    errorDiv.style.display = 'none';
    alert('Login successful!'); // Or redirect: location.href = 'company_profile.html';
});