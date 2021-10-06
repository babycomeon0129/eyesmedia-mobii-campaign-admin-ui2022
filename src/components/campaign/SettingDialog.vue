<template>
  <div class="setting-dialog">
    <el-dialog
      :title="`設定${store.getters['campaign/blockTitle']}`"
      v-model="store.state.campaign.campaignDialog.show"
      width="60%"
      :show-close="false"
      destroy-on-close
    >
      <div class="add-dialog">
        <!-- 需要區塊標題的功能才出現版面標題 -->
        <div class="row" v-if="store.getters['campaign/resType'] === 'tabs'">
          <label>
            <span class="danger">*</span>
            {{ store.getters['campaign/blockTitle'] }}版位標題
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
        <div class="row justify-center">
          <el-pagination
            v-show="store.state.campaign.blockListPaginationInfo.totalNumber > 0"
            @current-change="changeCurrentPage($event)"
            :page-size="10"
            :pager-count="11"
            layout="prev, pager, next"
            :total="store.state.campaign.blockListPaginationInfo.totalNumber"
          ></el-pagination>
        </div>
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
import { reactive, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
// element UI
import { ElMessage, ElLoading } from 'element-plus';
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
  mkt_event_id: computed(() => store.state.campaign.eventID),
  block: {
    mktEventId: computed(() => store.state.campaign.eventID),
    mktEventBlockId: computed(() => store.state.campaign.blockID),
    mktEventBlockType: computed(() => store.state.campaign.blockType),
    mktEventBlockName: ''
  }
})
/** API 類型判斷 */
let type = ref('');

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
      ElLoading.service({ fullscreen: true });
      axios.post(`${process.env.VUE_APP_campaignAPI}${store.state.campaign.apiVersion}/block/${type.value}`, request)
        .then(res => {
          ElLoading.service().close();
          if (res.data.errorCode === '996600001') {
            ElMessage.success({
              message: '更新成功',
              type: 'success',
            });
            store.commit('campaign/SETTING_BLOCK_NAME', request.block.mktEventBlockName);
            store.commit('campaign/SETTING_DIALOG', 'show');
          } else {
            ElMessage.error(`errorCode:${res.data.errorCode}`);
          }
        })

  }
}

/** 點擊分頁 */
const changeCurrentPage = event => {
  ElLoading.service({ fullscreen: true });
  const request = reactive({
    id: store.state.campaign.eventID,
    type: store.state.campaign.blockType,
    paginationInfo: {
      pageIndex: event,
      totalPages: 1,
      totalNumber: 0,
      pageSize: 10
    }
  });
  axios.post(`${process.env.VUE_APP_campaignAPI}${store.state.campaign.apiVersion}/block/list`, request)
    .then(res => {
      ElLoading.service().close();
      if (res.data.errorCode === '996600001') {
        const data = JSON.parse(res.data.data);
        if (data !== null) {
          store.commit('campaign/SETTING_BLOCK_LIST_DATA', {
            type: store.state.campaign.blockType,
            data: data.block[store.getters['campaign/resType']]
          });
        }
      } else {
        ElMessage.error(`errorCode:${res.data.errorCode}`);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

/** 關閉設定dialog */
const closeSettingDialog = () => {
  store.commit('campaign/SETTING_DIALOG', 'show');
  // 清空新增的request
  store.commit('campaign/SETTING_ADD_REQUEST', null);
}

watch(
  store.state, (newValue) => {
    request.block.mktEventBlockName = newValue.campaign.blockName;
    type.value = request.block.mktEventBlockName === '' ? 'add' : 'update';
  }
)

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
