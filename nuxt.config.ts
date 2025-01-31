// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/icon',
    'nuxt-headlessui',
  ],
  axios: {
    // Set your API base URL here, this can be different for development and production
    baseURL: 'http://localhost:3000', // Replace with your API base URL
  },
  tailwindcss: {
    config: {
      darkMode: 'class', // Enable class-based dark mode
      // Other Tailwind CSS configurations
    }
  }
})