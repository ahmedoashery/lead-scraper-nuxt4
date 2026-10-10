export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  devtools: { enabled: true },

  modules: ['@nuxt/ui'],

  css: ['~/assets/css/main.css'],

  ui: {
    colorMode: true,
    global: true
  },

  runtimeConfig: {
    public: {
      n8nWebhook: ''
    }
  },

  app: {
    head: {
      title: 'Dynamic Lead Scraper Control',
      meta: [
        {
          name: 'description',
          content: 'Dynamic lead scraper control dashboard connected to n8n workflows.'
        }
      ]
    }
  }
})
