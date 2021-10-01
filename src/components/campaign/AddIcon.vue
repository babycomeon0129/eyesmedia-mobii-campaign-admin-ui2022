<template>
  <div class="add-icon">
    <el-dialog
      title="新增ICON"
      v-model="store.state.campaign.settingIcon.add"
      width="60%"
      :show-close="false"
    >
      <form>
        <div class="row">
          <div class="col-12">
            <label>
              <span class="danger">*</span>名稱
            </label>
            <el-input v-model="request.block.items[0].mktEventItemName"></el-input>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <label>
              <span class="danger">*</span>網頁開啟模式
            </label>
            <el-select placeholder="請選擇" v-model="request.block.items[0].mktEventItemUrlTarget">
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
            <el-input>
              <!--template #append>
                <el-checkbox label="App另開瀏覽器"></el-checkbox>
              </template-->
            </el-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <label>
              <span class="danger">*</span>圖示
            </label>
            <UpLoad />
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
            <el-input></el-input>
          </div>
          <div class="col-6">
            <label>資料狀態</label>
            <el-select placeholder="請選擇" v-model="request.block.items[0].mktEventItemStatus">
              <el-option value="ENABLE" label="開啟"></el-option>
              <el-option value="DISABLE" label="關閉"></el-option>
            </el-select>
          </div>
        </div>
      </form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            @click="addIcon"
          >儲存</el-button>
          <el-button
            @click="store.commit('campaign/SETTING_ICON', 'show'); store.commit('campaign/SETTING_ICON', 'add')"
          >關閉</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

// component
import UpLoad from '@/components/common/UpLoad.vue';
import axios from 'axios';

const store = useStore();
/** API request */
const request = reactive({
  mkt_event_id: computed(() => store.state.campaign.eventID),
  block: {
    mktEventBlockId: '',
    mktEventBlockName: '',
    mktEventBlockStatus: '',
    mktEventBlockSdate: '',
    mktEventBlockEdate: '',
    mktEventBlockType: '',
    mktEventBlockSort: 0,
    mktEventBlockSlotNo: '',
    mktEventId: '',
    items: [
      {
        mktEventItemName: '',
        mktEventItemUrlTarget: '',
        mktEventItemUrl: '',
        mktEventItemImg: '',
        mktEventItemSort: 0,
        mktEventItemStatus: 'ENABLE',
      }
    ]
  }
});

console.log(request.block.items[0]);

/** 新增ICON資料 */
const addIcon = () => {
  axios.post(`${process.env.VUE_APP_campaignAPI}${store.state.campaign.apiVersion}/block/add`, request)
  .then( res => {
    console.log(res);
    // store.commit('campaign/SETTING_ICON', 'show');
    // store.commit('campaign/SETTING_ICON', 'add');
  })
}

console.log(request);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
