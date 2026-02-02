<?php
session_start();

if (isset($_SESSION['admin_id'])) {
    header('Location: dashboard.php');
    exit;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Mayur Colour Admin">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#0891b2">
    <title>Admin Login - Mayur Colour</title>

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">
    <!-- Mayur Colour Admin Styles -->
    <link href="assets/css/styles.css" rel="stylesheet">
</head>

<body class="login-page">
    <div class="login-container">
        <div class="login-card">
            <!-- Login Header -->
            <div class="login-header">
                <div class="login-logo">
                    <i class="bi bi-palette-fill"></i>
                </div>
                <h1 class="login-title">Mayur Colour</h1>
                <p class="login-subtitle">Admin Panel Access</p>
            </div>

            <!-- Login Body -->
            <div class="login-body">
                <!-- Error Message -->
                <div class="error-message" id="errorMessage">
                    <i class="bi bi-exclamation-triangle-fill"></i>
                    <span id="errorText">Invalid username or password. Please try again.</span>
                </div>

                <!-- Login Form -->
                <form id="loginForm" novalidate>
                    <!-- Username Field -->
                    <div class="form-group">
                        <label for="username" class="form-label">Username</label>
                        <div class="position-relative">
                            <input 
                                type="text" 
                                class="form-control" 
                                id="username" 
                                name="username"
                                placeholder="Enter your username"
                                required
                                autocomplete="username"
                                aria-describedby="usernameHelp"
                            >
                            <i class="bi bi-person-fill input-icon"></i>
                        </div>
                    </div>

                    <!-- Password Field -->
                    <div class="form-group">
                        <label for="password" class="form-label">Password</label>
                        <div class="position-relative">
                            <input 
                                type="password" 
                                class="form-control" 
                                id="password" 
                                name="password"
                                placeholder="Enter your password"
                                required
                                autocomplete="current-password"
                                aria-describedby="passwordHelp"
                            >
                            <i class="bi bi-lock-fill input-icon"></i>
                            <button 
                                type="button" 
                                class="password-toggle" 
                                id="passwordToggle"
                                aria-label="Toggle password visibility"
                            >
                                <i class="bi bi-eye-fill" id="passwordToggleIcon"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Remember Me -->
                    <div class="remember-me">
                        <input 
                            type="checkbox" 
                            class="form-check-input" 
                            id="rememberMe" 
                            name="rememberMe"
                        >
                        <label class="form-check-label" for="rememberMe">
                            Remember me for 30 days
                        </label>
                    </div>

                    <!-- Login Button -->
                    <button type="submit" class="btn-login" id="loginButton">
                        <div class="spinner" id="loginSpinner"></div>
                        <span class="btn-text">Sign In to Dashboard</span>
                    </button>
                </form>
            </div>

            <!-- Login Footer -->
            <div class="login-footer">
                <p>&copy; 2024 Mayur Colour and Chemicals. All rights reserved.</p>
            </div>
        </div>
    </div>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Login JavaScript -->
    <script src="assets/js/login.js"></script>
</body>

</html>