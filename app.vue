<!--

  This Vue component serves as the main layout for the application. It includes:
  - A NavBar component for the navigation bar.
  - A NuxtPage component to render the main content of the page.

  Components:
  - NavBar: The navigation bar component imported from '~/components/NavBar.vue'.
  - NuxtPage: A placeholder for the main content of the page, rendered by Nuxt.js.

  Usage:
  - This component is used as the main layout wrapper in a Nuxt.js application.
-->
<template>
  <div class="flex flex-col min-h-screen">
    <!-- Global Navigation -->
    <NavBar />

    <!-- Main Content -->
    <main class="flex-grow container mx-auto p-6">
      <NuxtPage />
    </main>

    <!-- Footer    -->
    <Footer />
  </div>
</template>

<script setup>
import NavBar from "~/components/NavBar.vue";
import Footer from "~/components/Footer.vue";
</script>

<style>
/* gglobal styles customized or customisable */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f9fafb;
}
</style>
