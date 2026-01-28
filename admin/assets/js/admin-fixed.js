// Mayur Colour Admin Panel JavaScript - FIXED VERSION
console.log('Loading admin-fixed.js');

// Initialize tooltips function
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Update current date function
function updateCurrentDate() {
    const currentDateEl = document.getElementById('currentDate');
    if (currentDateEl) {
        const now = new Date();
        currentDateEl.textContent = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Admin Product Data Array
const adminProducts = [
    {
        id: 1,
        serialNumber: "SN-001",
        name: "Titanium Dioxide White",
        colorShade: "#FFFFFF",
        ciGenericName: "Titanium Dioxide",
        casNumber: "13463-67-7"
    },
    {
        id: 2,
        serialNumber: "SN-002",
        name: "Iron Oxide Red",
        colorShade: "#CD5C5C",
        ciGenericName: "Iron Oxide Red",
        casNumber: "1309-37-1"
    },
    {
        id: 3,
        serialNumber: "SN-003",
        name: "Chrome Green Oxide",
        colorShade: "#228B22",
        ciGenericName: "Chromium Oxide Green",
        casNumber: "1308-38-9"
    },
    {
        id: 4,
        serialNumber: "SN-004",
        name: "Ultramarine Blue",
        colorShade: "#4169E1",
        ciGenericName: "Ultramarine Blue",
        casNumber: "57455-37-5"
    },
    {
        id: 5,
        serialNumber: "SN-005",
        name: "Carbon Black",
        colorShade: "#000000",
        ciGenericName: "Carbon Black",
        casNumber: "1333-86-4"
    },
    {
        id: 6,
        serialNumber: "SN-006",
        name: "Yellow Iron Oxide",
        colorShade: "#FFD700",
        ciGenericName: "Iron Oxide Yellow",
        casNumber: "51274-00-1"
    },
    {
        id: 7,
        serialNumber: "SN-007",
        name: "Reactive Red 195",
        colorShade: "#DC143C",
        ciGenericName: "Reactive Red",
        casNumber: "17095-24-8"
    },
    {
        id: 8,
        serialNumber: "SN-008",
        name: "Direct Blue 199",
        colorShade: "#0000FF",
        ciGenericName: "Direct Blue",
        casNumber: "2602-46-2"
    },
    {
        id: 9,
        serialNumber: "SN-009",
        name: "Acid Yellow 23",
        colorShade: "#FFFF00",
        ciGenericName: "Acid Yellow",
        casNumber: "1934-21-0"
    },
    {
        id: 10,
        serialNumber: "SN-010",
        name: "Disperse Orange 30",
        colorShade: "#FF8C00",
        ciGenericName: "Disperse Orange",
        casNumber: "5261-31-4"
    },
    {
        id: 11,
        serialNumber: "SN-011",
        name: "Red Masterbatch",
        colorShade: "#FF0000",
        ciGenericName: "Red Color Masterbatch",
        casNumber: "MB-RED-001"
    },
    {
        id: 12,
        serialNumber: "SN-012",
        name: "Blue Masterbatch",
        colorShade: "#0066CC",
        ciGenericName: "Blue Color Masterbatch",
        casNumber: "MB-BLUE-001"
    },
    {
        id: 13,
        serialNumber: "SN-013",
        name: "Green Masterbatch",
        colorShade: "#00AA00",
        ciGenericName: "Green Color Masterbatch",
        casNumber: "MB-GREEN-001"
    },
    {
        id: 14,
        serialNumber: "SN-014",
        name: "Pearl Luster Silver",
        colorShade: "#C0C0C0",
        ciGenericName: "Mica Based Pearl Pigment",
        casNumber: "12001-26-2"
    },
    {
        id: 15,
        serialNumber: "SN-015",
        name: "Metallic Gold",
        colorShade: "#FFD700",
        ciGenericName: "Bronze Powder",
        casNumber: "7440-50-8"
    }
];

// Global variables
let currentPage = 1;
let itemsPerPage = 10;
let filteredProducts = [...adminProducts];

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing admin panel...');
    console.log('Products data available:', adminProducts.length, 'products');
    
    try {
        // Check if we're on products page
        const tableBody = document.getElementById('productsTableBody');
        if (tableBody) {
            console.log('Products page detected, table body found, initializing...');
            initializeProductsPage();
        } else {
            console.log('Not on products page or table body not found');
        }
        
        // Check if we're on dashboard page
        const currentDateEl = document.getElementById('currentDate');
        if (currentDateEl) {
            console.log('Dashboard page detected, initializing...');
            initializeDashboardPage();
        }
        
        // Initialize sidebar
        initializeSidebar();
        
        // Initialize tooltips
        initializeTooltips();
        
        console.log('Admin panel initialized successfully');
    } catch (error) {
        console.error('Error initializing admin panel:', error);
        // Show error message to user
        const tableBody = document.getElementById('productsTableBody');
        if (tableBody) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-5">
                        <i class="bi bi-exclamation-triangle text-danger" style="font-size: 3rem;"></i>
                        <h5 class="text-danger mt-3">Error Loading Products</h5>
                        <p class="text-muted">${error.message}</p>
                        <button class="btn btn-outline-primary" onclick="location.reload()">Reload Page</button>
                    </td>
                </tr>
            `;
        }
    }
});

// Initialize dashboard page
function initializeDashboardPage() {
    console.log('Starting dashboard page initialization...');
    
    try {
        // Update current date
        updateCurrentDate();
        
        // Initialize shade swatch hover effects
        initializeShadeSwatchHoverEffects();
        
        console.log('Dashboard page initialization completed');
    } catch (error) {
        console.error('Error in initializeDashboardPage:', error);
    }
}

// Initialize shade swatch hover effects
function initializeShadeSwatchHoverEffects() {
    // Add hover effects to shade swatches on dashboard
    document.querySelectorAll('.shade-swatch').forEach(swatch => {
        swatch.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        swatch.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize products page
function initializeProductsPage() {
    console.log('Starting products page initialization...');
    
    try {
        // Initialize data
        filteredProducts = [...adminProducts];
        console.log('Products data initialized:', filteredProducts.length, 'products');
        
        // Render products
        renderProducts();
        
        // Initialize pagination
        initializePagination();
        
        // Initialize search
        initializeSearch();
        
        // Initialize buttons
        initializeButtons();
        
        console.log('Products page initialization completed');
    } catch (error) {
        console.error('Error in initializeProductsPage:', error);
    }
}

// Render products in table
function renderProducts() {
    console.log('Rendering products...');
    
    const tableBody = document.getElementById('productsTableBody');
    if (!tableBody) {
        console.error('Products table body not found');
        return;
    }
    
    // Clear existing content
    tableBody.innerHTML = '';
    
    if (!filteredProducts || filteredProducts.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-5" style="padding: 3rem 1rem;">
                    <i class="bi bi-palette" style="font-size: 3rem; color: #9ca3af; margin-bottom: 1rem; display: block;"></i>
                    <h5 style="color: #6b7280; margin-bottom: 0.5rem; font-weight: 500;">No products found</h5>
                    <p style="color: #9ca3af; margin-bottom: 0; font-size: 0.9rem;">Try adjusting your search criteria.</p>
                </td>
            </tr>
        `;
        updatePaginationInfo(0, 0, 0);
        return;
    }
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    console.log(`Rendering ${paginatedProducts.length} products (${startIndex + 1}-${Math.min(endIndex, filteredProducts.length)} of ${filteredProducts.length})`);
    
    // Create rows
    paginatedProducts.forEach((product, index) => {
        const row = createProductRow(product, index);
        tableBody.appendChild(row);
    });
    
    // Update pagination
    updatePaginationControls();
    updatePaginationInfo(startIndex + 1, Math.min(endIndex, filteredProducts.length), filteredProducts.length);
    
    console.log('Products rendered successfully');
}

// Create product row
function createProductRow(product, index) {
    const row = document.createElement('tr');
    row.className = 'product-row';
    
    row.innerHTML = `
        <td class="ps-4">
            <span class="fw-semibold" style="color: #0891b2; font-family: monospace; font-weight: 600;">${product.serialNumber}</span>
        </td>
        <td>
            <div>
                <h6 class="mb-1" style="color: #1e293b; font-weight: 600; margin-bottom: 0.25rem;">${product.name}</h6>
                <small style="color: #64748b; font-size: 0.8rem;">ID: ${product.id}</small>
            </div>
        </td>
        <td>
            <div class="d-flex align-items-center">
                <div class="me-3" style="width: 30px; height: 30px; background-color: ${product.colorShade}; border-radius: 6px; border: 2px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>
                <span style="color: #374151; font-family: monospace; font-size: 0.85rem; font-weight: 500;">${product.colorShade}</span>
            </div>
        </td>
        <td>
            <span style="color: #374151; font-size: 0.9rem;">${product.ciGenericName}</span>
        </td>
        <td>
            <span style="color: #374151; font-family: monospace; font-size: 0.85rem;">${product.casNumber}</span>
        </td>
        <td class="text-center">
            <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-primary btn-sm" onclick="viewProduct(${product.id})" title="View" style="color: #0891b2; border-color: #0891b2;">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-outline-secondary btn-sm" onclick="editProduct(${product.id})" title="Edit" style="color: #64748b; border-color: #64748b;">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-outline-info btn-sm" onclick="duplicateProduct(${product.id})" title="Duplicate" style="color: #06b6d4; border-color: #06b6d4;">
                    <i class="bi bi-files"></i>
                </button>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${product.id})" title="Delete" style="color: #ef4444; border-color: #ef4444;">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

// Initialize pagination
function initializePagination() {
    const itemsPerPageSelect = document.getElementById('itemsPerPage');
    if (itemsPerPageSelect) {
        itemsPerPageSelect.addEventListener('change', function() {
            itemsPerPage = parseInt(this.value);
            currentPage = 1;
            renderProducts();
        });
    }
}

// Update pagination controls
function updatePaginationControls() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginationControls = document.getElementById('paginationControls');
    
    if (!paginationControls) return;
    
    paginationControls.innerHTML = '';
    
    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">Previous</a>`;
    paginationControls.appendChild(prevLi);
    
    // Page numbers (simplified)
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        const pageLi = document.createElement('li');
        pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>`;
        paginationControls.appendChild(pageLi);
    }
    
    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">Next</a>`;
    paginationControls.appendChild(nextLi);
}

// Update pagination info
function updatePaginationInfo(start, end, total) {
    const paginationInfo = document.getElementById('paginationInfo');
    if (paginationInfo) {
        if (total === 0) {
            paginationInfo.textContent = 'No entries';
        } else {
            paginationInfo.textContent = `Showing ${start} to ${end} of ${total} entries`;
        }
    }
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderProducts();
}

// Initialize search
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                applySearch(this.value);
            }, 300);
        });
    }
}

// Apply search filter
function applySearch(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    if (term === '') {
        filteredProducts = [...adminProducts];
    } else {
        filteredProducts = adminProducts.filter(product => 
            product.name.toLowerCase().includes(term) ||
            product.serialNumber.toLowerCase().includes(term) ||
            product.ciGenericName.toLowerCase().includes(term) ||
            product.casNumber.toLowerCase().includes(term)
        );
    }
    
    currentPage = 1;
    renderProducts();
}

// Initialize buttons
function initializeButtons() {
    // Reset button
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.value = '';
            
            filteredProducts = [...adminProducts];
            currentPage = 1;
            renderProducts();
            
            showNotification('Filters reset successfully', 'info');
        });
    }
    
    // Export button
    const exportBtn = document.getElementById('exportProducts');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            exportProducts();
        });
    }
}

// Export products to CSV
function exportProducts() {
    const csvContent = "data:text/csv;charset=utf-8,"
        + "Serial Number,Product Name,Color Shade,CI Generic Name,CAS Number\n"
        + adminProducts.map(p =>
            `"${p.serialNumber}","${p.name}","${p.colorShade}","${p.ciGenericName}","${p.casNumber}"`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Products exported successfully!', 'success');
}

// Product action functions
function viewProduct(productId) {
    const product = adminProducts.find(p => p.id === productId);
    if (product) {
        showNotification(`Viewing product: ${product.name}`, 'info');
    }
}

function editProduct(productId) {
    const product = adminProducts.find(p => p.id === productId);
    if (product) {
        showNotification(`Edit functionality for: ${product.name}`, 'info');
    }
}

function duplicateProduct(productId) {
    const product = adminProducts.find(p => p.id === productId);
    if (product) {
        showNotification(`Duplicate functionality for: ${product.name}`, 'info');
    }
}

function deleteProduct(productId) {
    const product = adminProducts.find(p => p.id === productId);
    if (product && confirm(`Delete "${product.name}"?`)) {
        const index = adminProducts.findIndex(p => p.id === productId);
        if (index > -1) {
            adminProducts.splice(index, 1);
            applySearch(document.getElementById('searchInput')?.value || '');
            showNotification(`Product "${product.name}" deleted successfully`, 'success');
        }
    }
}

// Enhanced sidebar toggle with mobile support
function initializeSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (sidebarToggle && sidebar) {
        // Toggle sidebar on button click
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            sidebar.classList.toggle('show');
            
            // Show/hide overlay on mobile
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle('show');
            }
        });
        
        // Close sidebar when clicking overlay
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', function() {
                sidebar.classList.remove('show');
                sidebarOverlay.classList.remove('show');
            });
        }
        
        // Close sidebar on window resize if mobile
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('show');
                if (sidebarOverlay) {
                    sidebarOverlay.classList.remove('show');
                }
            }
        });
        
        // Close sidebar when clicking on navigation links on mobile
        const navLinks = sidebar.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('show');
                    if (sidebarOverlay) {
                        sidebarOverlay.classList.remove('show');
                    }
                }
            });
        });
    }
}

// Simple notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-radius: 8px;
    `;
    
    const iconMap = {
        'success': 'check-circle',
        'danger': 'exclamation-triangle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${iconMap[type] || 'info-circle'} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

console.log('Admin-fixed.js loaded successfully');