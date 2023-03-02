// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  modules: [
    '@pinia/nuxt',
  ]
})
