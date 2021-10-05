<template>
  <div class="setting-dialog">
    <el-dialog
      :title="`設定${store.getters['campaign/blockTitle']}`"
      v-model="store.state.campaign.campaignDialog.show"
      width="60%"
      :show-close="false"
    >
      <div class="add-dialog">
        <!-- 需要區塊標題的功能才出現版面標題 -->
        <div class="row" v-if="store.getters['campaign/resType'] === 'tabs'">
          <label>
            <span class="danger">*</span>{{store.getters['campaign/blockTitle']}}版位標題
          </label>
          <el-input v-model="request.block.mktEventBlockName"></el-input>
        </div>
        <!-- 功能區 -->
        <SettingIcon v-if="store.state.campaign.blockType === 'ICON'" />
        <SettingAd v-if="store.state.campaign.blockType === 'AD'" />
        <SettingCard v-if="store.state.campaign.blockType === 'CARD'" />
        <SettingBanner v-if="store.state.campaign.blockType === 'BANNER'" />
        <SettingVoucher v-if="store.state.campaign.blockType === 'VOUCHER'" />
        <SettingProduct v-if="store.state.campaign.blockType === 'PRODUCT'" />
        <SettingStore v-if="store.state.campaign.blockType === 'STORE'" />
        <SettingWaterfall v-if="store.state.campaign.blockType === 'WATERFALL'" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="clickConfirm">確認</el-button>
          <el-button @click="closeSettingDialog">關閉</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 功能區 -->
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import { useStore } from 'vuex';
// component
import SettingIcon from '@/components/campaign/SettingIcon.vue';
import SettingAd from '@/components/campaign/SettingAd.vue';
import SettingCard from '@/components/campaign/SettingCard.vue';
import SettingBanner from '@/components/campaign/SettingBanner.vue';
import SettingVoucher from '@/components/campaign/SettingVoucher.vue';
import SettingProduct from '@/components/campaign/SettingProduct.vue';
import SettingStore from '@/components/campaign/SettingStore.vue';
import SettingWaterfall from '@/components/campaign/SettingWaterfall.vue';
import axios from 'axios';

const store = useStore();
/** 區塊版位標題 */
const request = reactive({
  block: {
    mktEventId: computed(() => store.state.campaign.eventID),
    mktEventBlockType: computed(() => store.state.campaign.blockType),
    mktEventBlockName: ''
  }
})
/** API 類型判斷 */
let type = '';

/** 點擊確認按鈕 */
const clickConfirm = () => {
  switch (store.state.campaign.blockType) {
    case 'BANNER':
    case 'AD':
    case 'ICON':
      store.commit('campaign/SETTING_DIALOG', 'show');
      // 清空新增的request
      store.commit('campaign/SETTING_ADD_REQUEST', null);
      break;
    default:
      type = store.state.campaign.blockID === '' ? 'add': 'update';
      axios.post(`${process.env.VUE_APP_campaignAPI}${store.state.campaign.apiVersion}/block/${type}`, request)
      .then( res => {
        console.log(res);
        store.commit('campaign/SETTING_BLOCK_NAME', request.block.mktEventBlockName);
      })
  
  }
}

/** 關閉設定dialog */
const closeSettingDialog = () => {
  store.commit('campaign/SETTING_DIALOG', 'show');
  // 清空新增的request
  store.commit('campaign/SETTING_ADD_REQUEST', null);
}

watch( store.state.campaign.eventID, (newValue)=> {
  request.block.mktEventBlockName = newValue;
})


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
