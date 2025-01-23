<template>
    <div class="min-h-screen bg-gray-100">
        <header class="p-4 bg-green-600 text-white text-center">
            <h1 class="text-2xl font-bold">Product Details</h1>
        </header>
        <main class="p-6 max-w-4xl mx-auto">
            <div v-if="product">
                <div class="flex items">
                    <!-- Product details go here -->
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            product: null // Define the product property
        };
    },
    created() {
        // Fetch product details here
    }
};
</script>