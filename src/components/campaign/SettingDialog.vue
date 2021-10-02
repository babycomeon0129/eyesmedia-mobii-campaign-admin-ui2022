<template>
  <div class="setting-dialog">
    <el-dialog
      :title="`設定${store.getters['campaign/blockTitle']}`"
      v-model="store.state.campaign.campaignDialog.show"
      width="60%"
      :show-close="false"
    >
      <div class="add-dialog">
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
          <el-button type="primary" @click="store.commit('campaign/SETTING_DIALOG', 'show');">確認</el-button>
          <el-button @click="store.commit('campaign/SETTING_DIALOG', 'show')">關閉</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 功能區 -->
  </div>
</template>

<script setup>
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

const store = useStore();


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
