<?php
class MyDB extends SQLite3 {
    function __construct() {
        $this->open('mayur_colour_and_chemicals.db');
    }
}

$db = new MyDB();

if (!$db) {
    echo $db->lastErrorMsg();
} else {
    echo "Connected Successfully";
}
?>
