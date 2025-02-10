<template>
    <div>
      <h2 class="text-2xl font-bold">User Dashboard</h2>
      <div class="grid grid-cols-3 gap-6 mt-6">
        <div class="p-4 bg-white shadow rounded-lg">
          <h2 class="text-xl font-bold">Orders</h2>
          <p class="text-3xl font-semibold">{{ stats.orders }}</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg">
          <h2 class="text-xl font-bold">Profile Completed</h2>
          <p class="text-3xl font-semibold">{{ stats.profileCompletion }}%</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  definePageMeta({
    layout: "dashboard", // Uses the dashboard layout
  });
  
  const stats = ref({ orders: 0, profileCompletion: 70 });
  
  onMounted(async () => {
    const res = await fetch("http://localhost:3005/user-dashboard");
    stats.value = await res.json();
  });
  </script>
  