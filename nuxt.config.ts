// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/image"],
  vite: {
    build: {
      target: ['esnext', 'es2022', 'edge88','edge89', 'firefox89', "chrome87","chrome88",'chrome89','safari15', 'safari15']
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
})
