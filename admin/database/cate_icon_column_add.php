<?php
include 'db.php';

$sql = "
ALTER TABLE categories
ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;
";

$result = $db->exec($sql);

if ($result) {
    echo "successfully";
} else {
    echo $db->lastErrorMsg();
}
?>
