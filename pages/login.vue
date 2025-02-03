<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded-lg shadow">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input id="email" type="email" v-model="email" class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-600" required />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input id="password" type="password" v-model="password" class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-600" required />
        </div>
        <div class="mb-4">
          <label class="flex items-center">
            <input type="checkbox" v-model="rememberMe" class="mr-2" /> Remember Me
          </label>
        </div>
        <button type="submit" class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Login</button>
      </form>
      <p class="mt-4 text-center text-sm">
        Noch kein Konto?
        <NuxtLink to="/register" class="text-green-600 underline">Registrieren</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const userStore = useUserStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const rememberMe = ref(false);

const handleLogin = async () => {
  try {
    const response = await userStore.login({ email: email.value, password: password.value });
    localStorage.setItem("token", response.data.token);
    if (rememberMe.value && response.data.rememberToken) {
      localStorage.setItem("rememberToken", response.data.rememberToken);
    }
    alert("Login erfolgreich!");
    router.push("/");
  } catch (err) {
    alert(err.message);
  }
};

const autoLogin = async () => {
  const rememberToken = localStorage.getItem("rememberToken");
  if (rememberToken) {
    try {
      const response = await axios.post("http://localhost:3001/remember-me", {
        rememberToken,
      });
      email.value = response.data.email;
      alert("Auto-logged in as " + email.value);
      router.push("/");
    } catch (error) {
      console.log("Remember Me token expired or invalid");
      localStorage.removeItem("rememberToken");
    }
  }
};

onMounted(() => {
  autoLogin();
});
</script>
