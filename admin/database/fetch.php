<?php
include 'db.php';

$result = $db->query("SELECT * FROM users");

while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    echo "ID: " . $row['id'] . "<br>";
    echo "Name: " . $row['name'] . "<br>";
    echo "Email: " . $row['email'] . "<hr>";
}
?>