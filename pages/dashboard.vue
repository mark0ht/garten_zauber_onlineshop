<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white p-4 shadow-md">
      <div class="text-xl font-semibold text-gray-800">Dashboard</div>
      <nav class="mt-4">
        <ul>
          <li v-for="item in menuItems" :key="item.label" class="mb-2">
            <NuxtLink :to="item.link" class="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md">
              <component :is="item.icon" class="w-5 h-5 mr-2" />
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex flex-col flex-1">
      <!-- Navbar -->
      <header class="bg-white shadow-md p-4 flex items-center justify-between">
        <button @click="toggleSidebar" class="md:hidden p-2 text-gray-700">
          <Bars3Icon class="w-6 h-6" />
        </button>
        <div class="text-lg font-semibold">Dashboard</div>
      </header>

      <!-- Dashboard Content -->
      <main class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(stat, index) in stats" :key="index" class="bg-white p-4 shadow-md rounded-md">
            <div class="text-gray-600">{{ stat.label }}</div>
            <div class="text-2xl font-semibold">{{ stat.value }}</div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { HomeIcon, ChartBarIcon, Cog6ToothIcon, Bars3Icon } from '@heroicons/vue/24/outline';

const sidebarOpen = ref(false);
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const menuItems = [
  { label: 'Home', link: '/', icon: HomeIcon },
  { label: 'Analytics', link: '/analytics', icon: ChartBarIcon },
  { label: 'Settings', link: '/settings', icon: Cog6ToothIcon },
];

const stats = [
  { label: 'Users', value: '1,234' },
  { label: 'Sales', value: '$12,345' },
  { label: 'Orders', value: '567' },
];
</script>
