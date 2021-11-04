<template>
  <div class="setting-dialog">
    <el-dialog
      :title="`新增${store.getters['campaign/blockTitle']}`"
      v-model="store.state.campaign.campaignDialog.add"
      width="60%"
      :show-close="false"
      destroy-on-close
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
          <el-button type="primary" @click="blockAddData" :disabled="!isSend">確認</el-button>
          <el-button @click="closeAddDialog">關閉</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 功能區 -->
  </div>
</template>

<script setup>
import { computed } from 'vue-demi';
import { useStore } from 'vuex';
import axios from 'axios';
// element UI
import { ElMessage, ElLoading } from 'element-plus';
// component
import AddIcon from '@/components/campaign/AddIcon.vue';
import AddAd from '@/components/campaign/AddAd.vue';
import AddCard from '@/components/campaign/AddCard.vue';
import AddBanner from '@/components/campaign/AddBanner.vue';
import AddVoucher from '@/components/campaign/AddVoucher.vue';
import AddProduct from '@/components/campaign/AddProduct.vue';
import AddStore from '@/components/campaign/AddStore.vue';
import AddWaterfall from '@/components/campaign/AddWaterfall.vue';


const store = useStore();

/** 確認按鈕開關 */
let isSend = computed(() => {
  if (store.getters['campaign/getAddRequest'] !== null) {
    switch (store.getters['campaign/resType']) {
      // ICON、置頂Banner、中間廣告
      case 'items':
        // 如果名稱跟圖片為空，確認按鈕disabled
        if (store.getters['campaign/getAddRequest'].block.items[0].mktEventItemName === '' || store.getters['campaign/getAddRequest'].block.items[0].mktEventItemImg === '') {
          return false;
        } else {
          return true;
        }
      case 'tabs':
        // 圖文廣告
        if (store.getters['campaign/getAddRequest'].block.tabs[0].mktEventTabName === '') {
          return false;
        } else {
          switch (store.state.campaign.blockType) {
            case 'CARD':
              return true;
            case 'VOUCHER':
              if (store.getters['campaign/getAddRequest'].block.tabs[0].categorys[0].mktEventVoucherId === '') {
                return false;
              } else {
                return true;
              }
            case 'PRODUCT':
              if (store.getters['campaign/getAddRequest'].block.tabs[0].categorys[0].mktEventProdId === '') {
                return false;
              } else {
                return true;
              }
            case 'STORE':
              if (store.getters['campaign/getAddRequest'].block.tabs[0].categorys[0].mktEventStoreId === '') {
                return false;
              } else {
                return true;
              }
          }
        }
    }
  } else {
    return false;
  }
});

/** 新增區塊資料 */
const blockAddData = () => {
  ElLoading.service({ fullscreen: true });
  axios.post(`${process.env.VUE_APP_campaignAPI}${store.state.campaign.apiVersion}/block/add`, store.state.campaign.blockAddRequest)
    .then(res => {
      ElLoading.service().close();
      if (res.data.errorCode === '996600001') {
        const data = JSON.parse(res.data.data);
        store.commit('campaign/SETTING_BLOCK_LIST_DATA', {
          type: store.state.campaign.blockType,
          data: data.block[store.getters['campaign/resType']]
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
const closeAddDialog = () => {
  store.commit('campaign/SETTING_ADD_REQUEST', null);
  store.commit('campaign/SETTING_DIALOG', 'show');
  store.commit('campaign/SETTING_DIALOG', 'add');
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
