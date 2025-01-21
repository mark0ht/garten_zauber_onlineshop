import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token,
  },
  actions: {
    setUser(userData, token) {
      this.user = userData;
      this.token = token;
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    loadUserFromStorage() {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        this.user = JSON.parse(storedUser);
        this.token = storedToken;
      }
    }
  },
})
