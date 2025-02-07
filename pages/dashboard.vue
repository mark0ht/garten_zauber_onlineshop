<template>
    <div class="flex h-screen bg-gray-100">

      <Sidebar />
      <div class="flex-1 p-6">
        <Header title="Dashboard" />
  
        <div class="grid grid-cols-3 gap-6">
          <div class="p-4 bg-white shadow rounded-lg">
            <h2 class="text-xl font-bold">Total Users</h2>
            <p class="text-3xl font-semibold">{{ stats.users }}</p>
          </div>
          <div class="p-4 bg-white shadow rounded-lg">
            <h2 class="text-xl font-bold">Total Products</h2>
            <p class="text-3xl font-semibold">{{ stats.products }}</p>
          </div>
          <div class="p-4 bg-white shadow rounded-lg">
            <h2 class="text-xl font-bold">Orders</h2>
            <p class="text-3xl font-semibold">{{ stats.orders }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import Sidebar from "@/components/Sidebar.vue";
  import Header from "@/components/Header.vue";
  
  const stats = ref({ users: 0, products: 0, orders: 0 });
  
  onMounted(async () => {
    const res = await fetch("http://localhost:3005/dashboard-stats");
    stats.value = await res.json();
  });
  </script>
  