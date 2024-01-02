<template>
  <header>
    <div class="container">
      <div class="flexContainer">
        <ul>
          <li>
            <!-- <NuxtLink to="/contact">Contact</NuxtLink> -->
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
  header {
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .flexContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    display: flex;
    list-style: none;
  }

  li {
    margin-left: 1rem;
  }

  a {
    text-decoration: none;
    color: #000;
  }
</style>