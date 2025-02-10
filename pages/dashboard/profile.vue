<template>
    <div>
      <h2 class="text-2xl font-bold">Profile</h2>
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useUserStore } from "~/store/user";
  
  definePageMeta({
    layout: "dashboard",
  });
  
  const userStore = useUserStore();
  const user = computed(() => userStore.user);
  </script>
  