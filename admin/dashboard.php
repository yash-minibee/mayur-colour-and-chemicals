<?php 
$dashboardNavActive = 1;
$pageTitle = "Dashboard |";

include_once "auth-admin.php";

include "./partials/header.php";
?>


        <!-- Dashboard Content -->
        <div class="content-area">
            <div class="d-flex justify-content-between align-items-center mb-4 dashboard-header">
                <h2 class="mb-0">Dashboard</h2>
                    <div class="d-flex align-items-center gap-3">
                        <small class="text-muted" id="lastUpdated" style="display: none;">
                            <i class="bi bi-clock"></i>
                            <span>Last updated: <span id="lastUpdatedTime"></span></span>
                        </small>
                        <button class="btn btn-outline-primary btn-sm" onclick="refreshDashboard()" title="Refresh Data">
                            <i class="bi bi-arrow-clockwise"></i>
                            <span class="d-none d-sm-inline ms-1">Refresh</span>
                        </button>
                        <div class="text-muted dashboard-date">
                            <i class="bi bi-calendar3"></i>
                            <span id="currentDate"></span>
                        </div>
                    </div>
            </div>

            <!-- Stats Cards -->
            <div class="row justify-content-center stats-cards-mobile">
                <div class="col-12 col-sm-6 col-xl-4 col-lg-6 col-md-8 mb-4">
                    <div class="card stats-card border-0 shadow-sm h-100">
                        <div class="card-body text-center py-5">
                            <div class="stats-icon bg-primary mx-auto mb-3" style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
                                <i class="bi bi-palette text-white" style="font-size: 2rem;"></i>
                            </div>
                            <div class="stats-number mb-2" style="font-size: 3rem; font-weight: 700; color: #2c3e50;" id="totalProducts">0</div>
                            <div class="stats-label" style="font-size: 1.1rem; color: #6c757d; font-weight: 500;">Total Products</div>
                            <div class="mt-3">
                                <a href="products.php" class="btn btn-outline-primary btn-sm btn-touch">
                                    <i class="bi bi-arrow-right me-1"></i><span class="d-none d-sm-inline">View </span>Products
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-xl-4 col-lg-6 col-md-8 mb-4">
                    <div class="card stats-card border-0 shadow-sm h-100">
                        <div class="card-body text-center py-5">
                            <div class="stats-icon bg-success mx-auto mb-3" style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
                                <i class="bi bi-tags text-white" style="font-size: 2rem;"></i>
                            </div>
                            <div class="stats-number mb-2" style="font-size: 3rem; font-weight: 700; color: #2c3e50;" id="totalCategories">0</div>
                            <div class="stats-label" style="font-size: 1.1rem; color: #6c757d; font-weight: 500;">Product Categories</div>
                            <div class="mt-3">
                                <a href="category.php" class="btn btn-outline-success btn-sm btn-touch">
                                    <i class="bi bi-arrow-right me-1"></i><span class="d-none d-sm-inline">View </span>Categories
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Category Breakdown -->
            <div class="row justify-content-center mt-4">
                <div class="col-12 col-xl-8 col-lg-10">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-white border-bottom">
                            <h5 class="mb-0">
                                <i class="bi bi-pie-chart me-2"></i>
                                Category Breakdown
                            </h5>
                        </div>
                        <div class="card-body category-breakdown-mobile">
                            <div id="categoryBreakdown">
                                <!-- Category breakdown will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Fixed Admin JS -->
    <script src="assets/js/admin-fixed.js"></script>
    <!-- Dashboard JS -->
    <script>
        // Function to set current date
        function setCurrentDate() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            };
            document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
        }

        // Function to load dashboard data dynamically
        async function loadDashboardData() {
            try {
                // Show loading state
                document.getElementById('totalProducts').textContent = '...';
                document.getElementById('totalCategories').textContent = '...';
                document.getElementById('categoryBreakdown').innerHTML = '<div class="text-center py-4"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';

                // Fetch data from APIs
                const [productsResponse, categoriesResponse] = await Promise.all([
                    fetch('productApi.php'),
                    fetch('categoryApi.php')
                ]);

                if (!productsResponse.ok || !categoriesResponse.ok) {
                    throw new Error('Failed to fetch data from APIs');
                }

                const products = await productsResponse.json();
                const categories = await categoriesResponse.json();

                // Calculate totals
                const totalProducts = products.length;
                const totalCategories = categories.length;

                // Update the dashboard cards with animation
                animateCounter('totalProducts', totalProducts);
                animateCounter('totalCategories', totalCategories);

                // Load category breakdown with real data
                loadCategoryBreakdown(products, categories);

                // Show last updated time
                const now = new Date();
                document.getElementById('lastUpdatedTime').textContent = now.toLocaleTimeString();
                document.getElementById('lastUpdated').style.display = 'block';

            } catch (error) {
                console.error('Error loading dashboard data:', error);
                
                // Show error state
                document.getElementById('totalProducts').textContent = 'Error';
                document.getElementById('totalCategories').textContent = 'Error';
                document.getElementById('categoryBreakdown').innerHTML = `
                    <div class="text-center py-4 text-muted">
                        <i class="bi bi-exclamation-triangle fs-1 mb-3"></i>
                        <p>Failed to load dashboard data</p>
                        <button class="btn btn-outline-primary btn-sm" onclick="loadDashboardData()">
                            <i class="bi bi-arrow-clockwise me-1"></i>Retry
                        </button>
                    </div>
                `;
            }
        }

        // Function to animate counter
        function animateCounter(elementId, targetValue) {
            const element = document.getElementById(elementId);
            const duration = 1500; // 1.5 seconds
            const startTime = performance.now();
            const startValue = 0;

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
                
                element.textContent = currentValue;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = targetValue;
                }
            }

            requestAnimationFrame(updateCounter);
        }

        // Function to load category breakdown with real data
        function loadCategoryBreakdown(products, categories) {
            const categoryBreakdown = document.getElementById('categoryBreakdown');
            
            if (categories.length === 0) {
                categoryBreakdown.innerHTML = `
                    <div class="text-center py-4 text-muted">
                        <i class="bi bi-tags fs-1 mb-3"></i>
                        <p>No categories found</p>
                        <a href="category.php" class="btn btn-outline-primary btn-sm">
                            <i class="bi bi-plus-circle me-1"></i>Add Category
                        </a>
                    </div>
                `;
                return;
            }

            // Calculate products per category using real data
            const categoryData = categories.map(category => {
                const count = products.filter(product => 
                    product.category_id === category.category_id
                ).length;
                const percentage = products.length > 0 ? ((count / products.length) * 100).toFixed(1) : 0;
                
                return { 
                    category_id: category.category_id,
                    category_name: category.category_name,
                    category_icon: category.category_icon,
                    count, 
                    percentage 
                };
            });

            // Sort by count (descending)
            categoryData.sort((a, b) => b.count - a.count);

            // Category colors mapping
            const categoryColors = {
                'pigments': '#007bff',
                'dyes': '#28a745', 
                'colorants': '#ffc107',
                'additives': '#dc3545',
                'specialty': '#6f42c1',
                'organic': '#20c997',
                'inorganic': '#fd7e14'
            };

            // Get color by category name (fallback to default)
            function getCategoryColor(categoryName) {
                const name = categoryName.toLowerCase();
                return categoryColors[name] || '#6c757d';
            }

            // Check if mobile view
            const isMobile = window.innerWidth <= 768;

            // Generate HTML based on screen size
            const html = categoryData.map(item => {
                const color = getCategoryColor(item.category_name);
                const iconClass = item.category_icon || 'bi-tag';
                
                if (isMobile) {
                    // Mobile layout - stacked cards
                    return `
                        <div class="category-item-mobile d-flex align-items-center justify-content-between mb-3 p-3 border rounded">
                            <div class="category-info-mobile d-flex align-items-center">
                                <div class="category-color-indicator-mobile me-3 d-flex align-items-center justify-content-center" 
                                     style="width: 40px; height: 40px; background-color: ${color}; border-radius: 50%; flex-shrink: 0;">
                                    <i class="${iconClass} text-white"></i>
                                </div>
                                <div>
                                    <div class="category-name-mobile fw-semibold">${item.category_name}</div>
                                    <small class="category-count-mobile text-muted">${item.count} products</small>
                                </div>
                            </div>
                            <div class="category-stats-mobile text-end">
                                <div class="category-percentage-mobile fw-bold mb-1">${item.percentage}%</div>
                                <div class="progress category-progress-mobile" style="width: 80px; height: 8px;">
                                    <div class="progress-bar" 
                                         style="width: ${item.percentage}%; background-color: ${color};"
                                         role="progressbar"></div>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    // Desktop layout - horizontal
                    return `
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <div class="d-flex align-items-center">
                                <div class="category-color-indicator me-3 d-flex align-items-center justify-content-center" 
                                     style="width: 32px; height: 32px; background-color: ${color}; border-radius: 50%;">
                                    <i class="${iconClass} text-white" style="font-size: 0.875rem;"></i>
                                </div>
                                <div>
                                    <div class="fw-medium">${item.category_name}</div>
                                    <small class="text-muted">${item.count} products</small>
                                </div>
                            </div>
                            <div class="text-end">
                                <div class="fw-bold">${item.percentage}%</div>
                                <div class="progress mt-1" style="width: 100px; height: 6px;">
                                    <div class="progress-bar" 
                                         style="width: ${item.percentage}%; background-color: ${color};"
                                         role="progressbar"></div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }).join('');

            categoryBreakdown.innerHTML = html;
        }

        // Function to handle window resize
        function handleResize() {
            // Only reload if we have data
            if (document.getElementById('totalProducts').textContent !== '...' && 
                document.getElementById('totalProducts').textContent !== 'Error') {
                loadDashboardData();
            }
        }

        // Function to refresh dashboard data
        function refreshDashboard() {
            loadDashboardData();
        }

        // Initialize dashboard when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            setCurrentDate();
            loadDashboardData();
            
            // Add resize listener for responsive category breakdown
            let resizeTimeout;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(handleResize, 250);
            });

            // Auto-refresh every 5 minutes
            setInterval(refreshDashboard, 300000);
        });

        // Expose refresh function globally for manual refresh
        window.refreshDashboard = refreshDashboard;
    </script>

<?php 

include "./partials/footer.php";

?>