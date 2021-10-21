<template>
  <el-tooltip content="編輯" placement="top">
    <el-button type="primary" icon="el-icon-edit" size="mini" @click="editData"></el-button>
  </el-tooltip>
</template>

<script setup>
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
// element UI
import { ElLoading } from 'element-plus';

const store = useStore();
const props = defineProps({
  editID: String
});

/** 編輯資料 */
const editData = () => {
  ElLoading.service({ fullscreen: true });
  axios.get(`${process.env.VUE_APP_campaignAPI}${store.state.campaign.apiVersion}/block/detail?type=${store.state.campaign.blockType}&id=${props.editID}`)
    .then(res => {
      ElLoading.service().close();
      if (res.data.errorCode === '996600001') {
        store.commit('campaign/SETTING_DIALOG', 'show');
        store.commit('campaign/SETTING_DIALOG', 'edit');
        const data = JSON.parse(res.data.data);
        // console.log(data);
        // console.log(store.getters['campaign/resType']);
        // console.log(data.block[store.getters['campaign/resType']]);
        store.commit('campaign/SETTING_EDIT_REQUEST', data.block[store.getters['campaign/resType']]);
      }
    });
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
