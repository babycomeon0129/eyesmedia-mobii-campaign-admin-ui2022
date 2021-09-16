<template>
  <div class="container index">
    <div id="header">
      <div class="logo">
        <img src="../public/images/logo.jpeg">
      </div>
      <div class="menu-switch">
        <i class="el-icon-s-fold" @click="isCollapse = true" v-if="!isCollapse"></i>
        <i class="el-icon-s-unfold" @click="isCollapse = false" v-if="isCollapse"></i>
      </div>
    </div>
    <main class="row">
      <div id="nav">
        <AdminNav :isCollapse="isCollapse" />
      </div>
      <div class="wrap">
        <transition name="el-fade-in">
          <router-view />
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
// @ is an alias to /src
import AdminNav from '@/components/AdminNav.vue'

export default {
  name: 'App',
  components: {
    AdminNav
  },
  setup(){
    const isCollapse = ref(false);
    return {
      isCollapse
    }
  }
}
</script>

<style lang="scss">
 @import '@/assets/styles/_vars';
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

#header {
  .menu-switch {
    padding: 0 .5em;
    display:flex ;
    align-items: center;
    i {
      font-size: x-large;
      &:hover {
        color: $default-color;
      }
    }
  }
}

.wrap {
  position: relative;
  padding: 1em;
  height: auto;
  flex-grow: 1;
}
</style>
