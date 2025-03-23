<template>
  <div id ="app">
  <router-view></router-view>
</div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
export default{
    components: {NavBar}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #F5F5F5;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
