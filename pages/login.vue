<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-semibold text-center mb-4">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input v-model="email" type="email" required class="w-full p-2 border rounded" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700">Password</label>
          <input v-model="password" type="password" required class="w-full p-2 border rounded" />
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          anmelden
        </button>

        <p v-if="errorMessage" class="text-red-500 text-center mt-2">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFetch } from '#app';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
  const { data, error } = await useFetch('http://localhost:3005/login', {
    method: 'POST',
    body: JSON.stringify({ email: email.value, password: password.value }),
  });

  if (error.value) {
    errorMessage.value = "Invalid credentials. Please try again.";
    return;
  }

  if (data.value?.token) {
    localStorage.setItem('authToken', data.value.token);
    router.push('/dashboard'); // Redirect to dashboard
  } else {
    errorMessage.value = "Login failed. Please check your credentials.";
  }
};
</script>
