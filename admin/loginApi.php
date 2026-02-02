<?php
session_start();
header('Content-Type: application/json');

require_once 'db.php';


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => false, 'message' => 'Invalid request']);
    exit;
}

$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

if ($username === '' || $password === '') {
    echo json_encode(['status' => false, 'message' => 'All fields are required']);
    exit;
}

try {

    $stmt = $db->prepare(
        'SELECT id, username, password 
         FROM admins 
         WHERE username = :username 
         LIMIT 1'
    );

    $stmt->bindValue(':username', $username, SQLITE3_TEXT);
    $result = $stmt->execute();

    $admin = $result->fetchArray(SQLITE3_ASSOC);

    if ($admin && password_verify($password, $admin['password'])) {

        $_SESSION['admin_id'] = $admin['id'];
        $_SESSION['admin_user'] = $admin['username'];

        echo json_encode([
            'status' => true,
            'message' => 'Login successful'
        ]);
    } else {
        echo json_encode([
            'status' => false,
            'message' => 'Invalid username or password'
        ]);
    }

    $stmt->close();
    $db->close();

} catch (Exception $e) {
    echo json_encode([
        'status' => false,
        'message' => 'Server error'
    ]);
}


?>