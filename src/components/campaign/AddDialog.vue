<template>
  <div class="setting-dialog">
    <el-dialog
      :title="`新增${store.getters['campaign/blockTitle']}`"
      v-model="store.state.campaign.campaignDialog.add"
      width="60%"
      :show-close="false"
    >
      <form>
        <!-- 功能區 -->
        <AddIcon v-if="store.state.campaign.blockType === 'ICON'" />
        <AddAd v-if="store.state.campaign.blockType === 'AD'" />
        <AddCard v-if="store.state.campaign.blockType === 'CARD'" />
        <AddBanner v-if="store.state.campaign.blockType === 'BANNER'" />
        <AddVoucher v-if="store.state.campaign.blockType === 'VOUCHER'" />
        <AddProduct v-if="store.state.campaign.blockType === 'PRODUCT'" />
        <AddStore v-if="store.state.campaign.blockType === 'STORE'" />
        <AddWaterfall v-if="store.state.campaign.blockType === 'WATERFALL'" />
      </form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="blockAddData">確認</el-button>
          <el-button @click="closeAddData">關閉</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 功能區 -->
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
// element UI
import { ElMessage } from 'element-plus';
// component
import AddIcon from '@/components/campaign/AddIcon.vue';
import AddAd from '@/components/campaign/AddAd.vue';
import AddCard from '@/components/campaign/AddCard.vue';
import AddBanner from '@/components/campaign/AddBanner.vue';
import AddVoucher from '@/components/campaign/AddVoucher.vue';
import AddProduct from '@/components/campaign/AddProduct.vue';
import AddStore from '@/components/campaign/AddStore.vue';
import AddWaterfall from '@/components/campaign/AddWaterfall.vue';
import axios from 'axios';

const store = useStore();

/** 新增區塊資料 */
const blockAddData = () => {
  axios.post(`${process.env.VUE_APP_campaignAPI}${store.state.campaign.apiVersion}/block/add`, store.state.campaign.blockAddRequest)
    .then(res => {
      if (res.data.errorCode === '996600001') {
        const data = JSON.parse(res.data.data);
        console.log(data);
        store.commit('campaign/SETTING_BLOCK_LIST_DATA', {
          type: store.state.campaign.blockType,
          data: data.block.items
        });
        ElMessage.success({
          message: '新增成功',
          type: 'success',
        });
        store.commit('campaign/SETTING_DIALOG', 'show');
        store.commit('campaign/SETTING_DIALOG', 'add');
      } else {
        ElMessage.error(`errorCode:${res.data.errorCode}`);
      }
    });
}

/** 關閉視窗 */
const closeAddData = () => {
  store.commit('campaign/SETTING_DIALOG', 'show');
  store.commit('campaign/SETTING_DIALOG', 'add');
  store.commit('campaign/SETTING_ADD_REQUEST', null);
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
