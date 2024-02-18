<template>
  <div>
    <Header />
    <main><slot /></main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/globals/header.vue'
import Footer from '@/components/globals/footer.vue'
import '@/assets/styles/main.scss'

</script>
