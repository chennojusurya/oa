// ===================================
// HOME PAGE SCRIPT
// Initializes hero search, trending skills, popular & recommended courses
// ===================================

import { renderNavbar, renderFooter, renderCourseCard, initRevealAnimations } from '../components/shared.js';
import { getRecommendations, getTrendingCourses, getPopularCourses } from '../utils/recommendations.js';
import { getUser } from '../utils/auth.js';
import { addSearchTerm } from '../utils/storage.js';
import { CATEGORIES } from '../data/courses.js';

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('home');
  renderFooter();

  renderTrendingSkills();
  renderPopularCourses();
  renderRecommendedCourses();

  setupSearch();
  initRevealAnimations();

  // Update CTA if logged in
  const user = getUser();
  if (user) {
    const ctaBtn = document.getElementById('ctaBtn');
    if (ctaBtn) {
      ctaBtn.href = 'pages/learning-path.html';
      ctaBtn.textContent = 'Generate Learning Path →';
    }
  }
});

function renderTrendingSkills() {
  const container = document.getElementById('trendingSkills');
  const trending = ['Python', 'AI', 'Web Development', 'Data Science', 'Machine Learning',
    'Cloud Computing', 'JavaScript', 'Cybersecurity', 'React', 'Deep Learning', 'DevOps', 'LLMs'];
  
  trending.forEach(skill => {
    const tag = document.createElement('button');
    tag.className = 'skill-tag animate-fade-in-up';
    tag.textContent = skill;
    tag.addEventListener('click', () => {
      window.location.href = `pages/explore.html?q=${encodeURIComponent(skill)}`;
    });
    container.appendChild(tag);
  });
}

function renderPopularCourses() {
  const container = document.getElementById('popularCourses');
  const popular = getPopularCourses(8);
  popular.forEach(course => {
    container.appendChild(renderCourseCard(course));
  });
}

function renderRecommendedCourses() {
  const container = document.getElementById('recommendedCourses');
  const subtitle = document.getElementById('recSubtitle');
  const user = getUser();

  if (user) {
    subtitle.textContent = `Powered by AI — tailored for ${user.name.split(' ')[0]}`;
    const recs = getRecommendations(8);
    recs.forEach(({ course, reason }) => {
      container.appendChild(renderCourseCard(course, reason));
    });
  } else {
    // Show popular for non-logged-in users
    const popular = getTrendingCourses(8);
    popular.forEach(course => {
      container.appendChild(renderCourseCard(course, 'Trending across platforms — sign in for personalized picks.'));
    });
  }
}

function setupSearch() {
  const input = document.getElementById('heroSearchInput');
  const btn = document.getElementById('heroSearchBtn');

  function doSearch() {
    const q = input.value.trim();
    if (q) {
      addSearchTerm(q);
      window.location.href = `pages/explore.html?q=${encodeURIComponent(q)}`;
    }
  }

  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
  });
}
