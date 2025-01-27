import { defineStore } from "pinia";
import axios from "axios"; // Import axios for API requests

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token,
  },
  actions: {
    async login({ email, password }) {
      try {
        // Replace this with your actual API URL
        const response = await axios.post("https://your-api.com/login", {
          email,
          password,
        });

        const { user, token } = response.data;

        // Store user data and token
        this.setUser(user, token);

        return true; // Success
      } catch (error) {
        throw new Error("Login fehlgeschlagen. Überprüfe deine Anmeldedaten.");
      }
    },
    setUser(userData, token) {
      this.user = userData;
      this.token = token;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    loadUserFromStorage() {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      if (storedUser && storedToken) {
        this.user = JSON.parse(storedUser);
        this.token = storedToken;
      }
    },
  },
});
