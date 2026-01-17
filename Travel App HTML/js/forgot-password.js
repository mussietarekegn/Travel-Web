// Form submission with validation
const form = document.querySelector('form');
const errorDiv = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
        errorDiv.textContent = 'Please enter a valid email.';
        errorDiv.style.display = 'block';
        return;
    }

    // Simulate reset link sent
    errorDiv.style.display = 'none';
    localStorage.setItem('authMessage', 'Password reset link has been sent to your email.');
    location.href = 'login.html'; // Redirect to login with success message
});