<template>
  <div class="row">
    <div class="col-6">
      <label>
        <span class="danger">*</span>商店 Tab 名稱
      </label>
      <el-input v-model="request.block.tabs[0].mktEventTabName"></el-input>
    </div>
    <div class="col-6">
      <label>
        <span class="danger">*</span>排序
        <el-tooltip placement="top">
          <template #content>數字越小越前面</template>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </label>
      <el-input v-model.number="request.block.tabs[0].mktEventTabSort" type="number"></el-input>
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <label>
        <span class="danger">*</span>選擇商店
        <el-tooltip placement="top">
          <template #content>
            1.選定目錄後，該目錄下的商店皆會顯示在前台此Tab
            <br />2.目錄為單選
          </template>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </label>
      <el-select
        placeholder="請選擇"
        filterable
        multiple
        v-model="storeList"
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
    <div class="col-6">
      <label>是否顯示商店Tab</label>
      <el-select placeholder="請選擇" v-model="request.block.tabs[0].mktEventTabStatus">
        <el-option value="ENABLE" label="是"></el-option>
        <el-option value="DISABLE" label="否"></el-option>
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
/** 商店清單 */
let storeList = ref([]);
/** api request */
const request = reactive({
  mkt_event_id: computed(() => store.state.campaign.eventID),
  block: {
    mktEventBlockId: computed(() => store.state.campaign.blockID),
    mktEventBlockType: computed(() => store.state.campaign.blockType),
    mktEventId: computed(() => store.state.campaign.eventID),
    mktEventBlockName: computed(() => store.state.campaign.blockName),
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
            mktEventStoreId: computed(()=> storeList.value.join())
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
    console.log(store.state.campaign.blockEditRequest);
    request.block.tabs = store.state.campaign.blockEditRequest;
    storeList.value = store.state.campaign.blockEditRequest[0].categorys[0].mktEventStoreId.split(',');
    request.block.tabs[0].categorys[0].mktEventStoreId = computed(()=> storeList.value.join());
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
