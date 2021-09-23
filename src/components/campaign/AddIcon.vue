<template>
  <div class="add-icon">
    <el-dialog
      title="新增ICON"
      v-model="store.state.campaign.showAddIcon"
      width="60%"
      :show-close="false"
    >
      <form>
          <div class="row">
            <div class="col-6">
              <label>
                <span class="crimson">*</span>名稱
              </label>
              <el-input></el-input>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <label>網頁開啟模式</label>
              <el-select v-model="value" placeholder="請選擇">
                <el-option value="本頁開啟"></el-option>
                <el-option value="另開新頁"></el-option>
              </el-select>
            </div>
            <div class="col-9">
              <label>
                <span class="crimson">*</span>URL
              </label>
              <el-input>
                <template #append>
                  <el-checkbox label="App另開瀏覽器"></el-checkbox>
                </template>
              </el-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <label><span class="crimson">*</span>圖示</label>
              <UpLoad />
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <label>
                <span class="crimson">*</span>排序
                <el-tooltip placement="top">
                  <template #content>
                    數字越小越前面
                  </template>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </label>
              <el-input></el-input>
            </div>
            <div class="col-6">
              <label>資料狀態</label>
              <el-select v-model="value" placeholder="請選擇">
                <el-option value="有效"></el-option>
                <el-option value="無效"></el-option>
              </el-select>
            </div>
          </div>
      </form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary"
            @click="store.state.campaign.showAddIcon = false; store.state.campaign.showSettingIcon = true"
          >儲存</el-button>
          <el-button type="info"
            @click="store.state.campaign.showAddIcon = false; store.state.campaign.showSettingIcon = true"
          >關閉</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { useStore } from 'vuex';
// component
import UpLoad from '@/components/shared/UpLoad.vue';

export default {
  name: 'AddIcon',
  components: {
    UpLoad
  },
  setup() {
    const store = useStore();
    return {
      store
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
