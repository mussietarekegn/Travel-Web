// Password visibility toggles
document.getElementById('toggle-password').addEventListener('click', function () {
    const input = document.getElementById('password');
    if (input.type === 'password') {
        input.type = 'text';
        this.textContent = 'Hide';
    } else {
        input.type = 'password';
        this.textContent = 'Show';
    }
});

document.getElementById('toggle-confirm').addEventListener('click', function () {
    const input = document.getElementById('confirm-password');
    if (input.type === 'password') {
        input.type = 'text';
        this.textContent = 'Hide';
    } else {
        input.type = 'password';
        this.textContent = 'Show';
    }
});

// Live password match validation + error display
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const errorDiv = document.getElementById('error-message');

const checkPasswords = () => {
    if (password.value !== confirmPassword.value) {
        errorDiv.textContent = 'Passwords do not match.';
        errorDiv.style.display = 'block';
    } else {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }
};

password.addEventListener('input', checkPasswords);
confirmPassword.addEventListener('input', checkPasswords);

// Form submission with validation
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
        errorDiv.textContent = 'Please fill in all fields correctly.';
        errorDiv.style.display = 'block';
        return;
    }

    if (password.value !== confirmPassword.value) {
        errorDiv.textContent = 'Passwords do not match.';
        errorDiv.style.display = 'block';
        return;
    }

    // Simulate successful signup
    errorDiv.style.display = 'none';
    localStorage.setItem('authMessage', 'Account created successfully. Please login.');
    location.href = 'login.html'; // Redirect to login with success message
});