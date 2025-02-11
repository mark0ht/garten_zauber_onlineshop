import { defineStore } from "pinia";

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
        const response = await fetch("http://localhost:3005/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error("Login fehlgeschlagen. Überprüfe deine Anmeldedaten.");
        }

        const { user, token } = await response.json();
        this.setUser(user, token);

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
    setUser(userData, token) {
      this.user = userData;
      this.token = token;

      // Prevent circular references in JSON
      const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
      };

      localStorage.setItem("user", JSON.stringify(userData, getCircularReplacer()));
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
