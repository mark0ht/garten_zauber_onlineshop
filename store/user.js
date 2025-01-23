import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    users: [], // Mock user database
  }),
  actions: {
    async register({ name, email, password }) {
      // Simulate backend logic
      const existingUser = this.users.find((user) => user.email === email);
      if (existingUser) throw new Error("User already exists!");

      const newUser = { id: Date.now(), name, email, password };
      this.users.push(newUser);
      this.user = newUser;
    },

    async login({ email, password }) {
      const user = this.users.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) throw new Error("Invalid email or password!");

      this.user = user;
    },

    logout() {
      this.user = null;
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
