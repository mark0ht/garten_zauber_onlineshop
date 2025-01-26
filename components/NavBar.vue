<template>
  <!-- Main navigation bar -->
  <nav class="flex justify-between items-center bg-green-600 text-white p-4 shadow-md">
    
    <!-- Link to homepage -->
    <a href="/" class="text-2xl font-bold">Frühlingswetter Onlineshop</a>

    <!-- Cart button with badge for item count -->
    <div class="relative">
      <a href="/cart" class="flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-full shadow hover:bg-gray-100">
        <span>Cart</span>
        <span class="bg-green-500 text-white rounded-full px-2 text-sm">{{ cartItemDisplay }}</span>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      cartItemCount: 0, // TODO: Later sync with Pinia
    };
  },
  computed: {
    // Computed property for better reaability
    cartItemDisplay() {
      return this.cartItemCount > 0 ? this.cartItemCount : "Empty";
    }
  },
  mounted() {
    try {
      // Simulated retrieval of cart item count with error handling
      this.cartItemCount = parseInt(localStorage.getItem("cartCount")) || 0;
    } catch (error) {
      console.error("Error retrieving cart count:", error);
      this.cartItemCount = 0;
    }
  },
};
</script>

<style scoped>
/* if more styles are needed u can define them here */
</style>

