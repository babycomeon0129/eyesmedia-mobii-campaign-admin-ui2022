<template>
  <div class="add-icon">
    <el-dialog
      title="新增廣告"
      v-model="store.state.campaign.settingAd.add"
      width="60%"
      :show-close="false"
    >
      <form>
          <div class="row">
            <div class="col-12">
              <label>
                <span class="danger">*</span>廣告名稱
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
                <span class="danger">*</span>URL
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
              <label><span class="danger">*</span>圖示</label>
              <UpLoad />
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <label>
                <span class="danger">*</span>開始與結束時間
              </label>
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="開始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
            <div class="col-6">
              <label><span class="danger">*</span>是否顯示廣告</label>
              <el-select v-model="value" placeholder="請選擇">
                <el-option value="是"></el-option>
                <el-option value="否"></el-option>
              </el-select>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <label>
                <span class="danger">*</span>排序
                <el-tooltip placement="top">
                  <template #content>
                    數字越小越前面
                  </template>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </label>
              <el-input></el-input>
            </div>
          </div>
      </form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary"
            @click="store.state.campaign.settingAd.add = false; store.state.campaign.settingAd.show = true"
          >儲存</el-button>
          <el-button
            @click="store.state.campaign.settingAd.add = false; store.state.campaign.settingAd.show = true"
          >關閉</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
// component
import UpLoad from '@/components/shared/UpLoad.vue';

const store = useStore();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
