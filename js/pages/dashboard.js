// ===================================
// DASHBOARD PAGE SCRIPT
// Personalized recommendations, saved courses, progress, AI suggestions
// ===================================

import { renderNavbar, renderFooter, renderCourseCard, showToast, ICONS, initRevealAnimations } from '../components/shared.js';
import { getUser, isLoggedIn } from '../utils/auth.js';
import { getSavedCourses, getCompletedCourses, getProgress, unsaveCourse, markCourseCompleted, setCourseProgress } from '../utils/storage.js';
import { getRecommendations } from '../utils/recommendations.js';
import { courses, getCategoryGradient } from '../data/courses.js';
import { skillToCareerMap } from '../data/career-paths.js';

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('dashboard');
  renderFooter();

  if (!isLoggedIn()) {
    document.querySelector('main .container').innerHTML = `
      <div class="empty-state" style="padding-top: var(--space-20);">
        <div style="font-size:4rem;margin-bottom:var(--space-6);">🔒</div>
        <h3>Sign in to access your dashboard</h3>
        <p>Create an account or log in to see your personalized recommendations, saved courses, and learning progress.</p>
        <a href="auth.html" class="btn btn-primary btn-lg">Sign In</a>
      </div>
    `;
    return;
  }

  const user = getUser();

  // Greeting
  document.getElementById('dashGreeting').innerHTML = `Welcome back, <span>${user.name.split(' ')[0]}</span>! 👋`;

  renderStats();
  renderRecommendations();
  renderSavedCourses();
  renderCompletedCourses();
  renderAISuggestions();
  renderProgressTracking();
});

function renderStats() {
  const container = document.getElementById('dashStats');
  const saved = getSavedCourses();
  const completed = getCompletedCourses();
  const progress = getProgress();
  const inProgress = Object.keys(progress).filter(id => {
    const pct = progress[id];
    return pct > 0 && pct < 100 && !completed.includes(parseInt(id));
  });

  const stats = [
    { icon: 'blue', label: 'Saved Courses', value: saved.length, svg: ICONS.bookmark },
    { icon: 'green', label: 'Completed', value: completed.length, svg: ICONS.check },
    { icon: 'purple', label: 'In Progress', value: inProgress.length, svg: ICONS.clock },
    { icon: 'orange', label: 'Hours Learned', value: completed.length * 12 + inProgress.length * 4, svg: ICONS.trophy },
  ];

  container.innerHTML = stats.map(s => `
    <div class="dash-stat animate-fade-in-up">
      <div class="dash-stat-icon ${s.icon}">
        <span style="width:24px;height:24px;display:flex">${s.svg}</span>
      </div>
      <div>
        <div class="dash-stat-value">${s.value}</div>
        <div class="dash-stat-label">${s.label}</div>
      </div>
    </div>
  `).join('');
}

function renderRecommendations() {
  const container = document.getElementById('dashRecommended');
  const recs = getRecommendations(4);
  if (recs.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);font-size:var(--text-sm);">Update your interests for personalized recommendations.</p>';
    return;
  }
  recs.forEach(({ course, reason }) => {
    container.appendChild(renderCourseCard(course, reason));
  });
}

function renderSavedCourses() {
  const container = document.getElementById('savedCoursesList');
  const savedIds = getSavedCourses();

  if (savedIds.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: var(--space-8);">
        <p>No saved courses yet. Browse <a href="explore.html">Explore</a> to save courses you're interested in.</p>
      </div>
    `;
    return;
  }

  savedIds.forEach(id => {
    const course = courses.find(c => c.id === id);
    if (!course) return;
    const gradient = getCategoryGradient(course.category);

    const item = document.createElement('div');
    item.className = 'saved-course-item';
    item.innerHTML = `
      <div class="saved-course-thumb" style="background:${gradient};display:flex;align-items:center;justify-content:center;">
        <span style="color:#fff;font-size:0.7rem;font-weight:700;">${course.category.split(' ').map(w=>w[0]).join('')}</span>
      </div>
      <div class="saved-course-info">
        <div class="saved-course-title">${course.title}</div>
        <div class="saved-course-platform">${course.platform} · ${course.difficulty} · ⭐ ${course.rating}</div>
      </div>
      <div class="saved-course-actions">
        <button class="btn btn-ghost btn-sm start-btn" title="Start learning">▶ Start</button>
        <button class="btn btn-ghost btn-sm remove-btn" title="Remove" style="color:var(--error-500);">✕</button>
      </div>
    `;

    item.querySelector('.remove-btn').addEventListener('click', () => {
      unsaveCourse(id);
      item.remove();
      showToast('Course removed', 'info');
      renderStats();
    });

    item.querySelector('.start-btn').addEventListener('click', () => {
      setCourseProgress(id, 10);
      showToast('Course started! Track progress below.', 'success');
      renderProgressTracking();
      renderStats();
    });

    container.appendChild(item);
  });
}

function renderCompletedCourses() {
  const container = document.getElementById('completedCoursesList');
  const completedIds = getCompletedCourses();

  if (completedIds.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: var(--space-8);">
        <p>No completed courses yet. Start learning and mark courses as complete!</p>
      </div>
    `;
    return;
  }

  completedIds.forEach(id => {
    const course = courses.find(c => c.id === id);
    if (!course) return;

    const item = document.createElement('div');
    item.className = 'saved-course-item';
    item.innerHTML = `
      <div style="width:24px;color:var(--success-500);flex-shrink:0;">${ICONS.check}</div>
      <div class="saved-course-info">
        <div class="saved-course-title">${course.title}</div>
        <div class="saved-course-platform">${course.platform} · ${course.difficulty}</div>
      </div>
      <span class="badge badge-success">Completed</span>
    `;
    container.appendChild(item);
  });
}

function renderAISuggestions() {
  const container = document.getElementById('aiSuggestions');
  const user = getUser();

  const suggestions = [];

  // Career-based suggestion
  if (user.careerGoal) {
    suggestions.push({
      icon: '🎯',
      title: 'Career Path Available',
      text: `We have a curated learning path for "${user.careerGoal}". Check it out to get a step-by-step roadmap.`,
      action: `<a href="learning-path.html" class="btn btn-primary btn-sm" style="margin-top:var(--space-2);">View Path →</a>`
    });
  }

  // Interest-based suggestion
  if (user.interests && user.interests.length > 0) {
    const mainInterest = user.interests[0];
    const careers = skillToCareerMap[mainInterest] || [];
    if (careers.length > 0) {
      suggestions.push({
        icon: '💡',
        title: 'Skill-to-Career Insight',
        text: `Your interest in ${mainInterest} can lead to careers like ${careers.join(', ')}. Explore courses to build this skill.`,
        action: `<a href="explore.html?q=${encodeURIComponent(mainInterest)}" class="btn btn-secondary btn-sm" style="margin-top:var(--space-2);">Explore ${mainInterest} →</a>`
      });
    }
  }

  // Skill level suggestion
  if (user.skillLevel === 'Beginner') {
    suggestions.push({
      icon: '📈',
      title: 'Level Up!',
      text: 'You\'re at Beginner level. Complete 3 beginner courses to unlock intermediate recommendations.',
      action: ''
    });
  }

  // General suggestion
  suggestions.push({
    icon: '🔥',
    title: 'Trending Now',
    text: 'Generative AI & LLMs are the hottest skill right now. 320K+ learners are studying it.',
    action: `<a href="explore.html?q=generative+ai" class="btn btn-ghost btn-sm" style="margin-top:var(--space-2);">Explore →</a>`
  });

  container.innerHTML = suggestions.map(s => `
    <div class="ai-suggestion">
      <div class="ai-suggestion-header">
        <span>${s.icon}</span>
        <span>${s.title}</span>
      </div>
      <p>${s.text}</p>
      ${s.action}
    </div>
  `).join('');
}

function renderProgressTracking() {
  const container = document.getElementById('progressTracking');
  const progress = getProgress();
  const entries = Object.entries(progress);

  if (entries.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: var(--space-6);">
        <p style="font-size:var(--text-sm);">Start a course to track your progress here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = entries.map(([id, pct]) => {
    const course = courses.find(c => c.id === parseInt(id));
    if (!course) return '';
    return `
      <div class="progress-course">
        <div class="progress-course-header">
          <span class="progress-course-title">${course.title}</span>
          <span class="progress-course-pct">${pct}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
        <div style="display:flex;gap:var(--space-2);margin-top:var(--space-2);">
          <button class="btn btn-ghost btn-sm progress-add" data-id="${id}" data-action="add">+10%</button>
          <button class="btn btn-ghost btn-sm progress-complete" data-id="${id}" data-action="complete" style="color:var(--success-500);">✓ Complete</button>
        </div>
      </div>
    `;
  }).join('');

  // Event listeners
  container.querySelectorAll('.progress-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const current = progress[id] || 0;
      setCourseProgress(id, Math.min(100, current + 10));
      renderProgressTracking();
      renderStats();
    });
  });

  container.querySelectorAll('.progress-complete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      setCourseProgress(id, 100);
      markCourseCompleted(id);
      showToast('🎉 Course completed! Great job!', 'success');
      renderProgressTracking();
      renderCompletedCourses();
      renderStats();
    });
  });
}
