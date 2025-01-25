<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Checkout</h1>
    
    <div v-if="cart.length === 0" class="text-center text-gray-500">
      Your cart is empty.
    </div>

    <div v-else>
      <div class="border rounded-lg p-4 mb-6">
        <h2 class="text-xl font-semibold mb-2">Order Summary</h2>
        <ul>
          <li v-for="item in cart" :key="item.id" class="flex justify-between py-2">
            <span>{{ item.name }} (x{{ item.quantity }})</span>
            <span>{{ formatPrice(item.price * item.quantity) }}</span>
          </li>
        </ul>
        <hr class="my-2" />
        <div class="flex justify-between font-semibold">
          <span>Total:</span>
          <span>{{ formatPrice(total) }}</span>
        </div>
      </div>

      <form @submit.prevent="processCheckout" class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Shipping Details</h2>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Full Name</label>
          <input v-model="customer.name" type="text" required class="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="customer.email" type="email" required class="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Address</label>
          <input v-model="customer.address" type="text" required class="w-full px-3 py-2 border rounded-lg" />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Place Order
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

const customer = ref({
  name: '',
  email: '',
  address: ''
});

const formatPrice = (price) => `$${price.toFixed(2)}`;

const processCheckout = () => {
  alert('Order placed successfully!');
  cartStore.clearCart();
  router.push('/');
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
