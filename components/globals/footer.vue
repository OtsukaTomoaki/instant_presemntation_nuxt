<template>
  <footer>
      <div class="insideContainer">
          <a href="https://www.google.com/"><img src="/images/github.svg" alt="logo"></a>
          <a href="https://www.google.com/"><img src="/images/twitter.svg" alt="logo"></a>
          <hr/>
          <NuxtLink to="/contact">Contact</NuxtLink>
          <p>©{{ new Date().getFullYear() }} BigMound26</p>
      </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
  footer {
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
  }

  .insideContainer {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  hr {
    width: 100%;
    margin: 1rem 0;
  }

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  img {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 768px) {
    .insideContainer {
      flex-direction: column;
    }
  }
</style>