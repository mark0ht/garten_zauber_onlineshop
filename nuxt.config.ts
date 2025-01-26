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
  tailwindcss: {
    config: {
      darkMode: 'class', // Enable class-based dark mode
      // Other Tailwind CSS configurations
    }
  }
})