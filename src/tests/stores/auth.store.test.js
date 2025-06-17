import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '../../stores/auth.js';

// Mock the router module
vi.mock('../../router/index.js', () => ({
  default: {
    push: vi.fn(),
    beforeEach: vi.fn()
  }
}));

describe('Auth Store', () => {
  beforeEach(() => {
    // Setup Pinia
    setActivePinia(createPinia());

    // Mock localStorage
    const localStorageMock = {
      store: {},
      getItem(key) {
        return this.store[key] || null;
      },
      setItem(key, value) {
        this.store[key] = value.toString();
      },
      removeItem(key) {
        delete this.store[key];
      },
      clear() {
        this.store = {};
      }
    };
    global.localStorage = localStorageMock;
  });

  it('logs in with valid credentials', async () => {
    const store = useAuthStore();
    await store.login({ username: 'admin', password: '123' });
    expect(store.token).toBe('mock-jwt-token-123');
    expect(store.user).toEqual({ username: 'admin' });
    expect(localStorage.getItem('jwt')).toBe('mock-jwt-token-123');
  });

  it('throws error on invalid credentials', async () => {
    const store = useAuthStore();
    await expect(store.login({ username: 'wrong', password: 'wrong' }))
      .rejects.toThrow('Invalid credentials');
    expect(store.token).toBeNull();
    expect(localStorage.getItem('jwt')).toBeNull();
  });

  it('logs out correctly', () => {
    const store = useAuthStore();
    // Simulate logged in state
    store.token = 'test-token';
    store.user = { username: 'admin' };
    localStorage.setItem('jwt', 'test-token');
    
    store.logout();
    
    expect(store.token).toBeNull();
    expect(store.user).toBeNull();
    expect(localStorage.getItem('jwt')).toBeNull();
  });
});