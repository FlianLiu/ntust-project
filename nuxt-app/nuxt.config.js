// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/ntust-project/'
  },
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
