<template>
  <el-popconfirm
    confirm-button-text="刪除"
    cancel-button-text="取消"
    icon="el-icon-info"
    icon-color="red"
    title="確定要刪除嗎？"
    @confirm="delData"
  >
    <template #reference>
      <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
    </template>
  </el-popconfirm>
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
