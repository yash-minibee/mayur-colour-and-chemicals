const PRODUCT_API = 'productApi.php';
const CATEGORY_API = 'categoryApi.php';

/* ===============================
   GLOBAL STATE
================================ */
let products = [];
let filteredProducts = [];
let currentSearch = '';

/* ===============================
   DOM ELEMENTS
================================ */
const addProductModalEl = document.getElementById('addProductModal');
const addProductModal = new bootstrap.Modal(addProductModalEl);

const saveProductBtn = document.getElementById('saveProductBtn');
const modalTitle = document.getElementById('productModalTitle');
const productForm = document.getElementById('addProductForm');

const productName = document.getElementById('productName');
const productCategory = document.getElementById('productCategory');
const productCiGenericName = document.getElementById('productCiGenericName');
const productCasNumber = document.getElementById('productCasNumber');
const productColorShade = document.getElementById('productColorShade');
const colorHexInput = document.getElementById('colorHexInput');

const paginationInfo = document.getElementById('paginationInfo');

/* ===============================
   HEX VALIDATION
================================ */
function isValidHex(hex) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
}

/* ===============================
   COLOR SYNC
================================ */
// Color picker → Hex input
productColorShade.addEventListener('input', () => {
    colorHexInput.value = productColorShade.value.toUpperCase();
});

// Hex input → Color picker
colorHexInput.addEventListener('input', () => {
    let val = colorHexInput.value.trim();

    if (val[0] !== '#') {
        val = '#' + val;
    }

    if (isValidHex(val)) {
        productColorShade.value = val;
        colorHexInput.value = val.toUpperCase();
    }
});

/* ===============================
   LOAD CATEGORIES
================================ */
function loadCategories() {
    fetch(CATEGORY_API)
        .then(res => res.json())
        .then(data => {
            productCategory.innerHTML = '<option value="">Select Category</option>';
            data.forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat.category_id;
                opt.textContent = cat.category_name;
                productCategory.appendChild(opt);
            });
        });
}

/* ===============================
   LOAD PRODUCTS
================================ */
function loadProducts() {
    fetch(PRODUCT_API)
        .then(res => res.json())
        .then(data => {
            products = data || [];
            filteredProducts = [...products];
            renderProducts();
            updateSearchResults();
        });
}

/* ===============================
   RENDER PRODUCTS
================================ */
function renderProducts() {
    const tbody = document.getElementById('productsTableBody');
    const mobile = document.getElementById('mobileProductsContainer');

    tbody.innerHTML = '';
    mobile.innerHTML = '';

    if (!filteredProducts.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-muted py-4">
                    No products found
                </td>
            </tr>`;
        return;
    }

    filteredProducts.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td class="ps-4">${p.product_id}</td>
                <td>${p.product_name}</td>
                <td><span class="badge bg-secondary">${p.category_name}</span></td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <div style="width:30px;height:20px;background:${p.shade_code};border:1px solid #ccc"></div>
                        <span class="font-monospace d-none d-lg-inline">${p.shade_code}</span>
                    </div>
                </td>
                <td class="d-none d-lg-table-cell">${p.ci_generic_name || '-'}</td>
                <td class="d-none d-xl-table-cell">${p.cas_no || '-'}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary" onclick="editProduct(${p.product_id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${p.product_id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>`;
    });
}

/* ===============================
   SEARCH
================================ */
document.getElementById('searchInput').addEventListener('input', e => {
    currentSearch = e.target.value.toLowerCase();
    filteredProducts = products.filter(p =>
        p.product_name.toLowerCase().includes(currentSearch) ||
        p.category_name.toLowerCase().includes(currentSearch)
    );
    renderProducts();
    updateSearchResults();
});

/* ===============================
   OPEN ADD MODAL
================================ */
function openAddProductModal() {

    productForm.reset();
    saveProductBtn.dataset.editId = '';

    productColorShade.value = '#FFFFFF';
    colorHexInput.value = '#FFFFFF';

    modalTitle.textContent = 'Add New Product';
    saveProductBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Save Product';

    addProductModal.show();
}

/* ===============================
   EDIT PRODUCT
================================ */
function editProduct(id) {

    const p = products.find(x => x.product_id === id);
    if (!p) return;

    saveProductBtn.dataset.editId = id;

    productName.value = p.product_name;
    productCategory.value = String(p.category_id);
    productCiGenericName.value = p.ci_generic_name || '';
    productCasNumber.value = p.cas_no || '';
    productColorShade.value = p.shade_code;
    colorHexInput.value = p.shade_code;

    modalTitle.textContent = 'Edit Product';
    saveProductBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Update Product';

    addProductModal.show();
}

/* ===============================
   SAVE PRODUCT (ADD / UPDATE)
================================ */
saveProductBtn.addEventListener('click', () => {

    const payload = {
        product_id: saveProductBtn.dataset.editId || null,
        product_name: productName.value.trim(),
        category_id: productCategory.value,
        ci_generic_name: productCiGenericName.value.trim(),
        cas_no: productCasNumber.value.trim(),
        shade_code: productColorShade.value
    };

    fetch(PRODUCT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).then(() => {
        addProductModal.hide();
        loadProducts();
        showNotification('Product saved successfully', 'success');
    });
});

/* ===============================
   DELETE PRODUCT
================================ */
function deleteProduct(id) {
    if (!confirm('Delete this product?')) return;

    fetch(PRODUCT_API, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: id })
    }).then(() => {
        loadProducts();
        showNotification('Product deleted', 'success');
    });
}

/* ===============================
   HELPERS
================================ */
function updateSearchResults() {
    paginationInfo.textContent = `Showing ${filteredProducts.length} products`;
}

function showNotification(msg, type) {
    const div = document.createElement('div');
    div.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
    div.innerText = msg;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

/* ===============================
   CLEANUP ON MODAL CLOSE
================================ */
addProductModalEl.addEventListener('hidden.bs.modal', () => {
    productForm.reset();
    saveProductBtn.dataset.editId = '';
    productColorShade.value = '#FFFFFF';
    colorHexInput.value = '#FFFFFF';
});

/* ===============================
   INIT
================================ */
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadProducts();
});
