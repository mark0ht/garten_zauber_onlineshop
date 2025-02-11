<template>
    <div class="relative">
      <!-- search box -->
      <input
        v-model="searchQuery"
        @input="onSearch"
        type="text"
        placeholder="Suchen Sie hier Produkte..."
        class="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <!-- clear button to reset search -->
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

const searchStore = useSearchStore();

const searchQuery = ref(searchStore.searchTerm);

const onSearch = () => {
    searchStore.setSearchTerm(searchQuery.value);
};

const clearSearch = () => {
    searchQuery.value = '';
    searchStore.clearSearchTerm();
};
</script>
