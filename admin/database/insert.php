<?php
include 'db.php';

$username = "admin";
$pass = password_hash("admin", PASSWORD_DEFAULT);

$stmt = $db->prepare(
    "INSERT INTO admins (username, password, created_at)
     VALUES (:username, :pass, CURRENT_TIMESTAMP)"
);

if (!$stmt) {
    die("Prepare failed: " . $db->lastErrorMsg());
}

$stmt->bindValue(':username', $username, SQLITE3_TEXT);
$stmt->bindValue(':pass', $pass, SQLITE3_TEXT);

$result = $stmt->execute();

if ($result) {
    echo "✅ Data inserted successfully";
} else {
    echo "❌ Insert failed: " . $db->lastErrorMsg();
}
?>
