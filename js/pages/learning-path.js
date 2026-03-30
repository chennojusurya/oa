// ===================================
// LEARNING PATH PAGE SCRIPT
// Generates step-by-step career roadmaps with course recommendations
// ===================================

import { renderNavbar, renderFooter, renderCourseCard, ICONS, showToast, initRevealAnimations } from '../components/shared.js';
import { careerPaths, getCareerGoals } from '../data/career-paths.js';
import { allCourses as courses } from '../data/courses.js';
import { getUser } from '../utils/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('learning-path');
  renderFooter();

  renderCareerSuggestions();
  setupEventListeners();

  // Auto-fill if user has a career goal
  const user = getUser();
  if (user?.careerGoal) {
    document.getElementById('careerGoalInput').value = user.careerGoal;
  }
});

function renderCareerSuggestions() {
  const container = document.getElementById('careerSuggestions');
  getCareerGoals().forEach(goal => {
    const chip = document.createElement('button');
    chip.className = 'lp-suggestion-chip';
    chip.textContent = goal;
    chip.addEventListener('click', () => {
      document.getElementById('careerGoalInput').value = goal;
      generatePath(goal);
    });
    container.appendChild(chip);
  });
}

function setupEventListeners() {
  const btn = document.getElementById('generateBtn');
  const input = document.getElementById('careerGoalInput');

  btn.addEventListener('click', () => {
    const goal = input.value.trim();
    if (goal) generatePath(goal);
    else showToast('Please enter a career goal.', 'error');
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const goal = input.value.trim();
      if (goal) generatePath(goal);
    }
  });
}

function generatePath(goalInput) {
  const resultContainer = document.getElementById('lpResult');

  // Find matching career path (fuzzy match)
  const goalLower = goalInput.toLowerCase();
  const matchedKey = Object.keys(careerPaths).find(key =>
    key.toLowerCase().includes(goalLower) || goalLower.includes(key.toLowerCase())
  );

  if (!matchedKey) {
    // Generate a generic path
    resultContainer.innerHTML = `
      <div class="lp-result">
        <div class="lp-result-header">
          <h2>Learning Path: <span>${goalInput}</span></h2>
          <p style="color:var(--text-secondary);margin-top:var(--space-2);">We don't have a pre-built path for "${goalInput}" yet, but here are relevant courses we found:</p>
        </div>
        <div class="course-grid" id="genericCourses" style="max-width:900px;margin:0 auto;"></div>
      </div>
    `;

    // Find courses matching the goal text
    const related = courses.filter(c =>
      c.title.toLowerCase().includes(goalLower) ||
      c.tags.some(t => t.includes(goalLower)) ||
      c.category.toLowerCase().includes(goalLower)
    ).slice(0, 6);

    const grid = document.getElementById('genericCourses');
    if (related.length === 0) {
      grid.innerHTML = '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;">No matching courses found. Try a different career goal.</p>';
    } else {
      related.forEach(course => grid.appendChild(renderCourseCard(course)));
    }
    return;
  }

  const path = careerPaths[matchedKey];

  // Render the full stepper roadmap
  resultContainer.innerHTML = `
    <div class="lp-result">
      <div class="lp-result-header">
        <h2>Learning Path: <span>${path.title}</span></h2>
        <p style="color:var(--text-secondary);margin-top:var(--space-2);max-width:600px;margin-left:auto;margin-right:auto;">${path.description}</p>
        <div class="lp-meta">
          <div class="lp-meta-item">
            <span style="width:18px;height:18px;display:inline-flex;color:var(--primary-500);">${ICONS.clock}</span>
            <span>Estimated: ${path.totalDuration}</span>
          </div>
          <div class="lp-meta-item">
            <span style="width:18px;height:18px;display:inline-flex;color:var(--primary-500);">${ICONS.target}</span>
            <span>4 Phases</span>
          </div>
          <div class="lp-meta-item">
            <span style="width:18px;height:18px;display:inline-flex;color:var(--primary-500);">${ICONS.bookmark}</span>
            <span>${countPathCourses(path)} Recommended Courses</span>
          </div>
        </div>
      </div>

      <div class="stepper" id="stepper">
        ${path.steps.map((step, i) => renderStep(step, i + 1)).join('')}
      </div>
    </div>
  `;

  // Smooth scroll to result
  resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderStep(step, number) {
  const matchingCourses = findCoursesForStep(step);

  return `
    <div class="step ${step.level} animate-fade-in-up" style="animation-delay:${number * 150}ms">
      <div class="step-marker">${number}</div>
      <div class="step-content">
        <div class="step-level">
          ${step.level === 'beginner' ? '🟢' : step.level === 'intermediate' ? '🟡' : step.level === 'advanced' ? '🔴' : '🟣'}
          Step ${number}: ${step.level.charAt(0).toUpperCase() + step.level.slice(1)}
        </div>
        <h3>${step.title}</h3>
        <p class="step-desc">${step.description}</p>
        <div class="step-duration">
          <span style="width:16px;height:16px;display:inline-flex;">${ICONS.clock}</span>
          <span>${step.duration}</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);margin-bottom:var(--space-4);">
          ${step.skills.map(s => `<span class="badge badge-primary">${s}</span>`).join('')}
        </div>
        <div class="step-courses">
          ${matchingCourses.map(c => `
            <div class="step-course-card">
              <div class="step-course-title">${c.title}</div>
              <div class="step-course-meta">
                <span class="step-course-platform">${c.platform}</span>
                <span>⭐ ${c.rating}</span>
                <span>${c.duration}</span>
                <span>${c.price === 0 ? '🆓 Free' : '$' + c.price}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function findCoursesForStep(step) {
  const tags = step.courseTags.map(t => t.toLowerCase());
  const levelMap = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    projects: null // any level
  };

  const targetLevel = levelMap[step.level];

  return courses
    .filter(c => {
      const hasTagMatch = c.tags.some(t => tags.some(st => t.includes(st) || st.includes(t)));
      const categoryMatch = tags.some(t => c.category.toLowerCase().includes(t));
      const levelMatch = !targetLevel || c.difficulty === targetLevel;
      return (hasTagMatch || categoryMatch) && levelMatch;
    })
    .sort((a, b) => b.rating * b.enrolled - a.rating * a.enrolled)
    .slice(0, 4);
}

function countPathCourses(path) {
  let count = 0;
  path.steps.forEach(step => {
    count += findCoursesForStep(step).length;
  });
  return count;
}
