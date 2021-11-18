<template>
  <button
      class="btn btn-add"
      @click="addData"
    >
      <i class="el-icon-plus"></i>新增
    </button>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();

/** 新增資料 */
const addData = () => {
  // 先清空設定區塊資料的新增request
  store.commit('campaign/SETTING_ADD_REQUEST', null);
  store.commit('campaign/SETTING_DIALOG', 'show');
  store.commit('campaign/SETTING_DIALOG', 'add');
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
