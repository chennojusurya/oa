// ===================================
// AUTH PAGE SCRIPT
// Handles login/signup tab switching, form validation, interest chips
// ===================================

import { signup, login, isLoggedIn } from '../utils/auth.js';
import { showToast } from '../components/shared.js';
import { CATEGORIES } from '../data/courses.js';

document.addEventListener('DOMContentLoaded', () => {
  // Redirect if already logged in
  if (isLoggedIn()) {
    window.location.href = '../index.html';
    return;
  }

  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const authTitle = document.getElementById('authTitle');
  const authSubtitle = document.getElementById('authSubtitle');
  const authMessage = document.getElementById('authMessage');

  // Check URL for tab param
  const params = new URLSearchParams(window.location.search);
  if (params.get('tab') === 'signup') {
    switchTab('signup');
  }

  function switchTab(tab) {
    if (tab === 'signup') {
      loginTab.classList.remove('active');
      signupTab.classList.add('active');
      loginForm.classList.remove('active');
      signupForm.classList.add('active');
      authTitle.textContent = 'Create Account';
      authSubtitle.textContent = 'Sign up to get personalized course recommendations';
    } else {
      signupTab.classList.remove('active');
      loginTab.classList.add('active');
      signupForm.classList.remove('active');
      loginForm.classList.add('active');
      authTitle.textContent = 'Welcome Back';
      authSubtitle.textContent = 'Log in to access your personalized dashboard';
    }
    hideMessage();
  }

  loginTab.addEventListener('click', () => switchTab('login'));
  signupTab.addEventListener('click', () => switchTab('signup'));
  document.getElementById('switchToSignup')?.addEventListener('click', (e) => { e.preventDefault(); switchTab('signup'); });
  document.getElementById('switchToLogin')?.addEventListener('click', (e) => { e.preventDefault(); switchTab('login'); });

  // Render interest chips
  const interestsGrid = document.getElementById('interestsGrid');
  const selectedInterests = new Set();
  CATEGORIES.forEach(cat => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'interest-chip';
    chip.textContent = cat;
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      if (selectedInterests.has(cat)) selectedInterests.delete(cat);
      else selectedInterests.add(cat);
    });
    interestsGrid.appendChild(chip);
  });

  // Login form
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const result = login(email, password);
    if (result.success) {
      showMessage(result.message, 'success');
      setTimeout(() => window.location.href = '../index.html', 800);
    } else {
      showMessage(result.message, 'error');
    }
  });

  // Signup form
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const skillLevel = document.getElementById('signupSkillLevel').value;
    const careerGoal = document.getElementById('signupCareerGoal').value;

    if (selectedInterests.size === 0) {
      showMessage('Please select at least one interest.', 'error');
      return;
    }

    const result = signup({
      name, email, password,
      interests: Array.from(selectedInterests),
      skillLevel,
      careerGoal
    });

    if (result.success) {
      showMessage(result.message, 'success');
      setTimeout(() => window.location.href = '../pages/dashboard.html', 800);
    } else {
      showMessage(result.message, 'error');
    }
  });

  function showMessage(text, type) {
    authMessage.style.display = 'block';
    authMessage.textContent = text;
    authMessage.style.color = type === 'error' ? 'var(--error-500)' : 'var(--success-500)';
  }

  function hideMessage() {
    authMessage.style.display = 'none';
  }
});
