<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <h1 class="text-2xl font-bold">Neues Passwort setzen</h1>
      <form @submit.prevent="resetPassword" class="bg-white p-6 rounded shadow-md">
        <input v-model="newPassword" type="password" placeholder="Neues Passwort" required class="p-2 border rounded w-full" />
        <button type="submit" class="mt-4 bg-green-500 text-white px-4 py-2 rounded">Passwort zurücksetzen</button>
        <p v-if="message" class="text-green-500 mt-2">{{ message }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  const newPassword = ref("");
  const message = ref("");
  const route = useRoute();
  const token = ref("");
  
  onMounted(() => {
    token.value = route.query.token || "";
  });
  
  const resetPassword = async () => {
    const response = await fetch("http://localhost:3001/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token.value, newPassword: newPassword.value }),
    });
    const data = await response.json();
    message.value = data.message;
  };
  </script>
  