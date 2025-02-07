<template>
    <header class="p-4 bg-white shadow flex justify-between items-center">
      <h1 class="text-2xl font-bold">{{ title }}</h1>
      <button class="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </header>
  </template>
  
  <script setup>
  defineProps(["title"]);
  </script>
  