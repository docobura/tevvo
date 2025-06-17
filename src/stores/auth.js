import { defineStore } from 'pinia';
 import { ref } from 'vue';
import router from '../router/index'; // Adjust the path as necessary

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('jwt') || null);
  const error = ref(null);
  const timeoutId = ref(null);
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

  // Set timeout for automatic logout
  const setAuthTimeout = () => {
    clearTimeout(timeoutId.value); // Clear any existing timeout
    timeoutId.value = setTimeout(() => {
      logout();
      console.log('Session expired due to inactivity');
    }, SESSION_TIMEOUT);
  };

  // Reset timeout on user activity
  const resetAuthTimeout = () => {
    if (token.value) {
      setAuthTimeout();
    }
  };

  // Setup activity listeners
 const setupActivityListeners = () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', resetAuthTimeout);
    window.addEventListener('keypress', resetAuthTimeout);
    window.addEventListener('scroll', resetAuthTimeout);
  }
};

const cleanupActivityListeners = () => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', resetAuthTimeout);
    window.removeEventListener('keypress', resetAuthTimeout);
    window.removeEventListener('scroll', resetAuthTimeout);
  }
};

  const login = async (credentials) => {
    try {
      if (credentials.username === 'admin' && credentials.password === '123') {
        const mockToken = 'mock-jwt-token-123';
        token.value = mockToken;
        user.value = { username: credentials.username };
        localStorage.setItem('jwt', mockToken);
        
        setAuthTimeout();
        setupActivityListeners();
        
        router.push('/');
        return true;
      }
      throw new Error('Invalid credentials');
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const logout = () => {
    clearTimeout(timeoutId.value);
    cleanupActivityListeners();
    token.value = null;
    user.value = null;
    localStorage.removeItem('jwt');
    router.push('/login');
  };

const initializeSession = () => {
  if (token.value) {
    setAuthTimeout();
    setupActivityListeners();
  }
};

const stopSession = () => {
  clearTimeout(timeoutId.value);
  cleanupActivityListeners();
};


return {
  user,
  token,
  error,
  login,
  logout,
  SESSION_TIMEOUT,
  initializeSession, // 👈 call from App.vue or main component
  stopSession         // 👈 call from beforeUnmount if needed
};
});