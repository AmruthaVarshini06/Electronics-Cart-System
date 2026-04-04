// ===== API HELPER =====
const API = 'http://localhost:5000/api';

async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}

// ===== TOAST =====
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ===== AUTH STATE =====
function getUser() {
  try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
}
function getToken() { return localStorage.getItem('token'); }
function isLoggedIn() { return !!getToken(); }
function isAdmin() { const u = getUser(); return u && u.role === 'admin'; }
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/index.html';
}

// ===== CART COUNT =====
async function updateCartCount() {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  if (!isLoggedIn()) { badge.textContent = '0'; return; }
  try {
    const cart = await apiFetch('/cart');
    const total = cart.reduce((s, i) => s + i.quantity, 0);
    badge.textContent = total;
  } catch { badge.textContent = '0'; }
}

// ===== FORMAT CURRENCY =====
function formatPrice(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}

// ===== STARS =====
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// ===== DISCOUNT =====
function calcDiscount(price, original) {
  if (!original || original <= price) return 0;
  return Math.round((1 - price / original) * 100);
}

// ===== NAVBAR SETUP =====
function setupNavbar() {
  const user = getUser();
  const authLinks = document.getElementById('auth-links');
  if (!authLinks) return;
  if (user) {
    authLinks.innerHTML = `
      <span style="color:rgba(255,255,255,0.7);font-size:0.85rem;">Hi, ${user.name.split(' ')[0]}</span>
      ${user.role === 'admin' ? `<a href="/admin/dashboard.html" class="nav-links">⚙️ Admin</a>` : ''}
      <a href="/orders.html" class="nav-links">📦 Orders</a>
      <button onclick="logout()" class="nav-btn" style="color:rgba(255,255,255,0.7);">Logout</button>
    `;
  } else {
    authLinks.innerHTML = `
      <a href="/login.html" class="nav-btn">Login</a>
      <a href="/signup.html" class="nav-btn nav-btn-primary">Sign Up</a>
    `;
  }
  updateCartCount();
}

// ===== SEARCH =====
function setupSearch() {
  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');
  if (searchBtn && searchInput) {
    const doSearch = () => {
      const q = searchInput.value.trim();
      if (q) window.location.href = `/index.html?search=${encodeURIComponent(q)}`;
    };
    searchBtn.addEventListener('click', doSearch);
    searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') doSearch(); });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavbar();
  setupSearch();
});
