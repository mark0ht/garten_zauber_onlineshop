<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <h1 class="text-2xl font-bold">Passwort zurücksetzen</h1>
      <form @submit.prevent="requestReset" class="bg-white p-6 rounded shadow-md">
        <input v-model="email" type="email" placeholder="E-Mail-Adresse" required class="p-2 border rounded w-full" />
        <button type="submit" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Reset-Link anfordern</button>
        <p v-if="message" class="text-green-500 mt-2">{{ message }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const email = ref("");
  const message = ref("");
  
  const requestReset = async () => {
    try {
      const response = await fetch("http://localhost:3001/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.value }),
      });
      const data = await response.json();
      message.value = data.message;
    } catch (error) {
      message.value = "Fehler beim Senden des Links.";
    }
  };
  </script>
  