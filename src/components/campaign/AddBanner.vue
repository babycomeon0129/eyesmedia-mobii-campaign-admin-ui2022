<template>
  <div class="row">
    <div class="col-12">
      <label>
        <span class="danger">*</span>名稱
        <el-tooltip placement="top">
          <template #content>第一個新增的 Banner 為 OG Img</template>
          <i class="el-icon-question"></i>
        </el-tooltip>
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
        URL
      </label>
      <el-input v-model.trim="request.block.items[0].mktEventItemUrl"></el-input>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <label>
        <span class="danger">*</span>圖示
      </label>
      <UpLoad
        :imgWidth="1093"
        :imgHeigh="641"
        :imgUrl="request.block.items[0].mktEventItemImgFullPath"
        @imgUpload="imgUpload($event)"
      />
      <span class="danger">圖片上傳限制1093px x 641px，檔案小於1M</span>
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <label>
        <span class="danger">*</span>資料狀態
      </label>
      <el-select v-model="request.block.items[0].mktEventItemStatus" placeholder="請選擇">
        <el-option value="ENABLE" label="開啟"></el-option>
        <el-option value="DISABLE" label="關閉"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch, onMounted} from 'vue';
import { useStore } from 'vuex';
// component
import UpLoad from '@/components/common/UpLoad.vue';
const store = useStore();

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
        mktEventItemUrlTarget: 'SELF',
        mktEventItemUrl: '',
        mktEventItemImg: '',
        mktEventItemImgFullPath: '',
        mktEventItemStatus: 'ENABLE',
        mktEventItemSort: 0,
      }
    ]
  }
});

/**  接收上傳圖片 */
const imgUpload = ({ filePath, fullPath }) => {
  request.block.items[0].mktEventItemImg = filePath;
  request.block.items[0].mktEventItemImgFullPath = fullPath;
}

/** 編輯模式 */
const editMode = () => {
  // 先判斷現在是否為編輯模式
  if(store.state.campaign.campaignDialog.edit) {
    request.block.items = store.state.campaign.blockEditRequest;
  }
}

watch(request, (newValue)=> {
  store.commit('campaign/SETTING_ADD_REQUEST', newValue);
});

onMounted(()=>{
  editMode();
})


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
