// This is the main layout file for the application. It is the first file that is loaded when the application starts.
It is the parent component for all other components in the application. The layout file is responsible for the overall
 structure of the application, including the header, footer, and navigation bar.
<template>
  <NuxtLayout>
    <NavBar />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import NavBar from '~/components/NavBar.vue';
</script>

<script>
export default {};
</script>
