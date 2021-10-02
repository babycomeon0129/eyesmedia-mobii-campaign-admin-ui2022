<template>
  <div class="setting-dialog">
    <el-dialog
      :title="`編輯${store.getters['campaign/blockTitle']}`"
      v-model="store.state.campaign.campaignDialog.edit"
      width="60%"
      :show-close="false"
    >
      <form>
        <!-- 功能區 -->
        <AddIcon v-if="store.state.campaign.blockType === 'ICON'" />
        <AddAd v-if="store.state.campaign.blockType === 'AD'" />
        <AddCard v-if="store.state.campaign.blockType === 'CARD'" />
        <AddBanner  v-if="store.state.campaign.blockType === 'BANNER'" />
        <AddVoucher v-if="store.state.campaign.blockType === 'VOUCHER'" />
        <AddProduct v-if="store.state.campaign.blockType === 'PRODUCT'" />
        <AddStore v-if="store.state.campaign.blockType === 'STORE'" />
        <AddWaterfall v-if="store.state.campaign.blockType === 'WATERFALL'" />
      </form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="store.commit('campaign/SETTING_DIALOG', 'show');store.commit('campaign/SETTING_DIALOG', 'edit')">確認</el-button>
          <el-button @click="store.commit('campaign/SETTING_DIALOG', 'show');store.commit('campaign/SETTING_DIALOG', 'edit')">關閉</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
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


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
