<template>
  <NotifBar/>
  <router-view/>
</template>

<script>
import NotifBar from '@/components/NotifBar.vue'
export default {
  components: {
    NotifBar
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4E5166;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #FFD7D7;
}

nav a.router-link-exact-active {
  color: #FD2D01;
}
</style>
