<?php
/**
 * Dashboard API
 * Provides statistics and data for the admin dashboard
 */

header('Content-Type: application/json');
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    // Get total products count
    $productsResult = $db->query("SELECT COUNT(*) as total FROM products");
    $totalProducts = $productsResult->fetchArray(SQLITE3_ASSOC)['total'];

    // Get total categories count
    $categoriesResult = $db->query("SELECT COUNT(*) as total FROM categories");
    $totalCategories = $categoriesResult->fetchArray(SQLITE3_ASSOC)['total'];

    // Get category breakdown with product counts
    $categoryBreakdownQuery = "
        SELECT 
            c.category_name,
            c.category_icon,
            COUNT(p.product_id) as product_count
        FROM categories c
        LEFT JOIN products p ON c.category_id = p.category_id
        GROUP BY c.category_id, c.category_name, c.category_icon
        ORDER BY product_count DESC
    ";
    
    $categoryBreakdownResult = $db->query($categoryBreakdownQuery);
    $categoryBreakdown = [];
    
    while ($row = $categoryBreakdownResult->fetchArray(SQLITE3_ASSOC)) {
        $percentage = $totalProducts > 0 ? round(($row['product_count'] / $totalProducts) * 100, 1) : 0;
        $categoryBreakdown[] = [
            'category_name' => $row['category_name'],
            'category_icon' => $row['category_icon'],
            'product_count' => (int)$row['product_count'],
            'percentage' => $percentage
        ];
    }

    // Get recent products (last 5)
    $recentProductsQuery = "
        SELECT 
            p.product_name,
            c.category_name,
            p.shade_code,
            p.created_at
        FROM products p
        INNER JOIN categories c ON c.category_id = p.category_id
        ORDER BY p.created_at DESC
        LIMIT 5
    ";
    
    $recentProductsResult = $db->query($recentProductsQuery);
    $recentProducts = [];
    
    while ($row = $recentProductsResult->fetchArray(SQLITE3_ASSOC)) {
        $recentProducts[] = [
            'product_name' => $row['product_name'],
            'category_name' => $row['category_name'],
            'shade_code' => $row['shade_code'],
            'created_at' => $row['created_at']
        ];
    }

    // Get categories with no products
    $emptyCategoriesQuery = "
        SELECT 
            c.category_name,
            c.category_icon
        FROM categories c
        LEFT JOIN products p ON c.category_id = p.category_id
        WHERE p.product_id IS NULL
        ORDER BY c.category_name
    ";
    
    $emptyCategoriesResult = $db->query($emptyCategoriesQuery);
    $emptyCategories = [];
    
    while ($row = $emptyCategoriesResult->fetchArray(SQLITE3_ASSOC)) {
        $emptyCategories[] = [
            'category_name' => $row['category_name'],
            'category_icon' => $row['category_icon']
        ];
    }

    // Return dashboard data
    echo json_encode([
        'status' => 'success',
        'data' => [
            'totals' => [
                'products' => (int)$totalProducts,
                'categories' => (int)$totalCategories
            ],
            'category_breakdown' => $categoryBreakdown,
            'recent_products' => $recentProducts,
            'empty_categories' => $emptyCategories,
            'last_updated' => date('Y-m-d H:i:s')
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to fetch dashboard data',
        'error' => $e->getMessage()
    ]);
}
?>