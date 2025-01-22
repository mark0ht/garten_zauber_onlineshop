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
          <p v-if="product.price" class="text-gray-600 mb-4">{{ product.price }}€</p>

          <div class="mt-4">
            <button
              v-if="!product.externalLink"
              @click="addToCart(product)"
              class="bg-blue-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Warenkorb hinzufügen
            </button>

            <a
              v-else
              :href="product.externalLink"
              target="_blank"
              class="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded inline-block text-center"
            >
              Extern kaufen
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

// Import product images
import product1Image from '~/assets/images/khaki-2723896_1280.jpg';
import product2Image from '~/assets/images/man-6795191_1280.jpg';

const cart = useCartStore();
const searchStore = useSearchStore();

const products = [
  { id: 1, name: 'Übergangsjacke1', price: 89.99, image: product1Image },
  { id: 2, name: 'Übergangsjacke2', price: 54.99, image: product2Image },
  {
    id: 3,
    name: 'Goldfruchtpalme',
    price: 29.99,
    image: 'https://cdn.obi.de/product/images/6684419.jpg',
    description: 'Höhe: 110-120 cm, Topf: ca. 24 cm, Areca Dypsis Lutescens',
    externalLink: 'https://www.obi.de/p/6684419/goldfruchtpalme-hoehe-110-120-cm-topf-ca-24-cm-areca-dypsis-lutescens'
  }
];

const addToCart = (product) => {
  if (!product.externalLink) {
    cart.addToCart(product);
  }
};

// Product filtering based on search term
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
