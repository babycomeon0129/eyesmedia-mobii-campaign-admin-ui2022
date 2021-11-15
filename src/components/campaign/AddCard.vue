<template>
  <div class="row">
    <div class="col-12">
      <label>
        <span class="danger">*</span>廣告Tab名稱
      </label>
      <el-input v-model="request.block.tabs[0].mktEventTabName"></el-input>
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <label>是否顯示廣告Tab</label>
      <el-select placeholder="請選擇" v-model="request.block.tabs[0].mktEventTabStatus">
        <el-option value="ENABLE" label="是"></el-option>
        <el-option value="DISABLE" label="否"></el-option>
      </el-select>
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
  <div class="row add-card">
    <div class="col-12" v-for="(card, idx) in request.block.tabs[0].items" :key="`card${idx}`">
      <div class="row card-title">
        <h4>圖文廣告{{ idx + 1 }}</h4>
        <!-- 刪除此筆 -->
        <el-popconfirm
          confirm-button-text="刪除"
          cancel-button-text="取消"
          icon="el-icon-info"
          icon-color="red"
          title="確定要刪除嗎？"
          @confirm="deletCard(idx, card.mktEventItemId)"
        >
          <template #reference>
            <button class="btn" type="button">
              <i class="el-icon-delete danger"></i>
            </button>
          </template>
        </el-popconfirm>
      </div>
      <div class="row">
        <div class="col-6">
          <label>
            <span class="danger">*</span>名稱
          </label>
          <el-input v-model="card.mktEventItemName"></el-input>
        </div>
        <div class="col-6">
          <label>是否顯示圖文廣告欄位</label>
          <el-select placeholder="請選擇" v-model="card.mktEventItemStatus">
            <el-option value="ENABLE" label="是"></el-option>
            <el-option value="DISABLE" label="否"></el-option>
          </el-select>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <label>
            <span class="danger">*</span>上傳圖檔
          </label>
          <UpLoad
            :imgWidth="500"
            :imgHeigh="500"
            :imgUrl="card.mktEventItemImgFullPath"
            @imgUpload="imgUpload($event, idx)"
          />
          <span class="danger">圖片上傳限制500px x 500px，檔案小於1M</span>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label>
            <span class="danger">*</span>網頁開啟模式
          </label>
          <el-select placeholder="請選擇" v-model="card.mktEventItemUrlTarget">
            <el-option value="BLANK" label="另開連結"></el-option>
            <el-option value="SELF" label="直接開啟"></el-option>
            <el-option value="APP" label="呼叫APP開啟"></el-option>
            <el-option value="PARENT" label="透過上層開啟"></el-option>
          </el-select>
        </div>
        <div class="col-6">
          <label>
            <span class="danger">*</span>URL
          </label>
          <el-input v-model.trim="card.mktEventItemUrl"></el-input>
        </div>
      </div>
    </div>
    <!-- 新增卡片 -->
    <div class="row">
      <button class="btn btn-addlist" @click="addCard" type="button">
        <i class="el-icon-circle-plus"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
// element UI
import { ElMessage, ElLoading } from 'element-plus'
// component
import UpLoad from '@/components/common/UpLoad.vue';

/** vuex */
const store = useStore();

/** 新增卡片 */
const addCard = () => {
  request.block.tabs[0].items.push({
    mktEventItemId: '',
    mktEventTabName: '',
    mktEventItemImg: '',
    mktEventItemImgFullPath: '',
    mktEventItemUrlTarget: 'SELF',
    mktEventItemUrl: '',
    mktEventItemStatus: 'ENABLE'
  })
};

/** 刪除卡片 */
const deletCard = (idx, id) => {
  ElLoading.service({ fullscreen: true });
  if (request.block.tabs[0].items.length > 1) {
    request.block.tabs[0].items.splice(idx, 1);
    axios.delete(`${process.env.VUE_APP_campaignAPI}${store.state.campaign.apiVersion}/block/deleteitem?id=${id}`)
    .then( res => {
      ElLoading.service().close();
      if (res.data.errorCode === '996600001'){
        ElMessage.success({
          message: '刪除成功',
          type: 'success',
        });
        request.block.tabs[0].items.splice(idx, 1);
      } else {
        ElMessage.error(`errorCode:${res.data.errorCode}`);
      }
    })
  } else {
    ElMessage.error('請至少新增一個圖文廣告');
  }
};

/** api request */
const request = reactive({
  mkt_event_id: computed(() => store.state.campaign.eventID),
  block: {
    mktEventBlockId: computed(() => store.state.campaign.blockID),
    mktEventBlockType: computed(() => store.state.campaign.blockType),
    mktEventId: computed(() => store.state.campaign.eventID),
    tabs: [
      {
        mktEventTabId: '',
        mktEventId: '',
        mktEventTabName: '',
        mktEventTabStatus: 'ENABLE',
        mktEventTabSort: 0,
        mktEventTabSoltNo: '',
        mktEventTabCatalog: '',
        mktEventBlockId: '',
        items: [
          {
            mktEventItemId: '',
            mktEventItemName: '',
            mktEventItemImg: '',
            mktEventItemImgFullPath: '',
            mktEventItemUrlTarget: 'BLANK',
            mktEventItemUrl: '',
            mktEventItemStatus: 'ENABLE'
          }
        ]
      }
    ]
  }
});

/**  接收上傳圖片 */
const imgUpload = ({ filePath, fullPath }, index) => {
  request.block.tabs[0].items[index].mktEventItemImg = filePath;
  request.block.tabs[0].items[index].mktEventItemImgFullPath = fullPath;
}

/** 編輯模式 */
const editMode = () => {
  // 先判斷現在是否為編輯模式
  if (store.state.campaign.campaignDialog.edit) {
    request.block.tabs = store.state.campaign.blockEditRequest;
  }
}

watch(
  // 監聽request，如果數值變更，便存到vuex
  request, (newValue) => {
    store.commit('campaign/SETTING_ADD_REQUEST', newValue);
  }
);

onMounted(() => {
  editMode();
})



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.add-card {
  padding: 1em 0;
  .col-12 {
    padding: 0 0 1em 0;
  }
  .card-title {
    border-bottom: 1px solid #c9ced2;
    display: flex;
    align-items: flex-end;
    padding: 0 0 0 0.5em;
  }
  h4 {
    text-align: left;
    flex: 1;
  }
  i {
    &:hover {
      font-weight: bold;
    }
  }
}
</style>
