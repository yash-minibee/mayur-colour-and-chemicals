<?php
include 'db.php';

$name  = "Yash";
$email = "yash@example.com";

$stmt = $db->prepare("INSERT INTO users (name, email) VALUES (:name, :email)");
$stmt->bindValue(':name', $name, SQLITE3_TEXT);
$stmt->bindValue(':email', $email, SQLITE3_TEXT);

$result = $stmt->execute();

if ($result) {
    echo "Data inserted successfully";
} else {
    echo $db->lastErrorMsg();
}
?>
