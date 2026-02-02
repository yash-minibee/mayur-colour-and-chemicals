<?php
include 'db.php';

$sql = "

INSERT INTO products (
                product_name,
                category_id,
                ci_generic_name,
                cas_no,
                shade_code
            ) VALUES (
                :product_name,
                :category_id,
                :ci_generic_name,
                :cas_no,
                :shade_code
            )
";

$result = $db->exec($sql);

if ($result) {
    echo "Table created successfully";
} else {
    echo $db->lastErrorMsg();
}
?>
