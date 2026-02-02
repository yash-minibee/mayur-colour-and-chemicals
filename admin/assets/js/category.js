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
        showNotification("Category name required", "warning");
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
        .then(() => {
            loadCategories();
            bootstrap.Modal.getInstance(
                document.getElementById("addCategoryModal")
            ).hide();
            showNotification("Category saved successfully", "success");
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
        .then(res => res.json())
        .then(() => {
            loadCategories();
            bootstrap.Modal.getInstance(
                document.getElementById("deleteCategoryModal")
            ).hide();
            showNotification("Category deleted", "success");
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
function updateCategoryStats() {
    const el = document.getElementById("totalCategories");
    if (el) el.textContent = categories.length;
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

function showNotification(msg, type = "info") {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
    alert.style.zIndex = 9999;
    alert.textContent = msg;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
}

/* ===============================
   EVENTS
================================ */
function initializeCategoryEventListeners() {
    document.getElementById("saveCategoryBtn")?.addEventListener("click", handleSaveCategory);
    document.getElementById("confirmDeleteBtn")?.addEventListener("click", handleDeleteCategory);
}