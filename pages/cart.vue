<template>
  <!-- Full page contai ner with background color -->
  <div class="min-h-screen bg-gray-100">
    
    <!-- Simple header with a title -->
    <header class="p-4 bg-green-600 text-white text-center">
      <h1 class="text-2xl font-bold">Your Shopping Cart</h1>
    </header>

    <!-- Main content area -->
    <main class="p-6 max-w-4xl mx-auto">
      
      <!-- If there are items in the cart, show them -->
      <div v-if="cartItems.length">
        
        <!-- Loop tdhrough each cart item -->
        <div 
          v-for="item in cartItems" 
          :key="item.id" 
          class="flex items-center mb-4 bg-white p-4 shadow rounded"
        >
          <!-- Product   image -->
          <img 
            :src="item.image" 
            :alt="item.name" 
            class="w-24 h-24 object-cover rounded mr-4" 
          />
          
          <!-- Product name and price   -->
          <div class="flex-grow">
            <h2 class="text-lg font-semibold">{{ item.name }}</h2>
            <p class="text-gray-600">{{ item.price }}€</p>
          </div>
          
          <!-- Remove button -->
          <button 
            @click="removeItem(item.id)" 
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>

        <!-- Show total price at the bottom -->
        <p class="text-right text-lg font-bold">Total: {{ totalPrice }}€</p>
      </div>

      <!-- If cart is empty, show this message -->
      <div v-else>
        <p class="text-center text-gray-600">Your cart is empty!</p>
      </div>
   
    </main>
  </div>
</template>

<script setup>
import { useCartStore } from "~/store/cart"; // Import the cart store

const cartStore = useCartStore(); // Get the cart store

// Get the current cart items
const cartItems = computed(() => cartStore.items);


// Calculate the total price
const totalPrice = computed(() => cartStore.totalPrice);

// Remove an item from the cart
const removeItem = (id) => {
  cartStore.removeFromCart(id);
};
</script>
