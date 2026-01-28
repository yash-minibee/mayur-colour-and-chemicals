// Sample product data
const products = [
    {
        id: 1,
        name: "Titanium Dioxide White",
        category: "deys",
        colorShade: "#FFFFFF",
        ciGenericName: "Titanium Dioxide",
        casNumber: "13463-67-7"
    },
    {
        id: 2,
        name: "Iron Oxide Red",
        category: "pigments",
        colorShade: "#CD5C5C",
        ciGenericName: "Iron Oxide",
        casNumber: "1309-37-1"
    },
    {
        id: 3,
        name: "Ultramarine Blue",
        category: "pigments",
        colorShade: "#4169E1",
        ciGenericName: "Ultramarine",
        casNumber: "57455-37-5"
    },
    {
        id: 4,
        name: "Chrome Yellow",
        category: "pigments",
        colorShade: "#FFD700",
        ciGenericName: "Lead Chromate",
        casNumber: "7758-97-6"
    },
    {
        id: 5,
        name: "Carbon Black",
        category: "pigments",
        colorShade: "#000000",
        ciGenericName: "Carbon Black",
        casNumber: "1333-86-4"
    },
    {
        id: 6,
        name: "Phthalocyanine Green",
        category: "deys",
        colorShade: "#00FF7F",
        ciGenericName: "Copper Phthalocyanine",
        casNumber: "1328-53-6"
    },
    {
        id: 7,
        name: "Cadmium Orange",
        category: "pigments",
        colorShade: "#FF8C00",
        ciGenericName: "Cadmium Selenide",
        casNumber: "1306-24-7"
    },
    {
        id: 8,
        name: "Quinacridone Violet",
        category: "colorants",
        colorShade: "#8B008B",
        ciGenericName: "Quinacridone",
        casNumber: "1047-16-1"
    },
    {
        id: 9,
        name: "Zinc Oxide White",
        category: "additives",
        colorShade: "#F8F8FF",
        ciGenericName: "Zinc Oxide",
        casNumber: "1314-13-2"
    },
    {
        id: 10,
        name: "Prussian Blue",
        category: "deys",
        colorShade: "#003153",
        ciGenericName: "Iron Hexacyanoferrate",
        casNumber: "14038-43-8"
    },
    {
        id: 11,
        name: "Vermillion Red",
        category: "pigments",
        colorShade: "#E34234",
        ciGenericName: "Mercury Sulfide",
        casNumber: "1344-48-5"
    },
    {
        id: 12,
        name: "Cobalt Blue",
        category: "colorants",
        colorShade: "#0047AB",
        ciGenericName: "Cobalt Aluminate",
        casNumber: "1345-16-0"
    },
    {
        id: 13,
        name: "Chromium Green",
        category: "pigments",
        colorShade: "#50C878",
        ciGenericName: "Chromium Oxide",
        casNumber: "1308-38-9"
    },
    {
        id: 14,
        name: "Alizarin Crimson",
        category: "deys",
        colorShade: "#E32636",
        ciGenericName: "Alizarin",
        casNumber: "72-48-0"
    },
    {
        id: 15,
        name: "Burnt Sienna",
        category: "colorants",
        colorShade: "#A0522D",
        ciGenericName: "Iron Oxide",
        casNumber: "51274-00-1"
    }
];

// Global variables for search and filtering
let filteredProducts = [...products];
let currentSearchTerm = '';

// Function to filter products based on search term
function filterProducts(searchTerm) {
    currentSearchTerm = searchTerm.toLowerCase();

    if (!searchTerm.trim()) {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(currentSearchTerm) ||
            product.category.toLowerCase().includes(currentSearchTerm) ||
            product.ciGenericName.toLowerCase().includes(currentSearchTerm) ||
            product.casNumber.toLowerCase().includes(currentSearchTerm) ||
            product.colorShade.toLowerCase().includes(currentSearchTerm)
        );
    }

    loadProductsTable();
    updateSearchResults();
}

// Function to update search results info
function updateSearchResults() {
    const totalProducts = products.length;
    const filteredCount = filteredProducts.length;
    const paginationInfo = document.getElementById('paginationInfo');

    if (paginationInfo) {
        if (currentSearchTerm) {
            paginationInfo.textContent = `Showing ${filteredCount} of ${totalProducts} products`;
        } else {
            paginationInfo.textContent = `Showing ${totalProducts} products`;
        }
    }
}

// Function to load products into table (updated to use filtered products)
function loadProductsTable() {
    const tableBody = document.querySelector('#productsTable tbody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (filteredProducts.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="7" class="text-center py-4">
                <div class="text-muted">
                    <i class="bi bi-search fs-1 mb-3 d-block"></i>
                    <h5>No products found</h5>
                    <p class="mb-0">Try adjusting your search criteria</p>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
        return;
    }

    filteredProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="ps-4">${product.id}</td>
            <td>${product.name}</td>
            <td><span class="badge bg-secondary">${product.category}</span></td>
            <td>
                <div class="d-flex align-items-center gap-2">
                    <div style="width: 30px; height: 20px; background-color: ${product.colorShade}; border: 1px solid #ccc; border-radius: 3px; display: inline-block;"></div>
                    <span class="font-monospace">${product.colorShade}</span>
                </div>
            </td>
            <td>${product.ciGenericName}</td>
            <td class="font-monospace">${product.casNumber}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editProduct(${product.id})" title="Edit">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${product.id})" title="Delete">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to reset search and filters
function resetFilters() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }

    currentSearchTerm = '';
    filteredProducts = [...products];
    loadProductsTable();
    updateSearchResults();
    showNotification('Filters reset successfully!', 'info');
}

// Function to export products to CSV
function exportProducts() {
    const dataToExport = filteredProducts.length > 0 ? filteredProducts : products;

    // Create CSV headers
    const headers = ['ID', 'Product Name', 'Category', 'Color Shade', 'CI Generic Name', 'CAS Number'];

    // Create CSV content
    const csvContent = [
        headers.join(','),
        ...dataToExport.map(product => [
            product.id,
            `"${product.name}"`,
            `"${product.category}"`,
            product.colorShade,
            `"${product.ciGenericName}"`,
            `"${product.casNumber}"`
        ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `mayur-colour-products-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification(`Exported ${dataToExport.length} products successfully!`, 'success');
}

// Function to setup search and filter handlers
function setupSearchHandlers() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.input-group .btn');
    const resetButton = document.getElementById('resetFilters');
    const exportButton = document.getElementById('exportProducts');

    // Search input handler with debounce
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function () {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                filterProducts(this.value);
            }, 300); // 300ms debounce
        });

        // Handle Enter key
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                filterProducts(this.value);
            }
        });
    }

    // Search button handler
    if (searchButton) {
        searchButton.addEventListener('click', function () {
            if (searchInput) {
                filterProducts(searchInput.value);
            }
        });
    }

    // Reset button handler
    if (resetButton) {
        resetButton.addEventListener('click', resetFilters);
    }

    // Export button handler
    if (exportButton) {
        exportButton.addEventListener('click', exportProducts);
    }
}

// Function to add new product
function addProduct(productData) {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProduct = {
        id: newId,
        ...productData
    };

    products.push(newProduct);

    // Update filtered products if no search is active
    if (!currentSearchTerm) {
        filteredProducts = [...products];
    } else {
        // Re-apply current filter to include new product if it matches
        filterProducts(currentSearchTerm);
        return newProduct;
    }

    loadProductsTable();
    updateSearchResults();
    return newProduct;
}

// Form handling functions
function setupFormHandlers() {
    const colorPicker = document.getElementById('productColorShade');
    const colorPreview = document.getElementById('colorPreview');
    const colorHexInput = document.getElementById('colorHexInput');
    const saveBtn = document.getElementById('saveProductBtn');
    const form = document.getElementById('addProductForm');

    // Color picker synchronization
    if (colorPicker && colorPreview && colorHexInput) {
        colorPicker.addEventListener('input', function () {
            const color = this.value;
            colorPreview.style.backgroundColor = color;
            colorHexInput.value = color;
        });

        colorHexInput.addEventListener('input', function () {
            const color = this.value;
            if (/^#[0-9A-F]{6}$/i.test(color)) {
                colorPicker.value = color;
                colorPreview.style.backgroundColor = color;
            }
        });
    }

    // Save product button
    if (saveBtn && form) {
        saveBtn.addEventListener('click', function () {
            const editId = this.dataset.editId;

            if (form.checkValidity()) {
                const productData = {
                    name: document.getElementById('productName').value,
                    category: document.getElementById('productCategory').value,
                    ciGenericName: document.getElementById('productCiGenericName').value,
                    casNumber: document.getElementById('productCasNumber').value,
                    colorShade: document.getElementById('productColorShade').value
                };

                // Validate required fields
                if (!productData.name || !productData.category || !productData.ciGenericName ||
                    !productData.casNumber || !productData.colorShade) {
                    alert('Please fill in all required fields.');
                    return;
                }

                if (editId) {
                    // Update existing product
                    const productIndex = products.findIndex(p => p.id === parseInt(editId));
                    if (productIndex > -1) {
                        products[productIndex] = { ...products[productIndex], ...productData };

                        // Update filtered products
                        if (currentSearchTerm) {
                            filterProducts(currentSearchTerm);
                        } else {
                            filteredProducts = [...products];
                            loadProductsTable();
                            updateSearchResults();
                        }

                        showNotification('Product updated successfully!', 'success');
                    }
                } else {
                    // Add new product
                    addProduct(productData);
                    showNotification('Product added successfully!', 'success');
                }

                // Reset form and close modal
                form.reset();
                document.getElementById('productColorShade').value = '#FFFFFF';
                document.getElementById('colorPreview').style.backgroundColor = '#FFFFFF';
                document.getElementById('colorHexInput').value = '#FFFFFF';

                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
                if (modal) {
                    modal.hide();
                }
            } else {
                form.reportValidity();
            }
        });
    }
}

// Simple notification function
function showNotification(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 3000);
}

// Edit and delete functions
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        // First set the edit ID to prevent form clearing
        document.getElementById('saveProductBtn').dataset.editId = id;

        // Populate form with product data
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productCiGenericName').value = product.ciGenericName;
        document.getElementById('productCasNumber').value = product.casNumber;
        document.getElementById('productColorShade').value = product.colorShade;
        document.getElementById('colorPreview').style.backgroundColor = product.colorShade;
        document.getElementById('colorHexInput').value = product.colorShade;

        // Change modal title and button text
        document.querySelector('#addProductModal .modal-title').textContent = 'Edit Product';
        document.getElementById('saveProductBtn').innerHTML = '<i class="bi bi-check-circle me-2"></i>Update Product';

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('addProductModal'));
        modal.show();
    }
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        const index = products.findIndex(p => p.id === id);
        if (index > -1) {
            products.splice(index, 1);

            // Update filtered products
            if (currentSearchTerm) {
                filterProducts(currentSearchTerm);
            } else {
                filteredProducts = [...products];
                loadProductsTable();
                updateSearchResults();
            }

            showNotification('Product deleted successfully!', 'success');
        }
    }
}

// Function to clear/reset the form to default values
function clearForm() {
    const form = document.getElementById('addProductForm');
    if (form) {
        form.reset();

        // Reset all form fields to default values
        document.getElementById('productName').value = '';
        document.getElementById('productCategory').value = '';
        document.getElementById('productCiGenericName').value = '';
        document.getElementById('productCasNumber').value = '';
        document.getElementById('productColorShade').value = '#FFFFFF';
        document.getElementById('colorPreview').style.backgroundColor = '#FFFFFF';
        document.getElementById('colorHexInput').value = '#FFFFFF';

        // Reset modal title and button
        document.querySelector('#addProductModal .modal-title').textContent = 'Add New Product';
        document.getElementById('saveProductBtn').innerHTML = '<i class="bi bi-check-circle me-2"></i>Save Product';
        delete document.getElementById('saveProductBtn').dataset.editId;
    }
}

// Reset modal when it's closed
function resetModal() {
    clearForm();
}

// Load table and setup handlers when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    loadProductsTable();
    setupFormHandlers();
    setupSearchHandlers();
    updateSearchResults();

    // Reset modal when hidden
    const modal = document.getElementById('addProductModal');
    if (modal) {
        modal.addEventListener('hidden.bs.modal', resetModal);

        // Clear form when modal is shown (for "Add New Product" button)
        modal.addEventListener('show.bs.modal', function (event) {
            // Only clear form if it's not triggered by edit button
            const saveBtn = document.getElementById('saveProductBtn');
            if (!saveBtn.dataset.editId) {
                clearForm();
            }
        });
    }

    // Add event listener to "Add New Product" button
    const addProductBtn = document.querySelector('[data-bs-target="#addProductModal"]');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function () {
            clearForm();
        });
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}