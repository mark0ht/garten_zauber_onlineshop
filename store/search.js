import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchTerm: ''
  }),
  actions: {
    setSearchTerm(term) {
      this.searchTerm = term;
    },
    clearSearchTerm() {
      this.searchTerm = '';
    }
  }
});
