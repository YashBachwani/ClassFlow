// src/utils/auth.js

// Save logged-in user session
export const saveActiveUser = (user) => {
  localStorage.setItem("activeUser", JSON.stringify(user));
};

// Get currently active user
export const getActiveUser = () => {
  return JSON.parse(localStorage.getItem("activeUser"));
};

// Check if any user is logged in
export const isUserLoggedIn = () => {
  return !!localStorage.getItem("activeUser");
};

// Logout and redirect to signup
export const logoutUser = (navigate) => {
  localStorage.removeItem("activeUser");
  navigate("/signup");
};

// Save user after signup
export const saveUserData = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Get stored user data (for login comparison)
export const getStoredUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
