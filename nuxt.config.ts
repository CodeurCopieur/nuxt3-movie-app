// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {    
    head: {      
      charset: 'utf-16',      
      viewport: 'width=device-width, initial-scale=1',      
      title: 'Movie Website | Nuxt 3 and Themoviedb',      
      meta: [
      { name: 'keywords', content: 'Nuxt, themoviedb, VueJS'},             
      { name: 'description', content: 'Movie Website with Nuxt 3 and Themoviedb' } ,
      { name: 'author', content: 'Widdy Louis'},
      { name: 'copyright', content: '© Copyright 2020 - Widdy Louis'},
    
      { property: "og:title",  content: 'Movie Website with Nuxt 3'},
      { property: "og:type",  content: 'website'},],
      
      link: [
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'}
      ],
      bodyAttrs: {    class: 'min-h-screen'  },
    },
  },  
  runtimeConfig: {
    public: {
      baseUrl: "https://api.themoviedb.org/3/",
      currencyKey: process.env.CURRENCY_API_KEY || process.env.API_KEY,
    },
    
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-swiper'],
})
