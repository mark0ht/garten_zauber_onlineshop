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
        const response = await axios.post("http://localhost:3005/login", {
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
    async register({ email, password, name }) {
      try {
        // Log the request data
        console.log("Registering user with data:", { email, password, name });

        // Replace this with your actual API URL
        const response = await axios.post("http://localhost:3005/register", {
          email,
          password,
          name,
        });

        // Log the response data
        console.log("Registration response:", response.data);

        const { user, token } = response.data;

        // Store user data and token
        this.setUser(user, token);

        return true; // Success
      } catch (error) {
        // Log the error
        console.error("Registration error:", error);
        throw new Error("Registrierung fehlgeschlagen. Überprüfe deine Daten.");
      }
    },
    setUser(userData, token) {
      this.user = userData;
      this.token = token;

      // Custom replacer function to handle circular references
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
