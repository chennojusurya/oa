// ===================================
// RECOMMENDATION ENGINE
// Hybrid: Content-based + Collaborative filtering
// With Explainable AI reasons
// ===================================

import { allCourses as courses } from '../data/courses.js';
import { getUser } from './auth.js';
import { getSearchHistory, getSavedCourses, getCompletedCourses, getRecFeedback } from './storage.js';

/**
 * Content-Based Filtering
 * Scores courses based on tag/category overlap with user interests & search history
 */
function contentBasedScore(course, userInterests, searchHistory) {
  let score = 0;
  const tags = course.tags.map(t => t.toLowerCase());
  const category = course.category.toLowerCase();

  // Match user interests
  for (const interest of userInterests) {
    const lower = interest.toLowerCase();
    if (category.includes(lower) || tags.some(t => t.includes(lower))) {
      score += 10;
    }
  }

  // Match search history
  for (const term of searchHistory.slice(0, 10)) {
    const lower = term.toLowerCase();
    if (course.title.toLowerCase().includes(lower) || tags.some(t => t.includes(lower))) {
      score += 5;
    }
  }

  // Bonus for high rating
  score += (course.rating - 4.0) * 3;

  // Bonus for popularity (log-scaled)
  score += Math.log10(course.enrolled + 1) * 0.5;

  return score;
}

/**
 * Collaborative Filtering (Simulated)
 * "Users similar to you also liked these courses"
 * We simulate this by finding courses saved by user profiles with similar interests
 */
function collaborativeScore(course, userInterests) {
  let score = 0;
  // Simulate: courses in categories matching user interests get a boost
  // This simulates "similar users liked these"
  const relatedCategories = userInterests.map(i => i.toLowerCase());
  if (relatedCategories.some(c => course.category.toLowerCase().includes(c))) {
    score += 6;
  }

  // Boost courses with higher enrollment (proxy for collaborative signal)
  if (course.enrolled > 1000000) score += 3;
  else if (course.enrolled > 500000) score += 2;
  else if (course.enrolled > 100000) score += 1;

  return score;
}

/**
 * Skill-level matching
 */
function difficultyScore(course, userSkillLevel) {
  const levels = { 'Beginner': 0, 'Intermediate': 1, 'Advanced': 2 };
  const userLevel = levels[userSkillLevel] ?? 0;
  const courseLevel = levels[course.difficulty] ?? 0;
  
  // Prefer matching or one step above
  const diff = courseLevel - userLevel;
  if (diff === 0) return 5;
  if (diff === 1) return 3;
  if (diff === -1) return 1;
  return 0;
}

/**
 * Generate recommendation reason (Explainable AI)
 */
function generateReason(course, userInterests, userSkillLevel, searchHistory) {
  const reasons = [];

  // Interest match
  const matchedInterests = userInterests.filter(i => {
    const lower = i.toLowerCase();
    return course.category.toLowerCase().includes(lower) || 
           course.tags.some(t => t.toLowerCase().includes(lower));
  });
  if (matchedInterests.length > 0) {
    reasons.push(`Matches your interest in ${matchedInterests.join(' and ')}`);
  }

  // Skill level match
  if (course.difficulty === userSkillLevel) {
    reasons.push(`Perfect for your ${userSkillLevel} level`);
  } else if (course.difficulty === 'Intermediate' && userSkillLevel === 'Beginner') {
    reasons.push('A great next step to level up');
  }

  // Search history match
  const matchedSearches = searchHistory.slice(0, 5).filter(term =>
    course.title.toLowerCase().includes(term.toLowerCase()) ||
    course.tags.some(t => t.includes(term.toLowerCase()))
  );
  if (matchedSearches.length > 0) {
    reasons.push(`Related to your search for "${matchedSearches[0]}"`);
  }

  // Rating
  if (course.rating >= 4.7) {
    reasons.push(`Highly rated (${course.rating}★) by ${(course.reviews / 1000).toFixed(0)}K learners`);
  }

  // Popularity
  if (course.enrolled > 1000000) {
    reasons.push('Popular among learners similar to you');
  }

  // Free
  if (course.price === 0) {
    reasons.push('Free course — no barrier to entry');
  }

  return reasons.slice(0, 2).join('. ') + '.';
}

/**
 * Get personalized recommendations for the current user
 * @param {number} limit - max courses to return
 * @returns {Array<{course, score, reason}>}
 */
export function getRecommendations(limit = 12) {
  const user = getUser();
  const searchHistory = getSearchHistory();
  const savedCourses = getSavedCourses();
  const completedCourses = getCompletedCourses();
  const recFeedback = getRecFeedback();

  const userInterests = user?.interests || [];
  const userSkillLevel = user?.skillLevel || 'Beginner';

  // Score every course
  const scored = courses
    .filter(c => !completedCourses.includes(c.id)) // exclude completed
    .map(course => {
      let score = 0;
      score += contentBasedScore(course, userInterests, searchHistory);
      score += collaborativeScore(course, userInterests);
      score += difficultyScore(course, userSkillLevel);

      // Boost saved courses slightly
      if (savedCourses.includes(course.id)) score += 2;

      // Adjust based on past recommendation feedback
      if (recFeedback[course.id] === true)  score += 8;
      if (recFeedback[course.id] === false) score -= 10;

      const reason = generateReason(course, userInterests, userSkillLevel, searchHistory);

      return { course, score, reason };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored;
}

/**
 * Get trending courses (based on enrollment & rating)
 */
export function getTrendingCourses(limit = 8) {
  return [...courses]
    .sort((a, b) => (b.enrolled * b.rating) - (a.enrolled * a.rating))
    .slice(0, limit);
}

/**
 * Get popular courses overall
 */
export function getPopularCourses(limit = 8) {
  return [...courses]
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, limit);
}

/**
 * Search courses by query
 */
export function searchCourses(query) {
  if (!query.trim()) return courses;
  const q = query.toLowerCase().trim();
  return courses.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.category.toLowerCase().includes(q) ||
    c.tags.some(t => t.includes(q)) ||
    c.platform.toLowerCase().includes(q) ||
    c.instructor.toLowerCase().includes(q)
  );
}

/**
 * Filter courses
 */
export function filterCourses(courseList, { difficulty, priceType, platform, sortBy }) {
  let filtered = [...courseList];

  if (difficulty && difficulty !== 'all') {
    filtered = filtered.filter(c => c.difficulty === difficulty);
  }
  if (priceType === 'free') {
    filtered = filtered.filter(c => c.price === 0);
  } else if (priceType === 'paid') {
    filtered = filtered.filter(c => c.price > 0);
  }
  if (platform && platform !== 'all') {
    filtered = filtered.filter(c => c.platform === platform);
  }

  // Sort
  switch (sortBy) {
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'popularity':
      filtered.sort((a, b) => b.enrolled - a.enrolled);
      break;
    case 'reviews':
      filtered.sort((a, b) => b.reviews - a.reviews);
      break;
    case 'newest':
      filtered.sort((a, b) => b.id - a.id);
      break;
    default: // relevance — keep current order
      break;
  }

  return filtered;
}
