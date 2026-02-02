// Mayur Colour Admin - Login (PHP + SQLite3)
// Debug-safe + production-ready

document.addEventListener('DOMContentLoaded', function () {

    /* ================================
       Elements
    ================================= */
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const loginSpinner = document.getElementById('loginSpinner');

    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');
    const rememberMe = document.getElementById('rememberMe');

    const passwordToggle = document.getElementById('passwordToggle');
    const passwordToggleIcon = document.getElementById('passwordToggleIcon');

    usernameField.focus();
    hideError();

    /* ================================
       Toggle password visibility
    ================================= */
    passwordToggle.addEventListener('click', function () {
        const show = passwordField.type === 'password';
        passwordField.type = show ? 'text' : 'password';
        passwordToggleIcon.className = show
            ? 'bi bi-eye-slash-fill'
            : 'bi bi-eye-fill';
    });

    /* ================================
       Form submit
    ================================= */
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        hideError();

        const username = usernameField.value.trim();
        const password = passwordField.value;

        if (!username || !password) {
            showError('Please enter username and password');
            return;
        }

        showLoading();

        const formData = new FormData(loginForm);

        fetch('loginApi.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(text => {

            console.log('LOGIN RAW RESPONSE:', text);

            let data;
            try {
                data = JSON.parse(text);
            } catch (err) {
                hideLoading();
                showError('Invalid server response');
                return;
            }

            if (data.status === true) {
                showSuccess();
                setTimeout(() => {
                    window.location.href = 'dashboard.php';
                }, 1200);
            } else {
                hideLoading();
                showError(data.message || 'Login failed');
                passwordField.value = '';
                passwordField.focus();
            }
        })
        .catch(err => {
            console.error('FETCH ERROR:', err);
            hideLoading();
            showError('Server connection failed');
        });
    });

    /* ================================
       UI Helpers
    ================================= */
    function showLoading() {
        loginButton.disabled = true;
        loginButton.classList.add('loading');
        if (loginSpinner) loginSpinner.style.display = 'block';
    }

    function hideLoading() {
        loginButton.disabled = false;
        loginButton.classList.remove('loading');
        if (loginSpinner) loginSpinner.style.display = 'none';
    }

    function showError(message) {
        errorText.textContent = message;
        errorMessage.classList.add('show');
    }

    function hideError() {
        errorMessage.classList.remove('show');
    }

    function showSuccess() {
        hideLoading();
        loginButton.style.background =
            'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        loginButton.querySelector('.btn-text').textContent =
            'Login Successful';

        const icon = document.createElement('i');
        icon.className = 'bi bi-check-circle-fill me-2';
        loginButton.prepend(icon);
    }

});
