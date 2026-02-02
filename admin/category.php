<?php
$categoryNavActive = 1;
$pageTitle = "Categories |";

include_once "auth-admin.php";

include './partials/header.php';

?>

<!-- Categories Content -->
<div class="content-area">
    <!-- Header Section - Responsive -->
    <div class="d-flex justify-content-between align-items-center mb-4 mobile-header">
        <h2 class="mb-0">Category Management</h2>
        <button class="btn btn-primary btn-touch" data-bs-toggle="modal"
            data-bs-target="#addCategoryModal" onclick="openAddCategoryModal()">
            <i class="bi bi-plus-circle me-2"></i>
            <span>Add New Category</span>
        </button>
    </div>

    <!-- Stats Cards -->
    <div class="row mb-4">
        <div class="col-12 col-sm-6 col-xl-6 mb-3">
            <div class="card stats-card border-0 shadow-sm">
                <div class="card-body p-3">
                    <div class="d-flex align-items-center">
                        <div class="stats-icon bg-primary flex-shrink-0">
                            <i class="bi bi-tags text-white"></i>
                        </div>
                        <div class="ms-3 min-w-0">
                            <div class="stats-number" id="totalCategories">4</div>
                            <div class="stats-label">Total Categories</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-6 col-xl-6 mb-3">
            <div class="card stats-card border-0 shadow-sm">
                <div class="card-body p-3">
                    <div class="d-flex align-items-center">
                        <div class="stats-icon bg-success flex-shrink-0">
                            <i class="bi bi-palette text-white"></i>
                        </div>
                        <div class="ms-3 min-w-0">
                            <div class="stats-number" id="totalProducts">248</div>
                            <div class="stats-label">Total Products</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-3">
            <div class="row g-3">
                <div class="col-12 col-md-6">
                    <label class="form-label">Search Categories</label>
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search categories..." id="searchInput">
                        <button class="btn btn-outline-secondary" type="button" id="searchBtn">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                    <label class="form-label">Sort By</label>
                    <select class="form-select" id="sortBy">
                        <option value="name">Name (A-Z)</option>
                        <option value="name_desc">Name (Z-A)</option>
                        <option value="created">Date Created</option>
                        <option value="updated">Last Updated</option>
                    </select>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                    <label class="form-label d-none d-md-block">&nbsp;</label>
                    <div class="d-flex gap-2 flex-column flex-sm-row">
                        <button class="btn btn-outline-secondary flex-fill" id="resetFilters">
                            <i class="bi bi-arrow-clockwise me-1"></i>Reset
                        </button>
                        <button class="btn btn-outline-primary flex-fill" id="exportCategories">
                            <i class="bi bi-download me-1"></i>Export
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Desktop Table View -->
    <div class="card border-0 shadow-sm desktop-table">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover mb-0" id="categoriesTable">
                    <thead class="table-light">
                        <tr>
                            <th scope="col" class="border-0 ps-3 ps-md-4">Category</th>
                            <th scope="col" class="border-0 d-none d-md-table-cell">Description</th>
                            <th scope="col" class="border-0 d-none d-lg-table-cell">Created Date</th>
                            <th scope="col" class="border-0 d-none d-lg-table-cell">Updated Date</th>
                            <th scope="col" class="border-0 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="categoriesTableBody">
                        <!-- Categories will be dynamically loaded here -->
                        <tr>
                            <td colspan="5" class="text-center py-5">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Loading categories...</span>
                                </div>
                                <p class="mt-3 text-muted mb-0">Loading categories...</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Mobile Card View -->
    <div class="mobile-table-card" id="mobileCategoriesContainer">
        <!-- Sample Category Cards for Mobile -->
        <div class="category-card">
            <div class="category-card-header">
                <div class="category-card-title">
                    <div class="category-card-icon bg-primary">
                        <i class="bi bi-palette"></i>
                    </div>
                    Pigments
                </div>
            </div>
            <div class="category-card-body">
                <div class="category-card-description">
                    High-quality color pigments for various industrial applications including paints, coatings,
                    and plastics.
                </div>
                <div class="category-card-meta">
                    <div class="category-card-field">
                        <div class="category-card-label">Created</div>
                        <div class="category-card-value">Jan 15, 2024</div>
                    </div>
                    <div class="category-card-field">
                        <div class="category-card-label">Updated</div>
                        <div class="category-card-value">Jan 20, 2024</div>
                    </div>
                </div>
            </div>
            <div class="category-card-actions">
                <button class="btn btn-sm btn-outline-primary btn-touch" onclick="editCategory(1)"
                    title="Edit Category">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger btn-touch" onclick="confirmDeleteCategory(1)"
                    title="Delete Category">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>

        <div class="category-card">
            <div class="category-card-header">
                <div class="category-card-title">
                    <div class="category-card-icon bg-success">
                        <i class="bi bi-droplet"></i>
                    </div>
                    Dyes
                </div>
            </div>
            <div class="category-card-body">
                <div class="category-card-description">
                    Synthetic and natural dyes for textile, food, and cosmetic industries with excellent color
                    fastness.
                </div>
                <div class="category-card-meta">
                    <div class="category-card-field">
                        <div class="category-card-label">Created</div>
                        <div class="category-card-value">Jan 10, 2024</div>
                    </div>
                    <div class="category-card-field">
                        <div class="category-card-label">Updated</div>
                        <div class="category-card-value">Jan 18, 2024</div>
                    </div>
                </div>
            </div>
            <div class="category-card-actions">
                <button class="btn btn-sm btn-outline-primary btn-touch" onclick="editCategory(2)"
                    title="Edit Category">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger btn-touch" onclick="confirmDeleteCategory(2)"
                    title="Delete Category">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>

        <div class="category-card">
            <div class="category-card-header">
                <div class="category-card-title">
                    <div class="category-card-icon bg-warning">
                        <i class="bi bi-circle-fill"></i>
                    </div>
                    Colorants
                </div>
            </div>
            <div class="category-card-body">
                <div class="category-card-description">
                    Specialized colorants for plastics, rubber, and specialty applications requiring specific
                    properties.
                </div>
                <div class="category-card-meta">
                    <div class="category-card-field">
                        <div class="category-card-label">Created</div>
                        <div class="category-card-value">Jan 12, 2024</div>
                    </div>
                    <div class="category-card-field">
                        <div class="category-card-label">Updated</div>
                        <div class="category-card-value">Jan 22, 2024</div>
                    </div>
                </div>
            </div>
            <div class="category-card-actions">
                <button class="btn btn-sm btn-outline-primary btn-touch" onclick="editCategory(3)"
                    title="Edit Category">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger btn-touch" onclick="confirmDeleteCategory(3)"
                    title="Delete Category">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>

        <div class="category-card">
            <div class="category-card-header">
                <div class="category-card-title">
                    <div class="category-card-icon bg-info">
                        <i class="bi bi-star"></i>
                    </div>
                    Additives
                </div>
            </div>
            <div class="category-card-body">
                <div class="category-card-description">
                    Chemical additives and modifiers to enhance color performance, stability, and application
                    properties.
                </div>
                <div class="category-card-meta">
                    <div class="category-card-field">
                        <div class="category-card-label">Created</div>
                        <div class="category-card-value">Jan 08, 2024</div>
                    </div>
                    <div class="category-card-field">
                        <div class="category-card-label">Updated</div>
                        <div class="category-card-value">Jan 25, 2024</div>
                    </div>
                </div>
            </div>
            <div class="category-card-actions">
                <button class="btn btn-sm btn-outline-primary btn-touch" onclick="editCategory(4)"
                    title="Edit Category">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger btn-touch" onclick="confirmDeleteCategory(4)"
                    title="Delete Category">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Pagination -->
    <nav aria-label="Categories pagination" class="mt-4">
        <ul class="pagination justify-content-center" id="categoryPagination">
            <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1">Previous</a>
            </li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item">
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
</div>
</div>

<!-- Add/Edit Category Modal -->
<div class="modal fade" id="addCategoryModal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitle">Add New Category</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="categoryForm">
                    <input type="hidden" id="categoryId" value="">

                    <div class="mb-3">
                        <label class="form-label">Category Name *</label>
                        <input type="text" class="form-control" id="categoryName" required placeholder="e.g., Pigments">
                        <div class="form-text">Enter a unique category name</div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Description *</label>
                        <textarea class="form-control" id="categoryDescription" rows="3" required
                            placeholder="Enter a detailed description of this category..."></textarea>
                        <div class="form-text">Provide a clear description of what products belong to this category
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Category Icon *</label>
                        <div class="icon-selector">
                            <div class="row g-2" id="iconSelector">
                                <div class="col-4 col-sm-3 col-md-2">
                                    <input type="radio" class="btn-check" name="categoryIcon" id="icon-palette"
                                        value="bi-palette" checked>
                                    <label class="btn btn-outline-primary icon-option w-100 p-2" for="icon-palette">
                                        <i class="bi bi-palette fs-5"></i>
                                        <small class="d-block mt-1">Palette</small>
                                    </label>
                                </div>
                                <div class="col-4 col-sm-3 col-md-2">
                                    <input type="radio" class="btn-check" name="categoryIcon" id="icon-droplet"
                                        value="bi-droplet">
                                    <label class="btn btn-outline-primary icon-option w-100 p-2" for="icon-droplet">
                                        <i class="bi bi-droplet fs-5"></i>
                                        <small class="d-block mt-1">Droplet</small>
                                    </label>
                                </div>
                                <div class="col-4 col-sm-3 col-md-2">
                                    <input type="radio" class="btn-check" name="categoryIcon" id="icon-circle-fill"
                                        value="bi-circle-fill">
                                    <label class="btn btn-outline-primary icon-option w-100 p-2" for="icon-circle-fill">
                                        <i class="bi bi-circle-fill fs-5"></i>
                                        <small class="d-block mt-1">Circle</small>
                                    </label>
                                </div>
                                <div class="col-4 col-sm-3 col-md-2">
                                    <input type="radio" class="btn-check" name="categoryIcon" id="icon-star"
                                        value="bi-star">
                                    <label class="btn btn-outline-primary icon-option w-100 p-2" for="icon-star">
                                        <i class="bi bi-star fs-5"></i>
                                        <small class="d-block mt-1">Star</small>
                                    </label>
                                </div>
                                <div class="col-4 col-sm-3 col-md-2">
                                    <input type="radio" class="btn-check" name="categoryIcon" id="icon-brush"
                                        value="bi-brush">
                                    <label class="btn btn-outline-primary icon-option w-100 p-2" for="icon-brush">
                                        <i class="bi bi-brush fs-5"></i>
                                        <small class="d-block mt-1">Brush</small>
                                    </label>
                                </div>
                                <div class="col-4 col-sm-3 col-md-2">
                                    <input type="radio" class="btn-check" name="categoryIcon" id="icon-paint-bucket"
                                        value="bi-paint-bucket">
                                    <label class="btn btn-outline-primary icon-option w-100 p-2"
                                        for="icon-paint-bucket">
                                        <i class="bi bi-paint-bucket fs-5"></i>
                                        <small class="d-block mt-1">Bucket</small>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-text">Select an icon that best represents this category</div>
                    </div>

                    <div class="alert alert-info">
                        <i class="bi bi-info-circle me-2"></i>
                        <strong>Note:</strong> All fields marked with * are required. Category names must be unique.
                    </div>
                </form>
            </div>
            <div class="modal-footer flex-column flex-sm-row">
                <button type="button" class="btn btn-secondary w-100 w-sm-auto mb-2 mb-sm-0"
                    data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary w-100 w-sm-auto" id="saveCategoryBtn">
                    <i class="bi bi-check-circle me-2"></i>Save Category
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Delete Confirmation Modal -->
<div class="modal fade" id="deleteCategoryModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Delete Category</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="text-center">
                    <i class="bi bi-exclamation-triangle text-warning display-4 mb-3"></i>
                    <h5>Are you sure?</h5>
                    <p class="text-muted">This action cannot be undone. The category "<span
                            id="deleteCategoryName"></span>" will be permanently deleted.</p>
                    <div class="alert alert-warning">
                        <i class="bi bi-info-circle me-2"></i>
                        <strong>Warning:</strong> Products using this category will need to be reassigned.
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" id="confirmDeleteBtn">
                    <i class="bi bi-trash me-2"></i>Delete Category
                </button>
            </div>
        </div>
    </div>
</div>

<div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="notificationToast" class="toast">
        <div class="toast-body"></div>
    </div>
</div>


<!-- Bootstrap 5 JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<!-- Fixed Admin JS -->
<script src="assets/js/admin-fixed.js"></script>
<!-- Category Management JS -->
<script src="assets/js/category.js"></script>

<?php

include './partials/footer.php';

?>