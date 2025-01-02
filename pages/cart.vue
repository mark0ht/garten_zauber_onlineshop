<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold">Warenkorb</h1>
      <div v-if="cartItems.length === 0" class="text-gray-500">
        Dein Warenkorb ist leer.
      </div>
      <div v-else>
        <div v-for="item in cartItems" :key="item.id" class="mb-2">
          <p>{{ item.name }} - {{ item.quantity }} x {{ item.price }}€</p>
          <button @click="removeFromCart(item.id)" class="text-red-500 hover:underline">
            Entfernen
          </button>
        </div>
        <p class="mt-4 font-bold">Gesamt: {{ totalPrice }}€</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCartStore } from '~/store/cart';
  
  // Zugriff auf den Warenkorb-Store
  const cart = useCartStore();
  const cartItems = computed(() => cart.items);
  const totalPrice = computed(() => cart.totalPrice);
  
  // Funktion zum Entfernen eines Produkts
  const removeFromCart = (productId) => {
    cart.removeFromCart(productId);
  };
  </script>
  
  <style scoped>
  /* Optional: Wie man es selbst haben möchte*/
  </style>
  