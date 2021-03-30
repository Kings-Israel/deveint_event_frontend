<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
body, html {
  height: 100%;
  font-family: 'Roboto', sans-serif;
}
#app {
  background-color: rgb(123, 123, 123);
  height: 100%;
  padding-top: 50px;
}
</style>
