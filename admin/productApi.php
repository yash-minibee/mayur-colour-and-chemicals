<?php
/**
 * Products API
 * Backend: PHP + SQLite3
 * Supports: LIST, CREATE, UPDATE, DELETE
 */

header("Content-Type: application/json");
include_once "db.php";

if (!$db) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// ===============================
// REQUEST METHOD
// ===============================
$method = $_SERVER['REQUEST_METHOD'];
$input  = json_decode(file_get_contents("php://input"), true);

// ===============================
// GET → LIST PRODUCTS
// ===============================
if ($method === 'GET') {

    $query = "
        SELECT 
            p.product_id,
            p.product_name,
            p.category_id,
            c.category_name,
            p.ci_generic_name,
            p.cas_no,
            p.shade_code,
            p.created_at
        FROM products p
        INNER JOIN categories c ON c.category_id = p.category_id
        ORDER BY p.product_id DESC
    ";

    $result = $db->query($query);

    $products = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $products[] = $row;
    }

    echo json_encode($products);
    exit;
}

// ===============================
// POST → CREATE / UPDATE PRODUCT
// ===============================
if ($method === 'POST') {

    if (
        empty($input['product_name']) ||
        empty($input['category_id']) ||
        empty($input['shade_code'])
    ) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        exit;
    }

    // UPDATE
    if (!empty($input['product_id'])) {

        $stmt = $db->prepare("
            UPDATE products SET
                product_name = :product_name,
                category_id = :category_id,
                ci_generic_name = :ci_generic_name,
                cas_no = :cas_no,
                shade_code = :shade_code
            WHERE product_id = :product_id
        ");

        $stmt->bindValue(':product_id', $input['product_id'], SQLITE3_INTEGER);
    }
    // INSERT
    else {

        $stmt = $db->prepare("
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
        ");
    }

    $stmt->bindValue(':product_name', $input['product_name'], SQLITE3_TEXT);
    $stmt->bindValue(':category_id', $input['category_id'], SQLITE3_INTEGER);
    $stmt->bindValue(':ci_generic_name', $input['ci_generic_name'] ?? null, SQLITE3_TEXT);
    $stmt->bindValue(':cas_no', $input['cas_no'] ?? null, SQLITE3_TEXT);
    $stmt->bindValue(':shade_code', $input['shade_code'], SQLITE3_TEXT);

    $stmt->execute();

    echo json_encode([
        "success" => true,
        "message" => empty($input['product_id'])
            ? "Product added successfully"
            : "Product updated successfully"
    ]);
    
    exit;
}

// ===============================
// DELETE → DELETE PRODUCT
// ===============================
if ($method === 'DELETE') {

    if (empty($input['product_id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Product ID required"]);
        exit;
    }

    $stmt = $db->prepare("
        DELETE FROM products
        WHERE product_id = :product_id
    ");

    $stmt->bindValue(':product_id', $input['product_id'], SQLITE3_INTEGER);
    $stmt->execute();

    echo json_encode([
        "success" => true,
        "message" => "Product deleted successfully"
    ]);
    
    exit;
}

// ===============================
// INVALID METHOD
// ===============================
http_response_code(405);
echo json_encode(["error" => "Method not allowed"]);
