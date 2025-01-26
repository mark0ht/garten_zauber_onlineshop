<template>
  <div class="container mx-auto p-6">
    <!-- checkout title -->
    <h1 class="text-2xl font-bold mb-4">checkout</h1>
    
    <!-- if cart is empty let the user -->
    <div v-if="cart.length === 0" class="text-center text-gray-500">
      your cart is empty.
    </div>

    <div v-else>
      <!-- order summary setion -->
      <div class="border rounded-lg p-4 mb-6">
        <h2 class="text-xl font-semibold mb-2">order summary</h2>
        <ul>
          <li v-for="item in cart" :key="item.id" class="flex justify-between py-2">
            <span>{{ item.name }} (x{{ item.quantity }})</span>
            <span>{{ formatPrice(item.price * item.quantity) }}</span>
          </li>
        </ul>
        <hr class="my-2" />
        <div class="flex justify-between font-semibold">
          <span>total:</span>
          <span>{{ formatPrice(total) }}</span>
        </div>
      </div>

      <!-- form for shiping details -->
      <form @submit.prevent="processCheckout" class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">shipping details</h2>
        
        <!-- full name input -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">full name</label>
          <input v-model="customer.name" type="text" required class="w-full px-3 py-2 border rounded-lg" />
        </div>
        
        <!-- email input -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">email</label>
          <input v-model="customer.email" type="email" required class="w-full px-3 py-2 border rounded-lg" />
        </div>
        
        <!-- address input -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">address</label>
          <input v-model="customer.address" type="text" required class="w-full px-3 py-2 border rounded-lg" />
        </div>
        
        <!-- place order button -->
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          place order
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/store/cart';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const cart = computed(() => cartStore.items);
const total = computed(() => cartStore.totalPrice);
const router = useRouter();

// store customer deta ails
const customer = ref({
  name: '',
  email: '',
  address: ''
});

// function to format price neatly
const formatPrice = (price) => `$${price.toFixed(2)}`;

// function to process the checkout
const processCheckout = () => {
  alert('order placed successfully!');
  cartStore.clearCart();
  router.push('/');
};
</script>

<style scoped>
/* keeping it simplee with max width */
.container {
  max-width: 600px;
}
</style>
