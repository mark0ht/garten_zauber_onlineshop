<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <!-- main heading for password reset -->
      <h1 class="text-2xl font-bold">Passwort zurücksetzen</h1>
      
      <!-- form for password reset request -->
      <form @submit.prevent="requestReset" class="bg-white p-6 rounded shadow-md">
        <!-- input field for email -->
        <input v-model="email" type="email" placeholder="E-Mail-Adresse" required class="p-2 border rounded w-full" />
        
        <!-- button to request reset link -->
        <button type="submit" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Reset-Link anfordern</button>
        
        <!-- message for success or error feedback -->
        <p v-if="message" class="text-green-500 mt-2">{{ message }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // reactive variables to store email input and response message
  const email = ref("");
  const message = ref("");
  
  // function to handle password reset request
  const requestReset = async () => {
    try {
      const response = await fetch("http://localhost:3001/request-reset", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.value }),
      });
      const data = await response.json();
      message.value = data.message; // show success message if request is successful
    } catch (error) {
      message.value = "fehler beim senden des links."; // handle error scenario
    }
  };
  </script>
  