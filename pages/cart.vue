<template>
  <div class="min-h-screen bg-gray-100">
    <!-- basic cart page with a simple layout -->
    
    <!-- headersection -->
    <header class="p-4 bg-green-600 text-white text-center">
      <h1 class="text-2xl font-bold">your shopping cart</h1>
    </header>

    <!-- main content area -->
    <main class="p-6 max-w-4xl mx-auto">
      
      <!-- check if there are items -->
      <div v-if="cartItems.length">
        
        <!-- looping through each item in the cart -->
        <div 
          v-for="item in cartItems" 
          :key="item.id" 
          class="flex items-center mb-4 bg-white p-4 shadow rounded"
        >
          <!-- product image because visuals matter -->
          <img 
            :src="item.image" 
            :alt="item.name" 
            class="w-24 h-24 object-cover rounded mr-4" 
          />
          
          <!-- product name and price, so users know what they're getting -->
          <div class="flex-grow">
            <h2 class="text-lg font-semibold">{{ item.name }}</h2>
            <p class="text-gray-600">{{ item.price }}€</p>
          </div>
          
          <!-- button to remove the item from cart -->
          <button 
            @click="removeItem(item.id)" 
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            remove
          </button>
        </div>

        <!-- total pricee display -->
        <p class="text-right text-lg font-bold">total: {{ totalPrice }}€</p>
      </div>

      <!-- message when the cart is empty -->
      <div v-else>
        <p class="text-center text-gray-600">your cart is empty!</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useCartStore } from "~/store/cart"; // import the cart store

const cartStore = useCartStore(); // get the cart store

// computed property to get cart items
const cartItems = computed(() => cartStore.items);

// computed proprty to calculate total price
const totalPrice = computed(() => cartStore.totalPrice);

//remove an item from the cart
const removeItem = (id) => {
  cartStore.removeFromCart(id);
};
</script>
