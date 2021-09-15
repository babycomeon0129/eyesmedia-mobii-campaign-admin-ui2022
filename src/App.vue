<template>
  <div class="container index">
    <div class="row">
      <div id="nav">
        <AdminNav />
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminNav from '@/components/AdminNav.vue'

export default {
  name: 'App',
  components: {
    AdminNav
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.index {
  &.container {
    padding: 0;
  }
}


#nav {
  min-width: 350px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
