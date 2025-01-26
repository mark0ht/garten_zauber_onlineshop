<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded-lg shadow">
      <!-- page   title -->
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
      
      <!-- registration form -->
      <form @submit.prevent="handleRegister">
        <!-- name input field -->
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Name</label>
          <input id="name" type="text" v-model="name" class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-600" required />
        </div>
        
        <!-- email input  field -->
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input id="email" type="email" v-model="email" class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-600" required />
        </div>
        
        <!-- passwoerd input field -->
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input id="password" type="password" v-model="password" class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-600" required />
        </div>
        
        <!-- register button -->
        <button type="submit" class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Register</button>
      </form>
      
      <!-- link to login page -->
      <p class="mt-4 text-center text-sm">
        already have an account?
        <NuxtLink to="/login" class="text-green-600 underline">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";
import { ref } from "vue";

// user store for handling authentication
const userStore = useUserStore();

// reactive variables for form fields
const name = ref("");
const email = ref("");
const password = ref("");

// function to handle registration
const handleRegister = async () => {
  try {
    await userStore.register({ name, email, password });
    alert("registration successful! you can now log in.");
  } catch (err) {
    alert(err.message); // show errdor message if registration fails
  }
};
</script>
