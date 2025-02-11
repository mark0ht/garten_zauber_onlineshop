<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div class="flex justify-between items-center border-b pb-4 mb-4">
        <h2 class="text-2xl font-semibold">Dashboard</h2>
        <div class="flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.653 0 5.152.735 7.121 2.004M12 11a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
        </div>
      </div>
      
      <div class="mb-6">
        <h3 class="text-xl font-semibold">Your Information</h3>
        <div v-if="user" class="mt-4 space-y-2">
          <div v-for="(value, key) in editableFields" :key="key" class="flex justify-between items-center">
            <span class="font-medium">{{ key }}</span>
            <input v-model="editableFields[key]" class="border p-2 rounded w-1/2" />
          </div>
          <button @click="updateUserInfo" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold">Last Order</h3>
        <div v-if="order" class="mt-4 p-4 border rounded">
          <p><strong>Order ID:</strong> {{ order.id }}</p>
          <p><strong>Status:</strong> {{ order.status }}</p>
          <p><strong>Amount:</strong> ${{ order.amount }}</p>
        </div>
        <p v-else class="text-gray-500">No recent orders found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useFetch } from '#app';

const user = ref(null);
const order = ref(null);
const heroicon = ref('https://api.dicebear.com/7.x/identicon/svg?seed=user');
const editableFields = ref({});

const fetchUserData = async () => {
  const { data } = await useFetch('http://localhost:3005/users');
  if (data.value && data.value.length) {
    user.value = data.value[0];
    editableFields.value = {
      Name: user.value.username,
      Email: user.value.email,
      Phone: user.value.phone || 'Not provided',
      Address: user.value.address || 'Not provided',
    };
  }
};

const fetchLastOrder = async () => {
  const { data } = await useFetch('http://localhost:3005/orders/last');
  if (data.value) {
    order.value = data.value;
  }
};

const updateUserInfo = async () => {
  await useFetch('http://localhost:3005/users/update', {
    method: 'POST',
    body: JSON.stringify(editableFields.value),
  });
  alert('User information updated!');
};

onMounted(() => {
  fetchUserData();
  fetchLastOrder();
});
</script>

<style scoped>
input {
  outline: none;
}
</style>
