// ===================================
// SHARED COMPONENTS — Navbar, Footer, Course Card, Toast
// Renders reusable UI elements via DOM manipulation
// ===================================

import { getUser, logout } from '../utils/auth.js';
import { isCourseSaved, saveCourse, unsaveCourse } from '../utils/storage.js';
import { getCategoryGradient } from '../data/courses.js';

// ---- Icons (inline SVG) ----
export const ICONS = {
  logo: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="currentColor"/><path d="M8 16L14 10L20 16L26 10" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 22L14 16L20 22L26 16" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  heartFilled: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  starEmpty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v1m0 16v1m-7.07-14.07l.71.71m12.73 12.73l.71.71M3 12h1m16 0h1m-14.07 7.07l.71-.71m12.73-12.73l.71-.71"/><circle cx="12" cy="12" r="4"/></svg>`,
  lightbulb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6m-5 2h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>`,
  thumbUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`,
  thumbDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15V19a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10zM17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>`,
  bookmark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
  target: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  layout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  messageSquare: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
};

// ---- Helper: determine base path ----
function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/pages/')) return '../';
  return './';
}

// ---- Render Navbar ----
export function renderNavbar(activePage = '') {
  const user = getUser();
  const base = getBasePath();

  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'navbar';
  nav.innerHTML = `
    <div class="container">
      <a href="${base}index.html" class="nav-logo">
        ${ICONS.logo}
        CourseAI
      </a>
      <div class="nav-links" id="navLinks">
        <a href="${base}index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">${ICONS.home} Home</a>
        <a href="${base}pages/explore.html" class="nav-link ${activePage === 'explore' ? 'active' : ''}">${ICONS.compass} Explore</a>
        <a href="${base}pages/dashboard.html" class="nav-link ${activePage === 'dashboard' ? 'active' : ''}">${ICONS.layout} Dashboard</a>
        <a href="${base}pages/learning-path.html" class="nav-link ${activePage === 'learning-path' ? 'active' : ''}">${ICONS.map} Learning Path</a>
        <a href="${base}pages/feedback.html" class="nav-link ${activePage === 'feedback' ? 'active' : ''}">${ICONS.messageSquare} Feedback</a>
      </div>
      <div class="nav-auth" id="navAuth">
        ${user ? `
          <div class="nav-user" id="navUser">
            <div class="nav-avatar">${user.name.charAt(0).toUpperCase()}</div>
            <span class="nav-username">${user.name.split(' ')[0]}</span>
          </div>
          <button class="btn btn-ghost btn-sm" id="logoutBtn">Logout</button>
        ` : `
          <a href="${base}pages/auth.html" class="btn btn-secondary btn-sm">Log In</a>
          <a href="${base}pages/auth.html?tab=signup" class="btn btn-primary btn-sm">Sign Up</a>
        `}
      </div>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;

  document.body.prepend(nav);

  // Mobile toggle
  const toggle = nav.querySelector('#navToggle');
  toggle?.addEventListener('click', () => {
    document.body.classList.toggle('mobile-menu-open');
    nav.querySelector('#navLinks').classList.toggle('open');
  });

  // Logout
  nav.querySelector('#logoutBtn')?.addEventListener('click', () => {
    logout();
    window.location.href = base + 'index.html';
  });

  // Scroll effect
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });

  // Style nav-link icons
  nav.querySelectorAll('.nav-link svg').forEach(svg => {
    svg.style.width = '16px';
    svg.style.height = '16px';
    svg.style.display = 'inline';
    svg.style.verticalAlign = '-2px';
    svg.style.marginRight = '4px';
  });
}

// ---- Render Footer ----
export function renderFooter() {
  const base = getBasePath();
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">🎓 CourseAI</div>
          <p class="footer-desc">Stop Searching. Start Learning Smart. AI-powered course aggregation from 10+ platforms to help you find the perfect learning path.</p>
        </div>
        <div>
          <h4 class="footer-heading">Platform</h4>
          <div class="footer-links">
            <a href="${base}index.html">Home</a>
            <a href="${base}pages/explore.html">Explore Courses</a>
            <a href="${base}pages/learning-path.html">Learning Paths</a>
            <a href="${base}pages/dashboard.html">Dashboard</a>
          </div>
        </div>
        <div>
          <h4 class="footer-heading">Sources</h4>
          <div class="footer-links">
            <a href="#">Coursera</a>
            <a href="#">Udemy</a>
            <a href="#">edX</a>
            <a href="#">YouTube</a>
            <a href="#">Khan Academy</a>
          </div>
        </div>
        <div>
          <h4 class="footer-heading">More</h4>
          <div class="footer-links">
            <a href="#">NPTEL</a>
            <a href="#">HackerRank</a>
            <a href="#">LeetCode</a>
            <a href="#">Codecademy</a>
            <a href="${base}pages/feedback.html">Feedback</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 CourseAI. All rights reserved.</span>
        <div class="footer-socials">
          <a href="#" aria-label="Twitter">𝕏</a>
          <a href="#" aria-label="GitHub">⌨</a>
          <a href="#" aria-label="LinkedIn">in</a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

// ---- Render Course Card ----
export function renderCourseCard(course, reason = '') {
  const saved = isCourseSaved(course.id);
  const gradient = getCategoryGradient(course.category);
  const priceLabel = course.price === 0 ? 'Free' : `$${course.price}`;
  const priceClass = course.price === 0 ? 'free' : '';

  const card = document.createElement('div');
  card.className = 'course-card animate-fade-in-up';
  card.innerHTML = `
    <div class="card-image" style="background:${gradient}; display:flex; align-items:center; justify-content:center;">
      <span style="color:rgba(255,255,255,0.85); font-size:2.5rem; font-weight:800; font-family:var(--font-display); text-shadow:0 2px 8px rgba(0,0,0,0.2);">${course.category.split(' ').map(w=>w[0]).join('')}</span>
      <span class="card-platform">${course.platform}</span>
      <button class="card-save ${saved ? 'saved' : ''}" data-id="${course.id}" aria-label="${saved ? 'Unsave' : 'Save'} course">
        ${saved ? ICONS.heartFilled : ICONS.heart}
      </button>
      <span class="card-difficulty ${course.difficulty.toLowerCase()}">${course.difficulty}</span>
    </div>
    <div class="card-body">
      <h4 class="card-title">${course.title}</h4>
      <p class="card-instructor">${course.instructor}</p>
      <div class="card-meta">
        <span class="card-rating">${ICONS.star} ${course.rating}</span>
        <span>${ICONS.clock} ${course.duration}</span>
        <span class="card-price ${priceClass}">${priceLabel}</span>
      </div>
      ${reason ? `
        <div class="card-reason">
          ${ICONS.lightbulb}
          <span>${reason}</span>
        </div>
      ` : ''}
    </div>
  `;

  // Fix SVG sizes in meta
  card.querySelectorAll('.card-meta svg, .card-reason svg').forEach(svg => {
    svg.style.width = '14px';
    svg.style.height = '14px';
    svg.style.display = 'inline';
    svg.style.verticalAlign = '-2px';
    svg.style.flexShrink = '0';
  });

  // Save/unsave toggle
  const saveBtn = card.querySelector('.card-save');
  saveBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = parseInt(saveBtn.dataset.id);
    if (isCourseSaved(id)) {
      unsaveCourse(id);
      saveBtn.classList.remove('saved');
      saveBtn.innerHTML = ICONS.heart;
      showToast('Course removed from saved list', 'info');
    } else {
      saveCourse(id);
      saveBtn.classList.add('saved');
      saveBtn.innerHTML = ICONS.heartFilled;
      showToast('Course saved!', 'success');
    }
  });

  return card;
}

// ---- Render Stars ----
export function renderStars(rating, maxStars = 5) {
  let html = '<div class="stars">';
  for (let i = 1; i <= maxStars; i++) {
    html += i <= Math.round(rating) 
      ? `<span class="star-filled">${ICONS.star}</span>` 
      : `<span class="star-empty">${ICONS.starEmpty}</span>`;
  }
  html += '</div>';
  return html;
}

// ---- Toast notification ----
export function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100px)';
    toast.style.transition = 'all 300ms ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---- Intersection Observer for reveal animations ----
export function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
