<?php

header('Content-Type: application/json');
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    // 🔹 FETCH ALL
    case 'GET':
        $result = $db->query("SELECT * FROM categories ORDER BY created_at DESC");
        $categories = [];

        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $categories[] = [
                'category_id' => $row['category_id'],
                'category_name' => $row['category_name'],
                'category_description' => $row['category_description'],
                'category_icon' => $row['category_icon'],
                'created_at' => $row['created_at'],
                'updated_at' => $row['updated_at']
            ];
        }

        echo json_encode($categories);
        break;

    // 🔹 CREATE / UPDATE
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);

        if (!empty($data['id'])) {
            // UPDATE
            $stmt = $db->prepare("
                UPDATE categories SET
                    category_name = :name,
                    category_description = :description,
                    category_icon = :icon,
                    updated_at = CURRENT_TIMESTAMP
                WHERE category_id = :id
            ");
            $stmt->bindValue(':id', $data['id'], SQLITE3_INTEGER);
        } else {
            // INSERT
            $stmt = $db->prepare("
                INSERT INTO categories (category_name, category_description, category_icon)
                VALUES (:name, :description, :icon)
            ");
        }

        $stmt->bindValue(':name', $data['name'], SQLITE3_TEXT);
        $stmt->bindValue(':description', $data['description'], SQLITE3_TEXT);
        $stmt->bindValue(':icon', $data['icon'], SQLITE3_TEXT);
        $stmt->execute();

        echo json_encode([
            'status' => 'success',
            'message' => empty($data['id'])
                ? 'Category created successfully'
                : 'Category updated successfully'
        ]);

        break;

    // 🔹 DELETE (WITH PRODUCT CHECK)
    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Category ID required']);
            exit;
        }

        $categoryId = (int) $data['id'];

        // ✅ Step 1: Check if any product uses this category
        $checkStmt = $db->prepare("
            SELECT COUNT(*) AS total
            FROM products
            WHERE category_id = :category_id
        ");
        $checkStmt->bindValue(':category_id', $categoryId, SQLITE3_INTEGER);
        $checkResult = $checkStmt->execute()->fetchArray(SQLITE3_ASSOC);

        if ($checkResult['total'] > 0) {
            // ❌ Category is in use
            http_response_code(409);
            echo json_encode([
                'status' => 'error',
                'message' => 'Cannot delete category. Products are assigned to this category.'
            ]);
            exit;
        }

        // ✅ Step 2: Safe to delete
        $deleteStmt = $db->prepare("
            DELETE FROM categories
            WHERE category_id = :id
        ");
        $deleteStmt->bindValue(':id', $categoryId, SQLITE3_INTEGER);
        $deleteStmt->execute();

        echo json_encode(['status' => 'deleted']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}