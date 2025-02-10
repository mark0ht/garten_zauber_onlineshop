<template>
    <div class="flex h-screen bg-gray-100">
      <aside class="w-64 bg-gray-800 text-white h-full p-4">
        <h2 class="text-lg font-bold mb-4">User Dashboard</h2>
        <ul class="space-y-3">
          <li>
            <NuxtLink to="/dashboard" class="block p-2 hover:bg-gray-700 rounded">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/dashboard/profile" class="block p-2 hover:bg-gray-700 rounded">Profile</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/dashboard/orders" class="block p-2 hover:bg-gray-700 rounded">Orders</NuxtLink>
          </li>
          <li>
            <button @click="logout" class="w-full text-left p-2 bg-red-500 hover:bg-red-700 rounded">Logout</button>
          </li>
        </ul>
      </aside>
  
      
      <div class="flex-1 p-6">
        <header class="bg-white shadow p-4 mb-4 flex justify-between items-center">
          <h1 class="text-xl font-bold">User Dashboard</h1>
          <span class="text-gray-600">Welcome, {{ user.name }}</span>
        </header>
  
        <NuxtPage />
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from "vue";
  import { useUserStore } from "~/store/user";
  import { useRouter } from "vue-router";
  
  const userStore = useUserStore();
  const router = useRouter();
  const user = computed(() => userStore.user);
  
  onMounted(() => {
    if (!userStore.isAuthenticated) {
      router.push("/login");
    }
  });
  
  const logout = () => {
    userStore.logout();
    router.push("/login");
  };
  </script>
  