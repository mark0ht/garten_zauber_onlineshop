<template>
  <nav class="flex justify-between items-center bg-green-600 text-white p-4 shadow-md">
    <!-- Link zur Startseite -->
    <a href="/" class="text-2xl font-bold">Frühlingswetter Shop</a>

    <!-- WK Button -->
    <div class="relative">
      <a
        href="/cart"
        class="flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-full shadow hover:bg-gray-100"
      >
        <span>Warenkorb</span>
        <span
          class="bg-green-500 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center"
        >
          {{ cartItems.length }}
        </span>
      </a>
    </div>
  </nav>
</template>

<script setup>
import { useCartStore } from '~/store/cart';

// shopping cart //
const cart = useCartStore();
const cartItems = computed(() => cart.items);
</script>

<style scoped>
/* imagine background for main page */
body {
  background-image: url('/images/dandelion-463928_1280.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* Additional styles */
</style>
