<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded-lg shadow">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
      <p class="mt-4 text-center text-sm">
        Don't have an account?
        <NuxtLink to="/register" class="text-green-600 underline">Register</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";
import { ref } from "vue";

const userStore = useUserStore();
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    await userStore.login({ email, password });
    alert("Login successful!");
  } catch (err) {
    alert(err.message);
  }
};
</script>
