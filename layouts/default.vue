<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <!-- header with modern navigation -->
    <header class="bg-green-700 text-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto flex justify-between items-center p-4">
        <!-- logo -->
        <NuxtLink to="/" class="text-3xl font-bold hover:text-gray-200 transition flex items-center">
          Frühlingswetter Shop
        </NuxtLink>

        <!-- navigation -->
        <nav class="hidden md:flex space-x-6 text-lg">
          <NuxtLink to="/" class="hover:text-gray-300 transition flex items-center" active-class="font-bold underline">
            <HomeIcon class="w-5 h-5 mr-1" />
            Startseite
          </NuxtLink>
          <NuxtLink to="/about" class="hover:text-gray-300 transition flex items-center" active-class="font-bold underline">
            <InformationCircleIcon class="w-5 h-5 mr-1" />
            Über uns
          </NuxtLink>
          <NuxtLink to="/cart" class="hover:text-gray-300 transition flex items-center" active-class="font-bold underline">
            <ShoppingCartIcon class="w-5 h-5 mr-1" />
            Warenkorb
          </NuxtLink>
          <NuxtLink to="/checkout" class="hover:text-gray-300 transition flex items-center" active-class="font-bold underline">
            <CreditCardIcon class="w-5 h-5 mr-1" />
            Checkout
          </NuxtLink>
          <NuxtLink v-if="isAuthenticated" to="/dashboard" class="hover:text-gray-300 transition flex items-center font-bold">
            <UserIcon class="w-5 h-5 mr-1" />
            Dashboard
          </NuxtLink>
        </nav>

        <!-- user profile dropdown & search -->
        <div class="flex items-center space-x-4">
          <SearchBar class="hidden md:block bg-white text-gray-900 px-4 py-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500" />

          <!-- user dropdown -->
          <div v-if="isAuthenticated" class="relative group cursor-pointer">
            <div class="flex items-center space-x-2">
              <img :src="user.avatar || '/default-avatar.png'" class="w-10 h-10 rounded-full border-2 border-white shadow-lg" alt="User Avatar">
              <span class="hidden md:inline text-white font-medium">{{ user.name }}</span>
            </div>
            <!-- dropdown menu -->
            <div class="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-lg shadow-lg hidden group-hover:block">
              <NuxtLink to="/profile" class="block px-4 py-2 hover:bg-gray-100 flex items-center">
                <UserCircleIcon class="w-5 h-5 mr-2" />
                Mein Profil
              </NuxtLink>
              <button @click="logout" class="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                <ArrowRightOnRectangleIcon class="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>

          <NuxtLink v-if="!isAuthenticated" to="/login" class="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition flex items-center">
            <ArrowLeftOnRectangleIcon class="w-5 h-5 mr-2" />
            Login
          </NuxtLink>
          <NuxtLink v-if="!isAuthenticated" to="/register" class="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-700 transition flex items-center">
            <UserPlusIcon class="w-5 h-5 mr-2" />
            Registrieren
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- main content -->
    <main class="flex-grow container mx-auto p-8 bg-white shadow-md rounded-lg mt-6">
      <NuxtPage />
    </main>

    <!-- footer -->
    <footer class="bg-gray-800 text-white p-6 text-center text-sm mt-6 shadow-md">
      © 2025 Frühlingswetter Shop von Markus Teichert - Alle Rechte vorbehalten.
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '~/store/user';
import SearchBar from '~/components/SearchBar.vue';

// Heroicons v2 Import
import { HomeIcon, InformationCircleIcon, ShoppingCartIcon, CreditCardIcon, UserIcon, UserCircleIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, UserPlusIcon } from '@heroicons/vue/24/solid';

const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.isAuthenticated);
const user = computed(() => userStore.user);

const logout = () => {
  userStore.logout();
};
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 50;
}
</style>
