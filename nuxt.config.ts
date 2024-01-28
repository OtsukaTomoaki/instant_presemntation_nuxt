// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/image"],
  buildModules: [
    "@nuxt/typescript-build"
  ],
  vite: {
    build: {
      target: ['esnext', 'es2022']
    },
    esbuild: {
      target: "es2022"
    },
    optimizeDeps:{
      esbuildOptions: {
        target: "es2022",
      }
    }
  },
  nitro: {
    esbuild: {
      options: {
        // Node.js のバージョンのみ指定すればOK
        target: 'esnext'
      },
    },
  },
  build: {
    transpile: [/vuetify/]
  },
  css: ['@/assets/styles/main.scss'],
})
