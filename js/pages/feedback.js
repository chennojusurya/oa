// ===================================
// FEEDBACK PAGE SCRIPT
// Course rating, recommendation feedback, general feedback, history
// ===================================

import { renderNavbar, renderFooter, ICONS, showToast, renderStars } from '../components/shared.js';
import { courses } from '../data/courses.js';
import { addFeedback, getFeedback, setRecFeedback, getRecFeedback } from '../utils/storage.js';
import { getRecommendations } from '../utils/recommendations.js';
import { getUser } from '../utils/auth.js';

let selectedRating = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('feedback');
  renderFooter();

  populateCourseSelect();
  renderStarRatingInput();
  renderRecFeedback();
  renderFeedbackHistory();

  // Submit rating
  document.getElementById('submitRating').addEventListener('click', submitRating);

  // Submit general feedback
  document.getElementById('submitGeneral').addEventListener('click', submitGeneralFeedback);
});

function populateCourseSelect() {
  const select = document.getElementById('feedbackCourseSelect');
  courses.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = `${c.title} (${c.platform})`;
    select.appendChild(opt);
  });
}

function renderStarRatingInput() {
  const container = document.getElementById('starRating');

  for (let i = 1; i <= 5; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.innerHTML = `<svg viewBox="0 0 24 24" width="32" height="32"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    btn.dataset.rating = i;

    btn.addEventListener('click', () => {
      selectedRating = i;
      updateStarDisplay();
    });

    btn.addEventListener('mouseenter', () => {
      highlightStars(i);
    });

    container.appendChild(btn);
  }

  container.addEventListener('mouseleave', () => {
    updateStarDisplay();
  });
}

function highlightStars(upTo) {
  const buttons = document.querySelectorAll('#starRating button');
  buttons.forEach((btn, idx) => {
    const svg = btn.querySelector('svg');
    if (idx < upTo) {
      svg.setAttribute('fill', 'var(--warning-500)');
      svg.setAttribute('stroke', 'var(--warning-500)');
    } else {
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'var(--gray-300)');
    }
  });
}

function updateStarDisplay() {
  const buttons = document.querySelectorAll('#starRating button');
  buttons.forEach((btn, idx) => {
    const svg = btn.querySelector('svg');
    if (idx < selectedRating) {
      btn.classList.add('active');
      svg.setAttribute('fill', 'var(--warning-500)');
      svg.setAttribute('stroke', 'var(--warning-500)');
    } else {
      btn.classList.remove('active');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'var(--gray-300)');
    }
  });
}

function submitRating() {
  const courseId = document.getElementById('feedbackCourseSelect').value;
  const text = document.getElementById('feedbackText').value;

  if (!courseId) {
    showToast('Please select a course.', 'error');
    return;
  }
  if (selectedRating === 0) {
    showToast('Please select a rating.', 'error');
    return;
  }

  const course = courses.find(c => c.id === parseInt(courseId));
  addFeedback({
    type: 'rating',
    courseId: parseInt(courseId),
    courseTitle: course?.title || 'Unknown',
    platform: course?.platform || '',
    rating: selectedRating,
    text: text.trim(),
  });

  showToast('⭐ Rating submitted! This will improve future recommendations.', 'success');

  // Reset form
  selectedRating = 0;
  updateStarDisplay();
  document.getElementById('feedbackCourseSelect').value = '';
  document.getElementById('feedbackText').value = '';
  renderFeedbackHistory();
}

function renderRecFeedback() {
  const container = document.getElementById('recFeedbackList');
  const user = getUser();
  const existingFeedback = getRecFeedback();

  if (!user) {
    container.innerHTML = '<p style="font-size:var(--text-sm);color:var(--text-muted);">Sign in to rate recommendations.</p>';
    return;
  }

  const recs = getRecommendations(5);
  if (recs.length === 0) {
    container.innerHTML = '<p style="font-size:var(--text-sm);color:var(--text-muted);">No recommendations to rate yet.</p>';
    return;
  }

  container.innerHTML = recs.map(({ course }) => {
    const liked = existingFeedback[course.id];
    return `
      <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3) 0;border-bottom:1px solid var(--gray-100);">
        <div style="flex:1;min-width:0;">
          <div style="font-size:var(--text-sm);font-weight:var(--font-medium);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${course.title}</div>
          <div style="font-size:var(--text-xs);color:var(--text-muted);">${course.platform}</div>
        </div>
        <div class="thumbs-row" style="margin:0;gap:var(--space-1);">
          <button class="thumb-btn like ${liked === true ? 'active' : ''}" data-id="${course.id}" data-action="like" style="padding:var(--space-2)">
            <span style="width:18px;height:18px;display:flex;">${ICONS.thumbUp}</span>
          </button>
          <button class="thumb-btn dislike ${liked === false ? 'active' : ''}" data-id="${course.id}" data-action="dislike" style="padding:var(--space-2)">
            <span style="width:18px;height:18px;display:flex;">${ICONS.thumbDown}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Event listeners
  container.querySelectorAll('.thumb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const action = btn.dataset.action;
      const liked = action === 'like';

      setRecFeedback(id, liked);
      showToast(liked ? '👍 Thanks! We\'ll show more like this.' : '👎 Noted! We\'ll adjust your recommendations.', 'info');

      // Update UI
      const row = btn.closest('div').parentElement;
      row.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function submitGeneralFeedback() {
  const text = document.getElementById('generalFeedback').value.trim();
  if (!text) {
    showToast('Please write some feedback first.', 'error');
    return;
  }

  addFeedback({
    type: 'general',
    text,
  });

  showToast('💬 Thank you for your feedback!', 'success');
  document.getElementById('generalFeedback').value = '';
  renderFeedbackHistory();
}

function renderFeedbackHistory() {
  const container = document.getElementById('feedbackHistoryList');
  const feedback = getFeedback();

  if (feedback.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);font-size:var(--text-sm);text-align:center;padding:var(--space-8);">No feedback submitted yet.</p>';
    return;
  }

  container.innerHTML = feedback.slice(0, 10).map(f => {
    const date = new Date(f.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const icon = f.type === 'rating' ? '⭐' : '💬';
    const title = f.type === 'rating' ? `${f.courseTitle} — ${f.rating}/5 stars` : 'General Feedback';

    return `
      <div class="feedback-item">
        <div style="font-size:1.5rem;">${icon}</div>
        <div style="flex:1;">
          <div class="feedback-item-course">${title}</div>
          ${f.text ? `<div class="feedback-item-text">"${f.text}"</div>` : ''}
          <div class="feedback-item-date">${date}</div>
        </div>
      </div>
    `;
  }).join('');
}
