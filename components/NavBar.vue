<template>
  <!-- Main navigation bar -->
  <nav class="flex justify-between items-center bg-green-600 text-white p-4 shadow-md">
    
    <!-- Link  homepage -->
    <NuxtLink to="/" class="text-2xl font-bold hover:text-gray-200 transition">
      Frühlingswetter eCom
    </NuxtLink>

    <!-- Navigation Links -->
    <div class="space-x-4">
      <NuxtLink to="/about" class="hover:text-gray-300" active-class="font-bold underline">Über uns</NuxtLink>
      <NuxtLink to="/cart" class="hover:text-gray-300" active-class="font-bold underline">Warenkorb</NuxtLink>
      <NuxtLink to="/checkout" class="hover:text-gray-300" active-class="font-bold underline">Checkout</NuxtLink>
      <NuxtLink v-if="!isAuthenticated" to="/login" class="hover:text-gray-300" active-class="font-bold underline">Login</NuxtLink>
      <NuxtLink v-if="!isAuthenticated" to="/register" class="hover:text-gray-300" active-class="font-bold underline">Registrieren</NuxtLink>
      <button v-if="isAuthenticated" @click="logout" class="hover:text-gray-300 font-bold">Logout</button>
    </div>

    <!-- Cart button with badge for item count -->
    <div class="relative">
      <NuxtLink to="/cart" class="flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-full shadow hover:bg-gray-100">
        <span>Einkaufstüte</span>
        <span class="bg-green-500 text-white rounded-full px-2 text-sm">{{ cartItemDisplay }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '~/store/user';

const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.isAuthenticated);

const logout = () => {
  userStore.logout();
};

const cartItemCount = computed(() => {
  try {
    return parseInt(localStorage.getItem("cartCount")) || 0;
  } catch (error) {
    console.error("Error retrieving cart count:", error);
    return 0;
  }
});

const cartItemDisplay = computed(() => cartItemCount.value > 0 ? cartItemCount.value : "0");
</script>

<style scoped>
/* tailwindcss styles can be added herre */
</style>
