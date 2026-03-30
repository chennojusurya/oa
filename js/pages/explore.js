// ===================================
// EXPLORE PAGE SCRIPT
// Filtering, sorting, searching, pagination
// With AI thinking animation & certificate/category filters
// ===================================

import { renderNavbar, renderFooter, renderCourseCard, initRevealAnimations } from '../components/shared.js';
import { allCourses as courses, getUniquePlatforms, getUniqueCategories } from '../data/courses.js';
import { searchCourses, filterCourses } from '../utils/recommendations.js';
import { addSearchTerm } from '../utils/storage.js';

const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let filteredCourses = [...courses];

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('explore');
  renderFooter();

  populateFilters();
  setupEventListeners();

  // Check for search query from URL
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q) {
    document.getElementById('searchInput').value = q;
    addSearchTerm(q);
  }

  const hasQuery = document.getElementById('searchInput').value.trim();
  if (hasQuery) {
    applyFiltersWithThinking();
  } else {
    applyFilters();
  }
  initRevealAnimations();
});

function populateFilters() {
  // Platform filter
  const platformSelect = document.getElementById('filterPlatform');
  getUniquePlatforms().forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    platformSelect.appendChild(opt);
  });

  // Category filter
  const catSelect = document.getElementById('filterCategory');
  getUniqueCategories().forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    catSelect.appendChild(opt);
  });
}

function setupEventListeners() {
  const filterIds = ['filterDifficulty', 'filterPrice', 'filterPlatform', 'sortBy', 'filterCategory', 'filterCert'];
  filterIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', () => { currentPage = 1; applyFiltersWithThinking(); });
  });

  let searchTimeout;
  document.getElementById('searchInput').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentPage = 1;
      if (e.target.value.trim()) addSearchTerm(e.target.value.trim());
      applyFiltersWithThinking();
    }, 500);
  });
}

function applyFilters(showResults = true) {
  const searchQuery = document.getElementById('searchInput').value;
  const difficulty = document.getElementById('filterDifficulty').value;
  const priceType = document.getElementById('filterPrice').value;
  const platform = document.getElementById('filterPlatform').value;
  const sortBy = document.getElementById('sortBy').value;
  const category = document.getElementById('filterCategory').value;
  const certFilter = document.getElementById('filterCert').value;

  // Start with search
  let results = searchCourses(searchQuery);

  // Apply standard filters
  results = filterCourses(results, { difficulty, priceType, platform, sortBy });

  // Apply category filter
  if (category !== 'all') {
    results = results.filter(c => c.category === category);
  }

  // Apply certificate filter
  if (certFilter !== 'all') {
    results = results.filter(c => {
      const cert = (c.certType || '').toLowerCase();
      if (certFilter === 'free-cert') return cert.includes('free cert');
      if (certFilter === 'paid-cert') return cert.includes('paid cert');
      if (certFilter === 'no-cert') return cert.includes('no cert');
      return true;
    });
  }

  filteredCourses = results;

  renderActiveFilters({ difficulty, priceType, platform, category, certFilter });
  if (showResults) {
    renderResults();
    renderPagination();
  }
}

// Show AI thinking animation, then reveal results
function applyFiltersWithThinking() {
  const container = document.getElementById('courseGrid');
  const infoEl = document.getElementById('resultsInfo');
  const paginationEl = document.getElementById('pagination');

  paginationEl.innerHTML = '';
  infoEl.innerHTML = '';

  container.innerHTML = `
    <div class="thinking-overlay">
      <div class="thinking-brain">🧠</div>
      <div class="thinking-text">Searching across 1600+ courses...</div>
      <div class="thinking-subtext">Analyzing huge datasets from NPTEL, Coursera, Udemy, Kaggle, edX, YouTube, and 10+ more platforms</div>
      <div class="thinking-dots">
        <span></span><span></span><span></span>
      </div>
      <div class="thinking-progress">
        <div class="thinking-progress-bar"></div>
      </div>
    </div>
    <div class="shimmer-grid">
      ${Array(6).fill('').map(() => `
        <div class="shimmer-card">
          <div class="shimmer-card-image"></div>
          <div class="shimmer-card-body">
            <div class="shimmer-line w-90"></div>
            <div class="shimmer-line w-50"></div>
            <div class="shimmer-line w-75"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  applyFilters(false);

  setTimeout(() => {
    renderResults();
    renderPagination();
  }, 4000);
}

function renderActiveFilters({ difficulty, priceType, platform, category, certFilter }) {
  const container = document.getElementById('activeFilters');
  container.innerHTML = '';

  const filters = [];
  if (difficulty !== 'all') filters.push({ label: difficulty, type: 'difficulty' });
  if (priceType !== 'all') filters.push({ label: priceType === 'free' ? 'Free' : 'Paid', type: 'price' });
  if (platform !== 'all') filters.push({ label: platform, type: 'platform' });
  if (category !== 'all') filters.push({ label: category, type: 'category' });
  if (certFilter !== 'all') {
    const certLabels = {'free-cert':'Free Certificate','paid-cert':'Paid Certificate','no-cert':'No Certificate'};
    filters.push({ label: certLabels[certFilter] || certFilter, type: 'cert' });
  }

  filters.forEach(f => {
    const chip = document.createElement('span');
    chip.className = 'active-filter-chip';
    chip.innerHTML = `${f.label} <button data-type="${f.type}" aria-label="Remove filter">✕</button>`;
    chip.querySelector('button').addEventListener('click', () => {
      if (f.type === 'difficulty') document.getElementById('filterDifficulty').value = 'all';
      if (f.type === 'price') document.getElementById('filterPrice').value = 'all';
      if (f.type === 'platform') document.getElementById('filterPlatform').value = 'all';
      if (f.type === 'category') document.getElementById('filterCategory').value = 'all';
      if (f.type === 'cert') document.getElementById('filterCert').value = 'all';
      currentPage = 1;
      applyFilters();
    });
    container.appendChild(chip);
  });
}

function renderResults() {
  const container = document.getElementById('courseGrid');
  const infoEl = document.getElementById('resultsInfo');
  container.innerHTML = '';

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filteredCourses.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  infoEl.innerHTML = `Showing <strong>${Math.min(startIdx + 1, filteredCourses.length)}–${Math.min(startIdx + ITEMS_PER_PAGE, filteredCourses.length)}</strong> of <strong>${filteredCourses.length}</strong> courses`;

  if (pageItems.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <div style="font-size:3rem;margin-bottom:var(--space-4);">🔍</div>
        <h3>No courses found</h3>
        <p>Try adjusting your filters or search term.</p>
      </div>
    `;
    return;
  }

  pageItems.forEach(course => {
    container.appendChild(renderCourseCard(course));
  });
}

function renderPagination() {
  const container = document.getElementById('pagination');
  container.innerHTML = '';

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  if (totalPages <= 1) return;

  if (currentPage > 1) {
    container.appendChild(createPageBtn('←', currentPage - 1));
  }

  for (let i = 1; i <= totalPages; i++) {
    if (totalPages > 7) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        container.appendChild(createPageBtn(i, i));
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        const dots = document.createElement('span');
        dots.textContent = '...';
        dots.style.padding = '0 8px';
        dots.style.color = 'var(--gray-400)';
        container.appendChild(dots);
      }
    } else {
      container.appendChild(createPageBtn(i, i));
    }
  }

  if (currentPage < totalPages) {
    container.appendChild(createPageBtn('→', currentPage + 1));
  }
}

function createPageBtn(label, page) {
  const btn = document.createElement('button');
  btn.className = `page-btn ${page === currentPage ? 'active' : ''}`;
  btn.textContent = label;
  btn.addEventListener('click', () => {
    currentPage = page;
    renderResults();
    renderPagination();
    window.scrollTo({ top: 300, behavior: 'smooth' });
  });
  return btn;
}
