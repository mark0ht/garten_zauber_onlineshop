<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center">
      <header class="w-full bg-green-600 text-white p-4">
        <h1 class="text-3xl font-bold">Unser Sortiment</h1>
      </header>
  
      <main class="p-6 max-w-4xl w-full">
        <h2 class="text-center text-2xl font-semibold mb-4">Produkte</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="p-4 bg-white rounded-lg shadow-md hover:shadow-lg"
          >
            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.name"
              class="w-full h-48 object-cover rounded mb-4"
            />
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
  import { useSearchStore } from '~/store/search';
  
  // Example product images
  import product1Image from '~/assets/images/khaki-2723896_1280.jpg';
  import product2Image from '~/assets/images/man-6795191_1280.jpg';
  
  const cart = useCartStore();
  const searchStore = useSearchStore();
  
  const products = [
    { id: 1, name: 'Übergangsjacke1', price: 89.99, image: product1Image },
    { id: 2, name: 'Übergangsjacke2', price: 54.99, image: product2Image },
    // ... more products
  ];
  
  const addToCart = (product) => {
    cart.addToCart(product);
  };
  
  // Computed property filters products by the store's searchTerm
  const filteredProducts = computed(() => {
    if (!searchStore.searchTerm) {
      return products;
    }
    const term = searchStore.searchTerm.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(term)
    );
  });
  </script>
  