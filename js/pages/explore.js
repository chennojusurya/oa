// ===================================
// EXPLORE PAGE SCRIPT
// Filtering, sorting, searching, and pagination
// ===================================

import { renderNavbar, renderFooter, renderCourseCard, initRevealAnimations } from '../components/shared.js';
import { allCourses as courses, getUniquePlatforms } from '../data/courses.js';
import { searchCourses, filterCourses } from '../utils/recommendations.js';
import { addSearchTerm } from '../utils/storage.js';

const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let filteredCourses = [...courses];

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('explore');
  renderFooter();

  populatePlatformFilter();
  setupEventListeners();

  // Check for search query from URL
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q) {
    document.getElementById('searchInput').value = q;
    addSearchTerm(q);
  }

  // Show thinking on initial load if there's a search query or always on first visit
  const hasQuery = document.getElementById('searchInput').value.trim();
  if (hasQuery) {
    applyFiltersWithThinking();
  } else {
    applyFilters();
  }
  initRevealAnimations();
});

function populatePlatformFilter() {
  const select = document.getElementById('filterPlatform');
  getUniquePlatforms().forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    select.appendChild(opt);
  });
}

function setupEventListeners() {
  document.getElementById('filterDifficulty').addEventListener('change', () => { currentPage = 1; applyFiltersWithThinking(); });
  document.getElementById('filterPrice').addEventListener('change', () => { currentPage = 1; applyFiltersWithThinking(); });
  document.getElementById('filterPlatform').addEventListener('change', () => { currentPage = 1; applyFiltersWithThinking(); });
  document.getElementById('sortBy').addEventListener('change', () => { currentPage = 1; applyFiltersWithThinking(); });

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

  // Start with search
  let results = searchCourses(searchQuery);

  // Apply filters
  results = filterCourses(results, { difficulty, priceType, platform, sortBy });

  filteredCourses = results;

  renderActiveFilters({ difficulty, priceType, platform });
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

  // Hide pagination during loading
  paginationEl.innerHTML = '';
  infoEl.innerHTML = '';

  // Show thinking overlay with shimmer placeholders
  container.innerHTML = `
    <div class="thinking-overlay">
      <div class="thinking-brain">🧠</div>
      <div class="thinking-text">Searching across 1100+ courses...</div>
      <div class="thinking-subtext">Analyzing huge datasets from Coursera, Udemy, Kaggle, edX, YouTube, Hugging Face, and more</div>
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

  // Compute results in background but delay showing
  applyFilters(false);

  // Show results after 4 seconds
  setTimeout(() => {
    renderResults();
    renderPagination();
  }, 4000);
}

function renderActiveFilters({ difficulty, priceType, platform }) {
  const container = document.getElementById('activeFilters');
  container.innerHTML = '';

  const filters = [];
  if (difficulty !== 'all') filters.push({ label: difficulty, type: 'difficulty' });
  if (priceType !== 'all') filters.push({ label: priceType === 'free' ? 'Free' : 'Paid', type: 'price' });
  if (platform !== 'all') filters.push({ label: platform, type: 'platform' });

  filters.forEach(f => {
    const chip = document.createElement('span');
    chip.className = 'active-filter-chip';
    chip.innerHTML = `${f.label} <button data-type="${f.type}" aria-label="Remove filter">✕</button>`;
    chip.querySelector('button').addEventListener('click', () => {
      if (f.type === 'difficulty') document.getElementById('filterDifficulty').value = 'all';
      if (f.type === 'price') document.getElementById('filterPrice').value = 'all';
      if (f.type === 'platform') document.getElementById('filterPlatform').value = 'all';
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

  infoEl.innerHTML = `Showing <strong>${startIdx + 1}–${Math.min(startIdx + ITEMS_PER_PAGE, filteredCourses.length)}</strong> of <strong>${filteredCourses.length}</strong> courses`;

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

  // Prev button
  if (currentPage > 1) {
    const prev = createPageBtn('←', currentPage - 1);
    container.appendChild(prev);
  }

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (totalPages > 7) {
      // Show first, last, and neighbors
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

  // Next button
  if (currentPage < totalPages) {
    const next = createPageBtn('→', currentPage + 1);
    container.appendChild(next);
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
