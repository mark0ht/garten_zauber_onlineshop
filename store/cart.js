// store/cart.js
import { defineStore } from 'pinia';

// creating a cart store using pinia
export const useCartStore = defineStore('cart', {
  
  // the state (where all the daata is stored)
  state: () => ({
    items: [], // an empty array to store cart items//
  }),

  // actions (functions that change the state)
  actions: {
    
    // add an item to the cart
    addToCart(product) {
      // check if the item is already in the cart
      const existing = this.items.find(item => item.id === product.id);
      
      if (existing) {
        // if it's already there, just increase the quantity
        existing.quantity += 1;
      } else {
        // otherwise, add it as a new item with quantity 1
        this.items.push({ ...product, quantity: 1 });
      }
    },

    // remove an item from the cart
    removeFromCart(productId) {
      // keep only the items that don’t match the given id
      this.items = this.items.filter(item => item.id !== productId);
    },

    // clear the entire cart
    clearCart() {
      this.items = []; // just empty the array
    },
  },

  // gettters (computed values based on the state)
  getters: {
    
    // get the total number of items in the cart
    totalItems() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    // get the total price of all ite ms in the cart
    totalPrice() {
      return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
});
