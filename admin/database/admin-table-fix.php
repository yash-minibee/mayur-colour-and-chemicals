<?php
include 'db.php';

$sql = "DROP TABLE IF EXISTS admins;

CREATE TABLE admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
";

$result = $db->exec($sql);

if ($result) {
    echo "Table created successfully";
} else {
    echo $db->lastErrorMsg();
}
?>
