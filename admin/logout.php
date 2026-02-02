<?php
session_start();

/*
 |---------------------------------------
 | Destroy all session data
 |---------------------------------------
*/
$_SESSION = [];

// Unset session
session_unset();
// Destroy session
session_destroy();

/*
 |---------------------------------------
 | Redirect to login page
 |---------------------------------------
*/

header("Location: admin_login.php"); // or login.php
exit;

?>