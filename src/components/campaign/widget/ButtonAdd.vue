<template>
  <button
      class="btn btn-add"
      @click="store.commit('campaign/SETTING_DIALOG', 'show');store.commit('campaign/SETTING_DIALOG', 'add')"
    >
      <i class="el-icon-plus"></i>新增
    </button>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
