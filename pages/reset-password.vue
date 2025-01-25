<template>
    <!-- center everything vertically and horizontally -->
    <div class="flex flex-col items-center justify-center min-h-screen">
      
      <!-- tuitle page -->
      <h1 class="text-2xl font-bold">Neues Passwort setzen</h1>
  
      <!--  setting a new password -->
      <form @submit.prevent="resetPassword" class="bg-white p-6 rounded shadow-md">
        
        <!-- input field for the new password -->
        <input 
          v-model="newPassword" 
          type="password" 
          placeholder="Neues Passwort" 
          required 
          class="p-2 border rounded w-full" 
        />
  
        <!-- button for pwrset -->
        <button type="submit" class="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          Passwort zurücksetzen
        </button>
  
        <!-- message shows if error  -->
        <p v-if="message" class="text-green-500 mt-2">{{ message }}</p>
      </form>


    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  // Stores the new password entered by the user
  const newPassword = ref("");
  
  // Store messages (e.g., success or error messages)
  const message = ref("");
  
  // gget route information (needed to extract the token from the URL)
  const route = useRoute();
  const token = ref("");
  
  // when the page loads, get the token from the URL
  onMounted(() => {
    token.value = route.query.token || "";
  });
  
  // Function to send the new password to the backend
  const resetPassword = async () => {
    const response = await fetch("http://localhost:3001/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token.value, newPassword: newPassword.value }),
    });
  
    // the response message from the server
    const data = await response.json();
    message.value = data.message;
  };
  </script>
  