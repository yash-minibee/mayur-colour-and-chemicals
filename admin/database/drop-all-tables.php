<?php
include 'db.php';

$sql = "DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS admins;
";

$result = $db->exec($sql);

if ($result) {
    echo "Table created successfully";
} else {
    echo $db->lastErrorMsg();
}
?>
