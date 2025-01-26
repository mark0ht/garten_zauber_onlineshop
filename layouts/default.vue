<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="bg-green-600 text-white p-4 shadow-md">
      <div class="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold hover:text-gray-200 transition">
          Frühlingswetter Shop
        </NuxtLink>

        <!-- Navigation -->
        <nav>
          <ul class="flex space-x-4">
            <li>
              <NuxtLink to="/" class="hover:text-gray-200 transition" active-class="font-bold underline">
                Startseite
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-gray-200 transition" active-class="font-bold underline">
                Über uns
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cart" class="hover:text-gray-200 transition" active-class="font-bold underline">
                Warenkorb
              </NuxtLink>
            </li>
            <li v-if="!isAuthenticated">
              <NuxtLink to="/login" class="hover:text-gray-200 transition" active-class="font-bold underline">
                Login
              </NuxtLink>
            </li>
            <li v-if="!isAuthenticated">
              <NuxtLink to="/register" class="hover:text-gray-200 transition" active-class="font-bold underline">
                Registrieren
              </NuxtLink>
            </li>
            <li v-if="isAuthenticated">
              <button @click="logout" class="hover:text-gray-200 transition font-bold">
                Logout
              </button>
            </li>
          </ul>
        </nav>

        <!-- Benutzerprofil & Suche -->
        <div class="flex items-center space-x-4">
          <SearchBar />

          <!-- Benutzerbild & Name -->
          <div v-if="isAuthenticated" class="flex items-center space-x-2 cursor-pointer">
            <img :src="user.avatar || '/default-avatar.png'" class="w-10 h-10 rounded-full border-2 border-white" alt="User Avatar">
            <span class="hidden md:inline text-white font-medium">{{ user.name }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto p-6">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white p-4 text-center">
      <p class="text-sm">© 2025 Frühlingswetter Shop von Markus Teichert - Alle Rechte vorbehalten.</p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '~/store/user';
import SearchBar from '~/components/SearchBar.vue';

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

footer {
  background-color: #1a202c;
}
</style>
