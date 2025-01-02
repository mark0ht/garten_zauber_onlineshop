<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center">
      <header class="w-full bg-green-600 text-white p-4">
        <h1 class="text-3xl font-bold">Unser Sortiment</h1>
      </header>
  
      <main class="p-6 max-w-4xl w-full">
        <h2 class="text-2xl font-semibold mb-4">Produkte</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="product in products"
            :key="product.id"
            class="p-4 bg-white rounded-lg shadow-md hover:shadow-lg"
          >
            <h3 class="text-lg font-bold">{{ product.name }}</h3>
            <p class="text-gray-600 mb-4">{{ product.price }}€</p>
            <button
              @click="addToCart(product)"
              class="bg-blue-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Warenkorb hinzufügen
            </button>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { useCartStore } from '~/store/cart';
  
  // some products
  const products = [
    { id: 1, name: 'Produkt 1', price: 89.99 },
    { id: 2, name: 'Produkt 2', price: 54.99 },
  ];
  
  // access to the cart store
  const cart = useCartStore();
  const addToCart = (product) => {
    cart.addToCart(product);
  };
  </script>
  