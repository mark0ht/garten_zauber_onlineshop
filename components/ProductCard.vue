<template>
    <div class="border rounded-lg p-4 shadow-md">
      <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded-md" />
      <h3 class="text-lg font-semibold mt-2">{{ product.name }}</h3>
      <p v-if="product.description" class="text-gray-600">{{ product.description }}</p>
      <p class="text-xl font-bold mt-2">{{ product.price }} €</p>
  
      <div class="mt-4">
        <NuxtLink v-if="!product.externalLink" :to="`/product/${product.id}`" class="bg-blue-500 text-white px-4 py-2 rounded">
          Details ansehen
        </NuxtLink>
        <a v-else :href="product.externalLink" target="_blank" class="bg-green-500 text-white px-4 py-2 rounded">
          Extern kaufen
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    product: Object
  });
  </script>
  