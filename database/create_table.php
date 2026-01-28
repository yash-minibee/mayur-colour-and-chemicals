<?php
include 'db.php';

$sql = "CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)";

$result = $db->exec($sql);

if ($result) {
    echo "Table created successfully";
} else {
    echo $db->lastErrorMsg();
}
?>
