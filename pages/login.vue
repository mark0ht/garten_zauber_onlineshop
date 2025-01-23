<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/index',
  },
})
</script>

<template>
  <Login />
</template>