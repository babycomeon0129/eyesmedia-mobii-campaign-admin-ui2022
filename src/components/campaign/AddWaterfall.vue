<template>
  <div class="row">
    <div class="col-6">
      <label>
        <span class="danger">*</span>選擇分類
      </label>
      <el-select placeholder="請選擇">
        <el-option value="是"></el-option>
        <el-option value="否"></el-option>
      </el-select>
    </div>
    <div class="col-6">
      <label>是否顯示瀑布流</label>
      <el-select placeholder="請選擇">
        <el-option value="是"></el-option>
        <el-option value="否"></el-option>
      </el-select>
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <label>
        <span class="danger">*</span>選擇商店
        <el-tooltip placement="top">
          <template #content>
            1.選定目錄後，該目錄下的優惠券皆會顯示在前台此Tab
            <br />2.目錄為單選
          </template>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </label>
      <el-select
        placeholder="請選擇"
        filterable
        v-model="request.block.tabs[0].categorys[0].mktEventStoreId"
      >
        <el-option
          v-for="item in tabList"
          :key="`store${item.value}`"
          :value="item.value"
          :label="item.name"
          :disabled="item.state !== 'ENABLE'"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed, watch } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

/** vuex */
const store = useStore();

/** tab資料 */
const tabList = ref([]);
/** api request */
const request = reactive({
  mkt_event_id: computed(() => store.state.campaign.eventID),
  block: {
    mktEventBlockId: computed(() => store.state.campaign.blockID),
    mktEventBlockType: computed(() => store.state.campaign.blockType),
    mktEventId: computed(() => store.state.campaign.eventID),
    tabs: [
      {
        mktEventId: computed(() => store.state.campaign.eventID),
        mktEventTabName: '',
        mktEventTabStatus: 'ENABLE',
        mktEventTabSort: 0,
        mktEventTabSoltNo: '',
        mktEventTabCatalog: computed(() => store.state.campaign.blockType),
        mktEventBlockId: computed(() => store.state.campaign.blockID),
        categorys: [
          {
            mktEventVoucherId: '',
            mktEventStoreId: '',
            mktEventProdId: ''
          }
        ]
      }
    ]
  }
});


/** 獲得tab資料 */
const getTabList = () => {
  axios.get(`${process.env.VUE_APP_campaignAPI}${store.state.campaign.apiVersion}/block/detail?type=${store.state.campaign.blockType}`)
    .then(res => {
      const data = JSON.parse(res.data.data);
      console.log(data);
      tabList.value = data.storeItems;
    })
}

watch(
  // 監聽request，如果數值變更，便存到vuex
  request, (newValue) => {
    store.commit('campaign/SETTING_ADD_REQUEST', newValue);
  }
);

/** 編輯模式 */
const editMode = () => {
  // 先判斷現在是否為編輯模式
  if (store.state.campaign.campaignDialog.edit) {
    request.block.tabs = store.state.campaign.blockEditRequest;
  }
}

onMounted(() => {
  getTabList();
  editMode();
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
