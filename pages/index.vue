<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center">
    <!-- just a simple header to weelcome users -->
    <header class="w-full bg-green-700 text-white p-8 text-center shadow-lg rounded-b-3xl">
      <h1 class="text-5xl font-extrabold tracking-tight">willkommen bei frühlingswetter ecom</h1>
      <p class="text-lg mt-3 opacity-90">entdecken sie unsere neuesten produkte</p>
    </header>

    <!-- main product grid, basi cally a showcase of what we got -->
    <main class="p-10 max-w-7xl w-full">
      <h2 class="text-center text-4xl font-semibold mb-10 text-green-800">unsere produkte</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border border-green-200"
        >
          <!-- if there's an image, show it -->
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.name"
            class="w-full h-64 object-cover rounded-xl mb-5"
          />
          
          <!-- product name, gotta know what we're buying -->
          <h3 class="text-2xl font-bold text-gray-900">{{ product.name }}</h3>
          
          <!-- price ta , because we all care about that -->
          <p v-if="product.price" class="text-green-700 text-lg font-semibold mt-2">{{ product.price }}€</p>

          <div class="mt-5 flex justify-center">
            <!-- buy button if it's our product -->
            <button
              v-if="!product.externalLink"
              @click="addToCart(product)"
              class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md transition-all transform hover:scale-105"
            >
              in den warenkorb
            </button>

            <!-- or link to buy it somewhere else -->
            <a
              v-else
              :href="product.externalLink"
              target="_blank"
              class="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-xl shadow-md transition-all transform hover:scale-105"
            >
              extern kaufen
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '~/store/cart';
import { useSearchStore } from '~/store/search';

import product1Image from '~/assets/images/khaki-2723896_1280.jpg';
import product2Image from '~/assets/images/man-6795191_1280.jpg';

const cart = useCartStore();
const searchStore = useSearchStore();

// a basic list of products, nothing fancy
const products = [
  { id: 1, name: 'übergangsjacke1', price: 89.99, image: product1Image },
  { id: 2, name: 'übergangsjacke2', price: 54.99, image: product2Image },
  {
    id: 3,
    name: 'goldfruchtpalme von obi',
    price: 29.99,
    image: 'https://cdn.obi.de/product/images/6684419.jpg',
    description: 'höhe: 110-120 cm, topf: ca. 24 cm, areca dypsis lutescens',
    externalLink: 'https://www.obi.de/p/6684419/goldfruchtpalme-hoehe-110-120-cm-topf-ca-24-cm-areca-dypsis-lutescens'
  }
];

// simple function to add a product to the cart
const addToCart = (product) => {
  if (!product.externalLink) {
    cart.addToCart(product);
  }
};

// computed properrty to filter products based on search term
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

<style scoped>
/* tailwinddneeded */
</style>
