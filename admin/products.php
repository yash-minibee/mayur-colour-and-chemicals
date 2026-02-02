<?php 
$productNavActive = 1;
$pageTitle = "Products |";

include_once "auth-admin.php";

include "./partials/header.php";

?>
        <!-- Products Content -->
        <div class="content-area">
            <!-- Header - Responsive -->
            <div class="d-flex justify-content-between align-items-center mb-4 mobile-header">
                <h2 class="mb-0">Product Management</h2>
                <button class="btn btn-primary btn-touch" onclick="openAddProductModal()">
                    <i class="bi bi-plus-circle me-2"></i>
                    <span>Add New Product</span>
                </button>
            </div>

            <!-- Search Filter - Responsive -->
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-body">
                    <div class="row g-3 mobile-search-row">
                        <div class="col-md-9">
                            <label class="form-label">Search Products</label>
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search products..."
                                    id="searchInput">
                                <button class="btn btn-outline-secondary btn-touch" type="button">
                                    <i class="bi bi-search"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label d-none d-md-block">&nbsp;</label>
                            <button class="btn btn-outline-primary btn-touch w-100" id="exportProducts">
                                    <i class="bi bi-download me-1"></i>
                                    <span>Export</span>
                                </button>
                            <!-- <div class="d-flex gap-2 mobile-buttons">
                                
                                
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Desktop Table View -->
            <div class="card border-0 shadow-sm desktop-table">
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover mb-0 tablet-table" id="productsTable">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col" class="border-0 ps-4">#</th>
                                    <th scope="col" class="border-0">Product Name</th>
                                    <th scope="col" class="border-0">Category</th>
                                    <th scope="col" class="border-0">Color Shade</th>
                                    <th scope="col" class="border-0 d-none d-lg-table-cell">CI Generic Name</th>
                                    <th scope="col" class="border-0 d-none d-xl-table-cell">CAS Number</th>
                                    <th scope="col" class="border-0 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="productsTableBody">
                                <!-- Products will be dynamically loaded here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Mobile Card View -->
            <div class="mobile-table-card" id="mobileProductsContainer">
                <!-- Mobile cards will be dynamically loaded here -->
            </div>

            <!-- Pagination Controls - Responsive -->
            <div class="d-flex justify-content-between align-items-center mt-4 mobile-pagination">
                <!-- Items per page selector -->
                <div class="d-flex align-items-center">
                    <label class="form-label me-2 mb-0 d-none d-sm-inline">Show:</label>
                    <select class="form-select form-select-sm" id="itemsPerPage" style="width: auto;">
                        <option value="5">5</option>
                        <option value="10" selected>10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <span class="ms-2 text-muted" id="paginationInfo">entries</span>
                </div>

                <!-- Pagination -->
                <nav aria-label="Products pagination">
                    <ul class="pagination mb-0" id="paginationControls">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1" id="prevPage">
                                <span class="d-none d-sm-inline">Previous</span>
                                <i class="bi bi-chevron-left d-sm-none"></i>
                            </a>
                        </li>
                        <li class="page-item active">
                            <a class="page-link" href="#" id="page1">1</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#" id="nextPage">
                                <span class="d-none d-sm-inline">Next</span>
                                <i class="bi bi-chevron-right d-sm-none"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>

    <!-- Add Product Modal -->
    <div class="modal fade" id="addProductModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="productModalTitle">Add New Product</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="addProductForm">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Product Name *</label>
                                    <input type="text" class="form-control" id="productName" required
                                        placeholder="e.g., Titanium Dioxide White">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Category *</label>
                                    <select class="form-select" id="productCategory" required>
                                        <option value="">Select Category</option>
                                        <option value="deys">Deys</option>
                                        <option value="pigments">Pigments</option>
                                        <option value="colorants">Colorants</option>
                                        <option value="additives">Additives</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">CI Generic Name *</label>
                                    <input type="text" class="form-control" id="productCiGenericName" required
                                        placeholder="e.g., Titanium Dioxide">
                                    <div class="form-text">Chemical or generic name of the product</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">CAS Number *</label>
                                    <input type="text" class="form-control" id="productCasNumber" required
                                        placeholder="e.g., 13463-67-7">
                                    <div class="form-text">Chemical Abstracts Service registry number</div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label class="form-label">Color Shade *</label>
                                    <div class="d-flex align-items-center gap-3 color-controls-mobile">
                                        <input type="color" class="form-control form-control-color"
                                            id="productColorShade" value="#FFFFFF" style="width: 60px;">
                                        <input type="text" class="form-control" id="colorHexInput" value="#FFFFFF"
                                            style="width: 100px;" placeholder="#FFFFFF">
                                        <small class="text-muted d-none d-sm-inline">Select or enter the product
                                            color</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="alert alert-info">
                            <i class="bi bi-info-circle me-2"></i>
                            <strong>Note:</strong> All fields marked with * are required. The product will be added to
                            the products list.
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="saveProductBtn">
                        <i class="bi bi-check-circle me-2"></i>Save Product
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Toast Container -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1100">
        <div id="notificationToast" class="toast align-items-center border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body"></div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast"></button>
            </div>
        </div>
    </div>


    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Products Data and Logic -->
    <script src="assets/js/products.js"></script>

<?php 

include "./partials/footer.php";

?>