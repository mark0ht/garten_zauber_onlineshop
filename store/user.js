import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
    rememberToken: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token,
  },
  actions: {
    async login({ email, password, rememberMe }) {
      try {
        const response = await fetch("http://localhost:3005/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, rememberMe }),
        });

        if (!response.ok) {
          throw new Error("Login fehlgeschlagen. Überprüfe deine Anmeldedaten.");
        }

        const { user, token, rememberToken } = await response.json();
        this.setUser(user, token, rememberToken);

        return true; // Success
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async register({ email, password, name }) {
      try {
        console.log("Registering user with data:", { email, password, name });

        const response = await fetch("http://localhost:3005/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });

        if (!response.ok) {
          throw new Error("Registrierung fehlgeschlagen. Überprüfe deine Daten.");
        }

        const { user, token } = await response.json();
        this.setUser(user, token);

        return true; // Success
      } catch (error) {
        console.error("Registration error:", error);
        throw new Error(error.message);
      }
    },
    setUser(userData, token, rememberToken) {
      this.user = JSON.parse(JSON.stringify(userData)); // Ensure userData is a plain object
      this.token = token;
      this.rememberToken = rememberToken;
      localStorage.setItem("user", JSON.stringify(this.user));
      localStorage.setItem("token", token);
      if (rememberToken) {
        localStorage.setItem("rememberToken", rememberToken);
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.rememberToken = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("rememberToken");
    },
    loadUserFromStorage() {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      const storedRememberToken = localStorage.getItem("rememberToken");
      if (storedUser && storedToken) {
        this.user = JSON.parse(storedUser);
        this.token = storedToken;
        this.rememberToken = storedRememberToken;
      }
    },
  },
});