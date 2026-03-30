// ===================================
// STORAGE UTILITY — localStorage wrapper
// Handles user data persistence
// ===================================

const STORAGE_KEYS = {
  USER: 'oa_user',
  SAVED_COURSES: 'oa_saved_courses',
  COMPLETED_COURSES: 'oa_completed_courses',
  PROGRESS: 'oa_progress',
  FEEDBACK: 'oa_feedback',
  SEARCH_HISTORY: 'oa_search_history',
  RECOMMENDATIONS_FEEDBACK: 'oa_rec_feedback',
};

export function getItem(key) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  } catch { return null; }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Storage full or unavailable:', e);
  }
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

// ---- User ----
export function getCurrentUser() {
  return getItem(STORAGE_KEYS.USER);
}

export function saveUser(user) {
  setItem(STORAGE_KEYS.USER, user);
}

export function clearUser() {
  removeItem(STORAGE_KEYS.USER);
}

// ---- Saved Courses ----
export function getSavedCourses() {
  return getItem(STORAGE_KEYS.SAVED_COURSES) || [];
}

export function saveCourse(courseId) {
  const saved = getSavedCourses();
  if (!saved.includes(courseId)) {
    saved.push(courseId);
    setItem(STORAGE_KEYS.SAVED_COURSES, saved);
  }
}

export function unsaveCourse(courseId) {
  let saved = getSavedCourses();
  saved = saved.filter(id => id !== courseId);
  setItem(STORAGE_KEYS.SAVED_COURSES, saved);
}

export function isCourseSaved(courseId) {
  return getSavedCourses().includes(courseId);
}

// ---- Completed Courses ----
export function getCompletedCourses() {
  return getItem(STORAGE_KEYS.COMPLETED_COURSES) || [];
}

export function markCourseCompleted(courseId) {
  const completed = getCompletedCourses();
  if (!completed.includes(courseId)) {
    completed.push(courseId);
    setItem(STORAGE_KEYS.COMPLETED_COURSES, completed);
  }
}

// ---- Progress ----
export function getProgress() {
  return getItem(STORAGE_KEYS.PROGRESS) || {};
}

export function setCourseProgress(courseId, percent) {
  const progress = getProgress();
  progress[courseId] = Math.min(100, Math.max(0, percent));
  setItem(STORAGE_KEYS.PROGRESS, progress);
}

// ---- Search History ----
export function getSearchHistory() {
  return getItem(STORAGE_KEYS.SEARCH_HISTORY) || [];
}

export function addSearchTerm(term) {
  if (!term.trim()) return;
  let history = getSearchHistory();
  history = [term.trim(), ...history.filter(t => t !== term.trim())].slice(0, 20);
  setItem(STORAGE_KEYS.SEARCH_HISTORY, history);
}

// ---- Feedback ----
export function getFeedback() {
  return getItem(STORAGE_KEYS.FEEDBACK) || [];
}

export function addFeedback(feedbackItem) {
  const feedback = getFeedback();
  feedback.unshift({ ...feedbackItem, date: new Date().toISOString() });
  setItem(STORAGE_KEYS.FEEDBACK, feedback);
}

// ---- Recommendation Feedback ----
export function getRecFeedback() {
  return getItem(STORAGE_KEYS.RECOMMENDATIONS_FEEDBACK) || {};
}

export function setRecFeedback(courseId, liked) {
  const feedback = getRecFeedback();
  feedback[courseId] = liked;
  setItem(STORAGE_KEYS.RECOMMENDATIONS_FEEDBACK, feedback);
}

export { STORAGE_KEYS };
