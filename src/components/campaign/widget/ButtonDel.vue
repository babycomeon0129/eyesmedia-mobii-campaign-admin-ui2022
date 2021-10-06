<template>
  <el-tooltip content="刪除資料" placement="top">
    <el-button type="danger" icon="el-icon-delete" size="mini" @click="delData"></el-button>
  </el-tooltip>
</template>

<script setup>
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
// element UI
import { ElMessage, ElLoading } from 'element-plus';

const store = useStore();
const props = defineProps({
  delID: String,
  idx: Number
});

/** 刪除資料 */
const delData = () => {
  ElLoading.service({ fullscreen: true });
  axios.delete(`${process.env.VUE_APP_campaignAPI}${store.state.campaign.apiVersion}/block/delete?id=${props.delID}&type=${store.state.campaign.blockType}`)
    .then(res => {
      ElLoading.service().close();
      if (res.data.errorCode === '996600001') {
        ElMessage.success({
          message: '刪除成功',
          type: 'success',
        });
        store.commit('campaign/DEL_BLOCK_LIST_DATA', {
          type: store.state.campaign.blockType,
          index: props.idx
        });
      } else {
        ElMessage.error(`errorCode:${res.data.errorCode}`);
      }
    })
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
