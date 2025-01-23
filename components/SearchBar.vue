<template>
    <div class="relative">
      <!-- Search Input -->
      <input
        v-model="searchQuery"
        @input="onSearch"
        type="text"
        placeholder="Search products..."
        class="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <!-- Clear Button -->
      <button
        @click.prevent="clearSearch"
        class="absolute right-1 top-1 h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useSearchStore } from '~/store/search';
  
  // Access the search store
  const searchStore = useSearchStore();
  
  // Local ref that syncs with the store
  const searchQuery = ref(searchStore.searchTerm);
  
  // Called every time the input changes
  const onSearch = () => {
    searchStore.setSearchTerm(searchQuery.value);
  };
  
  // Clears the search input and store
  const clearSearch = () => {
    searchQuery.value = '';
    searchStore.clearSearchTerm();
  };
  </script>
  