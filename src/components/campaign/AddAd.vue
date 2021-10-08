<template>
  <div class="row">
    <div class="col-12">
      <label>
        <span class="danger">*</span>廣告名稱
      </label>
      <el-input v-model="request.block.items[0].mktEventItemName"></el-input>
    </div>
  </div>
  <div class="row">
    <div class="col-3">
      <label>網頁開啟模式</label>
      <el-select v-model="request.block.items[0].mktEventItemUrlTarget" placeholder="請選擇">
        <el-option value="BLANK" label="另開連結"></el-option>
        <el-option value="SELF" label="直接開啟"></el-option>
        <el-option value="APP" label="呼叫APP開啟"></el-option>
        <el-option value="PARENT" label="透過上層開啟"></el-option>
      </el-select>
    </div>
    <div class="col-9">
      <label>
        <span class="danger">*</span>URL
      </label>
      <el-input v-model="request.block.items[0].mktEventItemUrl"></el-input>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <label>
        <span class="danger">*</span>圖示
      </label>
      <!-- UpLoad /-->
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <label>
        <span class="danger">*</span>開始與結束時間
      </label>
      <el-date-picker
        v-model="dateRange"
        type="datetimerange"
        range-separator="-"
        start-placeholder="開始日期"
        end-placeholder="结束日期"
        value-format="YYYY-MM-DDTHH:mm:ss"
        :clearable="false"
      ></el-date-picker>
    </div>
    <div class="col-6">
      <label>
        <span class="danger">*</span>是否顯示廣告
      </label>
      <el-select v-model="request.block.items[0].mktEventItemStatus" placeholder="請選擇">
        <el-option value="ENABLE" label="開啟"></el-option>
        <el-option value="DISABLE" label="關閉"></el-option>
      </el-select>
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <label>
        <span class="danger">*</span>排序
        <el-tooltip placement="top">
          <template #content>數字越小越前面</template>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </label>
      <el-input v-model="request.block.items[0].mktEventItemSort" type="number"></el-input>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
// component
// import UpLoad from '@/components/common/UpLoad.vue';

const store = useStore();

/** 設定日期 */
const dateRange = ref([new Date(), new Date()]);

/** API request */
const request = reactive({
  mkt_event_id: computed(() => store.state.campaign.eventID),
  block: {
    mktEventId: computed(() => store.state.campaign.eventID),
    mktEventBlockId: computed(() => store.state.campaign.blockID),
    mktEventBlockType: computed(() => store.state.campaign.blockType),
    items: [
      {
        mktEventItemName: '',
        mktEventItemUrlTarget: 'BLANK',
        mktEventItemUrl: '',
        mktEventItemImg: '',
        mktEventItemStatus: 'ENABLE',
        mktEventItemSort: 0,
        mktEventItemSdate: computed(() => dateRange.value[0]),
        mktEventItemEdate: computed(() => dateRange.value[1])
      }
    ]
  }
});

/** 編輯模式 */
const editMode = () => {
  // 先判斷現在是否為編輯模式
  if(store.state.campaign.campaignDialog.edit) {
    request.block.items = store.state.campaign.blockEditRequest;
    dateRange.value[0] =  store.state.campaign.blockEditRequest[0].mktEventItemSdate;
    dateRange.value[1] =  store.state.campaign.blockEditRequest[0].mktEventItemEdate;
    request.block.items[0].mktEventItemSdate = computed(() => dateRange.value[0]);
    request.block.items[0].mktEventItemEdate = computed(() => dateRange.value[1]);
  }
}

watch(
  // 監聽request，如果數值變更，便存到vuex
  request, (newValue) => {
    store.commit('campaign/SETTING_ADD_REQUEST', newValue);
  }
);

onMounted(()=>{
  editMode();
})


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
