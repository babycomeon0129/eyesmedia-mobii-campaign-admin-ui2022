<template>
  <div class="row">
    <div class="col-6">
      <label>
        <span class="danger">*</span>選擇分類
      </label>
      <el-select v-model="request.block.tabs[0].categorys[0].mktEventCategoryType" placeholder="請選擇">
        <el-option value="STORE" label="商店"></el-option>
        <el-option value="PRODUCT" label="商品"></el-option>
        <el-option value="VOUCHER" label="優惠券"></el-option>
      </el-select>
    </div>
    <div class="col-6">
      <label>是否顯示瀑布流</label>
      <el-select placeholder="請選擇" v-model="request.block.tabs[0].mktEventTabStatus">
        <el-option value="ENABLE" label="是"></el-option>
        <el-option value="DISABLE" label="否"></el-option>
      </el-select>
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <label>
        <span class="danger">*</span>選擇
        <el-tooltip placement="top">
          <template #content>
            1.選定目錄後，該目錄下的優惠券皆會顯示在前台此Tab
            <br />2.目錄為單選
          </template>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </label>
      <!-- 商店清單 -->
      <!-- 不知道為什麼，這裡設v-show編輯模式才不會報紅字，所以先這樣設定 -->
      <el-select v-show="request.block.tabs[0].categorys[0].mktEventCategoryType === 'STORE'"
        placeholder="請選擇"
        filterable
        multiple
        v-model="storeId"
      >
        <el-option
          v-for="item in storeList"
          :key="`store${item.value}`"
          :value="item.value"
          :label="item.name"
          :disabled="item.state !== 'ENABLE'"
        ></el-option>
      </el-select>
      <!-- 優惠券清單 -->
      <el-cascader v-if="request.block.tabs[0].categorys[0].mktEventCategoryType === 'VOUCHER'" v-model="voucherId" :options="voucherList"></el-cascader>
      <!-- 商品清單 -->
       <el-cascader v-if="request.block.tabs[0].categorys[0].mktEventCategoryType === 'PRODUCT'" v-model="prodId" :options="productList"></el-cascader>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed, watch } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

/** vuex */
const store = useStore();
/** 商店清單 */
const storeList = ref([]);
/** 商品清單 */
const productList = ref([]);
/** 優惠券清單 */
const voucherList = ref([]);
/** 選擇商品 */
const prodId = ref([]);
/** 選擇商店 */
const storeId = ref([]);
/** 選擇優惠券 */
const voucherId = ref([]);
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
        mktEventTabName: 'WATERFALL', // 防呆統一先確認mktEventTabName是否空值，但因瀑布流不需要這欄位，故先預設
        mktEventTabStatus: 'ENABLE',
        mktEventTabSort: 0,
        mktEventTabSoltNo: '',
        mktEventTabCatalog: computed(() => store.state.campaign.blockType),
        mktEventBlockId: computed(() => store.state.campaign.blockID),
        categorys: [
          {
            mktEventVouCatalog: '',
            mktEventProdDefineId: '',
            mktEventVoucherId: computed(() => request.block.tabs[0].categorys[0].mktEventCategoryType === 'VOUCHER' ? voucherId.value[voucherId.value.length -1] : ''),
            mktEventStoreId: computed(() => request.block.tabs[0].categorys[0].mktEventCategoryType === 'STORE' ? storeId.value.join() : ''),
            mktEventProdId: computed(() => request.block.tabs[0].categorys[0].mktEventCategoryType === 'PRODUCT' ? prodId.value[prodId.value.length -1] : ''),
            mktEventCategoryType: 'STORE' // PRODUCT、VOUCHER、STORE
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
      storeList.value = data.storeItems;
      productList.value = data.productDefineItems;
      voucherList.value = data.voucherItems;
    })
}

watch(
  // 監聽request，如果數值變更，便存到vuex
  request, (newValue) => {
    store.commit('campaign/SETTING_ADD_REQUEST', newValue);
    // 選到單一項目時，清空其他已選取的項目內容
    switch(newValue.block.tabs[0].categorys[0].mktEventCategoryType) {
      case 'STORE':
        prodId.value = ['', ''];
        voucherId.value = [];
        break;
      case 'PRODUCT':
        voucherId.value = [];
        storeId.value = [];
        break;
      case 'VOUCHER':
        storeId.value = [];
        prodId.value = ['', ''];
        break;
    }
  }
);

/** 編輯模式 */
const editMode = () => {
  // 先判斷現在是否為編輯模式
  if (store.state.campaign.campaignDialog.edit) {
    request.block.tabs = store.state.campaign.blockEditRequest;
    switch(store.state.campaign.blockEditRequest[0].categorys[0].mktEventCategoryType) {
      case 'STORE':
        storeId.value = store.state.campaign.blockEditRequest[0].categorys[0].mktEventStoreId.split(',');
        break;
      case 'PRODUCT':
        prodId.value = request.block.tabs[0].categorys[0].mktEventProdDefineId.split(',');
        break;
      case 'VOUCHER':
        voucherId.value = store.state.campaign.blockEditRequest[0].categorys[0].mktEventVouCatalog.split(',');
        break;
    }
  }

  request.block.tabs[0].categorys[0].mktEventStoreId = computed(() => request.block.tabs[0].categorys[0].mktEventCategoryType === 'STORE' ? storeId.value.join() : '');
  request.block.tabs[0].categorys[0].mktEventProdId = computed(() => request.block.tabs[0].categorys[0].mktEventCategoryType === 'PRODUCT' ? prodId.value[prodId.value.length -1] : '');
  request.block.tabs[0].categorys[0].mktEventVoucherId = computed(() => request.block.tabs[0].categorys[0].mktEventCategoryType === 'VOUCHER' ? voucherId.value[voucherId.value.length -1] : '');
}

onMounted(() => {
  getTabList();
  editMode();
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
                                      