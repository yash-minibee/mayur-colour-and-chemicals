// Category Management JavaScript - Mayur Colour Admin

// Categories Data Array
let categories = [
    {
        id: 1,
        name: "Pigments",
        description: "High-quality color pigments for various industrial applications and paint formulations. These include organic and inorganic pigments suitable for different manufacturing processes.",
        icon: "bi-palette",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
        productCount: 89
    },
    {
        id: 2,
        name: "Dyes",
        description: "Soluble colorants for textile, paper, and liquid applications with excellent color fastness. Perfect for industries requiring vibrant and long-lasting colors.",
        icon: "bi-droplet",
        createdAt: "2024-01-20",
        updatedAt: "2024-01-25",
        productCount: 67
    },
    {
        id: 3,
        name: "Masterbatch",
        description: "Concentrated color additives for plastic manufacturing and polymer processing applications. Designed for easy mixing and consistent color distribution.",
        icon: "bi-circle-fill",
        createdAt: "2024-01-25",
        updatedAt: "2024-01-30",
        productCount: 45
    },
    {
        id: 4,
        name: "Specialty",
        description: "Specialized color products including metallic pigments, pearl effects, and fluorescent colors for unique applications and premium finishes.",
        icon: "bi-star",
        createdAt: "2024-02-01",
        updatedAt: "2024-02-05",
        productCount: 47
    }
];

// Global variables
let currentEditingId = null;
let filteredCategories = [...categories];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeCategoryPage();
});

// Initialize category page
function initializeCategoryPage() {
    console.log('Initializing category management page...');

    // Render categories
    renderCategories();

    // Update statistics
    updateCategoryStats();

    // Initialize event listeners
    initializeCategoryEventListeners();

    // Initialize search and filters
    initializeCategoryFilters();
}

// Initialize event listeners
function initializeCategoryEventListeners() {
    // Save category button
    const saveCategoryBtn = document.getElementById('saveCategoryBtn');
    if (saveCategoryBtn) {
        saveCategoryBtn.addEventListener('click', handleSaveCategory);
    }

    // Delete confirmation button
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', handleDeleteCategory);
    }

    // Reset modal when closed
    const addCategoryModal = document.getElementById('addCategoryModal');
    if (addCategoryModal) {
        addCategoryModal.addEventListener('hidden.bs.modal', resetCategoryModal);
    }
}

// Initialize search and filters
function initializeCategoryFilters() {
    const searchInput = document.getElementById('searchInput');
    const sortBy = document.getElementById('sortBy');
    const resetFilters = document.getElementById('resetFilters');
    const exportCategories = document.getElementById('exportCategories');

    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function () {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(applyCategoryFilters, 300);
        });
    }

    if (sortBy) {
        sortBy.addEventListener('change', applyCategoryFilters);
    }

    if (resetFilters) {
        resetFilters.addEventListener('click', resetCategoryFilters);
    }

    if (exportCategories) {
        exportCategories.addEventListener('click', exportCategoriesData);
    }
}

// Render categories
function renderCategories() {
    const categoriesTableBody = document.getElementById('categoriesTableBody');
    if (!categoriesTableBody) return;

    categoriesTableBody.innerHTML = '';

    if (filteredCategories.length === 0) {
        categoriesTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-5">
                    <i class="bi bi-tags display-4 text-muted mb-3"></i>
                    <h5 class="text-muted">No categories found</h5>
                    <p class="text-muted mb-0">Create your first category to get started.</p>
                </td>
            </tr>
        `;
        return;
    }

    filteredCategories.forEach((category, index) => {
        const categoryRow = createCategoryRow(category, index);
        categoriesTableBody.appendChild(categoryRow);
    });

    // Trigger fade-in animation
    setTimeout(() => {
        document.querySelectorAll('.category-row').forEach(row => {
            row.classList.add('fade-in');
        });
    }, 100);
}

// Create category row for table
function createCategoryRow(category, index) {
    const row = document.createElement('tr');
    row.className = 'category-row';
    row.style.animationDelay = `${index * 0.1}s`;

    const iconClass = category.icon || getCategoryIcon(category.name.toLowerCase());
    const colorClass = getCategoryColor(category.name.toLowerCase());

    row.innerHTML = `
        <td class="ps-4">
            <div class="d-flex align-items-center">
                <div class="stats-icon ${colorClass} me-3" style="width: 35px; height: 35px; font-size: 0.9rem;">
                    <i class="bi ${iconClass} text-white"></i>
                </div>
                <div>
                    <h6 class="mb-1 fw-semibold">${category.name}</h6>
                    <small class="text-muted">ID: ${category.id}</small>
                </div>
            </div>
        </td>
        <td>
            <p class="mb-0 text-muted" style="font-size: 0.9rem; line-height: 1.4;">
                ${category.description.length > 80 ? category.description.substring(0, 80) + '...' : category.description}
            </p>
        </td>
        <td>
            <span class="text-muted">${formatDate(category.createdAt)}</span>
        </td>
        <td>
            <span class="text-muted">${formatDate(category.updatedAt)}</span>
        </td>
        <td class="text-center">
            <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-primary btn-sm" onclick="viewCategory(${category.id})" 
                        data-bs-toggle="tooltip" title="View Details">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-outline-secondary btn-sm" onclick="editCategory(${category.id})" 
                        data-bs-toggle="tooltip" title="Edit Category">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-outline-danger btn-sm" onclick="confirmDeleteCategory(${category.id})" 
                        data-bs-toggle="tooltip" title="Delete Category">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </td>
    `;

    return row;
}

// Helper functions for category cards
function getCategoryIcon(categoryName) {
    switch (categoryName) {
        case 'pigments': return 'bi-palette';
        case 'dyes': return 'bi-droplet';
        case 'masterbatch': return 'bi-circle-fill';
        case 'specialty': return 'bi-star';
        default: return 'bi-tag';
    }
}

function getCategoryColor(categoryName) {
    switch (categoryName) {
        case 'pigments': return 'bg-primary';
        case 'dyes': return 'bg-info';
        case 'masterbatch': return 'bg-warning';
        case 'specialty': return 'bg-success';
        default: return 'bg-secondary';
    }
}

function getDaysSinceUpdate(dateString) {
    const updateDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - updateDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Category action functions
function viewCategory(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
        showNotification(`Viewing category: ${category.name}`, 'info');
        // Here you could open a detailed view modal or navigate to a detail page
        console.log('Category details:', category);
    }
}

// Open Add Category Modal with cleared form
function openAddCategoryModal() {
    currentEditingId = null;
    
    // Clear and reset the form
    document.getElementById('modalTitle').textContent = 'Add New Category';
    document.getElementById('categoryForm').reset();
    document.getElementById('categoryId').value = '';
    document.getElementById('categoryName').value = '';
    document.getElementById('categoryDescription').value = '';
    
    // Reset to default icon (palette)
    const defaultIconRadio = document.querySelector('input[name="categoryIcon"][value="bi-palette"]');
    if (defaultIconRadio) {
        defaultIconRadio.checked = true;
    }
    
    // Reset save button text
    document.getElementById('saveCategoryBtn').innerHTML = '<i class="bi bi-check-circle me-2"></i>Save Category';
    
    console.log('Add Category Modal opened with cleared form');
}

function editCategory(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    if (!category) {
        showNotification('Category not found', 'error');
        return;
    }

    currentEditingId = categoryId;

    // Populate modal with category data
    document.getElementById('modalTitle').textContent = 'Edit Category';
    document.getElementById('categoryId').value = category.id;
    document.getElementById('categoryName').value = category.name;
    document.getElementById('categoryDescription').value = category.description;

    // Set the selected icon
    const selectedIcon = category.icon || getCategoryIcon(category.name.toLowerCase());
    
    // First, uncheck all radio buttons
    document.querySelectorAll('input[name="categoryIcon"]').forEach(radio => {
        radio.checked = false;
    });
    
    // Then check the correct one
    const iconRadio = document.querySelector(`input[name="categoryIcon"][value="${selectedIcon}"]`);
    if (iconRadio) {
        iconRadio.checked = true;
    } else {
        // Fallback to default if icon not found
        const defaultIconRadio = document.querySelector('input[name="categoryIcon"][value="bi-palette"]');
        if (defaultIconRadio) {
            defaultIconRadio.checked = true;
        }
    }

    // Update save button text
    document.getElementById('saveCategoryBtn').innerHTML = '<i class="bi bi-check-circle me-2"></i>Update Category';

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('addCategoryModal'));
    modal.show();
    
    console.log('Edit Category Modal opened with data:', category);
}

function confirmDeleteCategory(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    currentEditingId = categoryId;
    document.getElementById('deleteCategoryName').textContent = category.name;

    const modal = new bootstrap.Modal(document.getElementById('deleteCategoryModal'));
    modal.show();
}

// Handle save category
function handleSaveCategory() {
    const categoryName = document.getElementById('categoryName').value.trim();
    const categoryDescription = document.getElementById('categoryDescription').value.trim();
    const selectedIcon = document.querySelector('input[name="categoryIcon"]:checked')?.value || 'bi-palette';

    if (!categoryName || !categoryDescription) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }

    // Check for duplicate names (excluding current category if editing)
    const existingCategory = categories.find(c =>
        c.name.toLowerCase() === categoryName.toLowerCase() && c.id !== currentEditingId
    );

    if (existingCategory) {
        showNotification('Category name already exists. Please choose a different name.', 'warning');
        return;
    }

    const saveBtn = document.getElementById('saveCategoryBtn');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';
    saveBtn.disabled = true;

    setTimeout(() => {
        if (currentEditingId) {
            // Update existing category
            const categoryIndex = categories.findIndex(c => c.id === currentEditingId);
            if (categoryIndex > -1) {
                categories[categoryIndex] = {
                    ...categories[categoryIndex],
                    name: categoryName,
                    description: categoryDescription,
                    icon: selectedIcon,
                    updatedAt: new Date().toISOString().split('T')[0]
                };
                showNotification('Category updated successfully!', 'success');
            }
        } else {
            // Add new category
            const newCategory = {
                id: Math.max(...categories.map(c => c.id)) + 1,
                name: categoryName,
                description: categoryDescription,
                icon: selectedIcon,
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0],
                productCount: 0
            };
            categories.push(newCategory);
            showNotification('Category created successfully!', 'success');
        }

        // Refresh display
        applyCategoryFilters();
        updateCategoryStats();

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addCategoryModal'));
        if (modal) modal.hide();

        // Reset button
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
    }, 1500);
}

// Handle delete category
function handleDeleteCategory() {
    if (!currentEditingId) return;

    const confirmBtn = document.getElementById('confirmDeleteBtn');
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Deleting...';
    confirmBtn.disabled = true;

    setTimeout(() => {
        const categoryIndex = categories.findIndex(c => c.id === currentEditingId);
        if (categoryIndex > -1) {
            const deletedCategory = categories[categoryIndex];
            categories.splice(categoryIndex, 1);
            showNotification(`Category "${deletedCategory.name}" deleted successfully!`, 'success');

            // Refresh display
            applyCategoryFilters();
            updateCategoryStats();
        }

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteCategoryModal'));
        if (modal) modal.hide();

        // Reset button
        confirmBtn.innerHTML = originalText;
        confirmBtn.disabled = false;
        currentEditingId = null;
    }, 1000);
}

// Reset category modal
function resetCategoryModal() {
    currentEditingId = null;
    document.getElementById('modalTitle').textContent = 'Add New Category';
    document.getElementById('categoryForm').reset();
    document.getElementById('categoryId').value = '';
    document.getElementById('saveCategoryBtn').innerHTML = '<i class="bi bi-check-circle me-2"></i>Save Category';
    
    // Reset icon selection to default (palette)
    const defaultIconRadio = document.querySelector('input[name="categoryIcon"][value="bi-palette"]');
    if (defaultIconRadio) {
        defaultIconRadio.checked = true;
    }
}

// Apply category filters
function applyCategoryFilters() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const sortBy = document.getElementById('sortBy')?.value || 'name';

    // Filter categories
    filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm) ||
        category.description.toLowerCase().includes(searchTerm)
    );

    // Sort categories
    filteredCategories.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'name_desc':
                return b.name.localeCompare(a.name);
            case 'created':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'updated':
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            default:
                return 0;
        }
    });

    renderCategories();
}

// Reset category filters
function resetCategoryFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('sortBy').value = 'name';
    applyCategoryFilters();
    showNotification('Filters reset successfully', 'info');
}

// Export categories data
function exportCategoriesData() {
    const csvContent = "data:text/csv;charset=utf-8,"
        + "ID,Name,Description,Created Date,Updated Date,Product Count\n"
        + categories.map(c =>
            `${c.id},"${c.name}","${c.description}",${c.createdAt},${c.updatedAt},${c.productCount}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "categories_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Categories exported successfully!', 'success');
}

// Update category statistics
function updateCategoryStats() {
    document.getElementById('totalCategories').textContent = categories.length;
    document.getElementById('activeCategories').textContent = categories.length;
    document.getElementById('productsAssigned').textContent = categories.reduce((sum, c) => sum + c.productCount, 0);

    const recentlyUpdated = categories.filter(c => getDaysSinceUpdate(c.updatedAt) <= 7).length;
    document.getElementById('recentlyUpdated').textContent = recentlyUpdated;
}

// Notification system (reuse from admin.js if available, otherwise implement)
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
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
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${getNotificationIcon(type)} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'danger': return 'exclamation-triangle';
        case 'warning': return 'exclamation-triangle';
        case 'info': return 'info-circle';
        default: return 'info-circle';
    }
}