// ===================================
// AUTH UTILITY — Signup, Login, Logout
// Uses localStorage for session management
// ===================================

import { getCurrentUser, saveUser, clearUser, getItem, setItem } from './storage.js';

const USERS_KEY = 'oa_all_users';

function getAllUsers() {
  return getItem(USERS_KEY) || [];
}

function saveAllUsers(users) {
  setItem(USERS_KEY, users);
}

/**
 * Sign up a new user
 * @returns {{ success: boolean, message: string, user?: object }}
 */
export function signup({ name, email, password, interests, skillLevel, careerGoal }) {
  const users = getAllUsers();
  
  if (users.find(u => u.email === email.toLowerCase())) {
    return { success: false, message: 'An account with this email already exists.' };
  }

  const user = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password, // In a real app, this would be hashed
    interests: interests || [],
    skillLevel: skillLevel || 'Beginner',
    careerGoal: careerGoal || '',
    joinedAt: new Date().toISOString(),
  };

  users.push(user);
  saveAllUsers(users);

  // Auto-login
  const sessionUser = { ...user };
  delete sessionUser.password;
  saveUser(sessionUser);

  return { success: true, message: 'Account created successfully!', user: sessionUser };
}

/**
 * Log in an existing user
 * @returns {{ success: boolean, message: string, user?: object }}
 */
export function login(email, password) {
  const users = getAllUsers();
  const user = users.find(u => u.email === email.toLowerCase().trim());

  if (!user) {
    return { success: false, message: 'No account found with this email.' };
  }
  if (user.password !== password) {
    return { success: false, message: 'Incorrect password.' };
  }

  const sessionUser = { ...user };
  delete sessionUser.password;
  saveUser(sessionUser);

  return { success: true, message: 'Welcome back!', user: sessionUser };
}

/**
 * Log out the current user
 */
export function logout() {
  clearUser();
}

/**
 * Check if a user is logged in
 */
export function isLoggedIn() {
  return getCurrentUser() !== null;
}

/**
 * Get the current session user
 */
export function getUser() {
  return getCurrentUser();
}

/**
 * Update user profile
 */
export function updateProfile(updates) {
  const user = getCurrentUser();
  if (!user) return { success: false, message: 'Not logged in.' };

  const updatedUser = { ...user, ...updates };
  saveUser(updatedUser);

  // Also update in the users list
  const users = getAllUsers();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...updates };
    saveAllUsers(users);
  }

  return { success: true, user: updatedUser };
}
