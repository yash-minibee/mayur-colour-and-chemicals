// Category Management JavaScript - Mayur Colour Admin (SQLite3 Connected)

let categories = [];
let filteredCategories = [];
let currentEditingId = null;

const API_URL = "categoryApi.php";

/* ===============================
   INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    initializeCategoryEventListeners();
    initializeCategoryFilters();
    
    // Auto-refresh every 5 minutes
    setInterval(() => {
        updateCategoryStats();
    }, 300000);
});

/* ===============================
   LOAD DATA FROM DB
================================ */
function loadCategories() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            categories = data;
            filteredCategories = [...categories];
            renderCategories();
            updateCategoryStats();
        })
        .catch(err => {
            console.error(err);
            showNotification("Failed to load categories", "danger");
        });
}

// Function to refresh all category data
function refreshCategoryData() {
    // Show loading state
    const categoriesEl = document.getElementById("totalCategories");
    const productsEl = document.getElementById("totalProducts");
    
    if (categoriesEl) categoriesEl.textContent = '...';
    if (productsEl) productsEl.textContent = '...';
    
    // Reload categories (which will also update stats)
    loadCategories();
    
    // Show notification
    showNotification("Data refreshed successfully", "success");
}

// Make refresh function globally available
window.refreshCategoryData = refreshCategoryData;

/* ===============================
   RENDER TABLE
================================ */
function renderCategories() {
    const tbody = document.getElementById("categoriesTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (!filteredCategories.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-5 text-muted">
                    No categories found
                </td>
            </tr>`;
        return;
    }

    filteredCategories.forEach(cat => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="ps-4">
                <div class="d-flex align-items-center">
                    <div class="stats-icon bg-primary me-3" style="width:35px;height:35px">
                        <i class="bi ${cat.category_icon || 'bi-tag'} text-white"></i>
                    </div>
                    <div>
                        <strong>${cat.category_name}</strong><br>
                        <small class="text-muted">ID: ${cat.category_id}</small>
                    </div>
                </div>
            </td>
            <td class="d-none d-md-table-cell text-muted">
                ${cat.category_description || ''}
            </td>
            <td class="d-none d-lg-table-cell">
                ${formatDate(cat.created_at)}
            </td>
            <td class="d-none d-lg-table-cell">
                ${formatDate(cat.updated_at)}
            </td>
            <td class="text-center">
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-secondary" onclick="editCategory(${cat.category_id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="confirmDeleteCategory(${cat.category_id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

/* ===============================
   ADD / EDIT
================================ */
function openAddCategoryModal() {
    currentEditingId = null;
    document.getElementById("modalTitle").textContent = "Add New Category";
    document.getElementById("categoryForm").reset();
}

function editCategory(id) {
    const cat = categories.find(c => c.category_id === id);
    if (!cat) return;

    currentEditingId = id;
    document.getElementById("modalTitle").textContent = "Edit Category";
    document.getElementById("categoryName").value = cat.category_name;
    document.getElementById("categoryDescription").value = cat.category_description;

    document.querySelectorAll('input[name="categoryIcon"]').forEach(r => {
        r.checked = r.value === cat.category_icon;
    });

    new bootstrap.Modal(document.getElementById("addCategoryModal")).show();
}

function handleSaveCategory() {
    const name = document.getElementById("categoryName").value.trim();
    const description = document.getElementById("categoryDescription").value.trim();
    const icon =
        document.querySelector('input[name="categoryIcon"]:checked')?.value || "bi-tag";

    if (!name) {
        showNotification("Category name is required", "warning");
        return;
    }

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: currentEditingId,
            name,
            description,
            icon
        })
    })
        .then(res => res.json())
        .then(data => {
            loadCategories();
            bootstrap.Modal.getInstance(
                document.getElementById("addCategoryModal")
            ).hide();

            showNotification(
                data.message || "Category saved successfully",
                "success"
            );
        })
        .catch(() => {
            showNotification("Failed to save category", "danger");
        });
}


/* ===============================
   DELETE
================================ */
function confirmDeleteCategory(id) {
    currentEditingId = id;
    const cat = categories.find(c => c.category_id === id);
    document.getElementById("deleteCategoryName").textContent =
        cat?.category_name || "";
    new bootstrap.Modal(document.getElementById("deleteCategoryModal")).show();
}

function handleDeleteCategory() {
    fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: currentEditingId })
    })
        .then(async res => {
            const data = await res.json();

            if (!res.ok) {
                throw data;
            }

            return data;
        })
        .then(data => {
            loadCategories();
            bootstrap.Modal.getInstance(
                document.getElementById("deleteCategoryModal")
            ).hide();

            showNotification(
                data.message || "Category deleted successfully",
                "success"
            );
        })
        .catch(err => {
            showNotification(
                err.message || "Unable to delete category",
                "danger"
            );
        });
}


/* ===============================
   FILTERS
================================ */
function initializeCategoryFilters() {
    document.getElementById("searchInput")?.addEventListener("input", applyCategoryFilters);
}

function applyCategoryFilters() {
    const search = document.getElementById("searchInput").value.toLowerCase();

    filteredCategories = categories.filter(c =>
        c.category_name.toLowerCase().includes(search) ||
        (c.category_description || "").toLowerCase().includes(search)
    );

    renderCategories();
}

/* ===============================
   STATS
================================ */
async function updateCategoryStats() {
    // Update total categories
    const categoriesEl = document.getElementById("totalCategories");
    if (categoriesEl) {
        categoriesEl.textContent = categories.length;
    }
    
    // Update total products dynamically
    try {
        const response = await fetch('productApi.php');
        if (response.ok) {
            const products = await response.json();
            const productsEl = document.getElementById("totalProducts");
            if (productsEl) {
                // Animate the counter
                animateCounter(productsEl, products.length);
            }
        } else {
            console.error('Failed to fetch products data');
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        // Show error state with retry option
        const productsEl = document.getElementById("totalProducts");
        if (productsEl) {
            productsEl.innerHTML = `
                <span class="text-danger" style="font-size: 0.8rem; cursor: pointer;" onclick="updateCategoryStats()" title="Click to retry">
                    Error <i class="bi bi-arrow-clockwise"></i>
                </span>
            `;
        }
    }
}

// Function to animate counter (similar to dashboard)
function animateCounter(element, targetValue) {
    const duration = 1000; // 1 second
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

/* ===============================
   UTIL
================================ */
function formatDate(date) {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function showNotification(message, type = "info") {
    const toastEl = document.getElementById("notificationToast");
    const toastBody = toastEl.querySelector(".toast-body");

    const icons = {
        success: "bi-check-circle-fill",
        danger: "bi-x-circle-fill",
        warning: "bi-exclamation-triangle-fill",
        info: "bi-info-circle-fill"
    };

    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    toastBody.innerHTML = `
        <i class="bi ${icons[type] || icons.info} me-2"></i>
        ${message}
    `;

    const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
    toast.show();
}


/* ===============================
   EVENTS
================================ */
function initializeCategoryEventListeners() {
    document.getElementById("saveCategoryBtn")?.addEventListener("click", handleSaveCategory);
    document.getElementById("confirmDeleteBtn")?.addEventListener("click", handleDeleteCategory);
}