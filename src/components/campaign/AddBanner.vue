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
      <label>
        <span class="danger">*</span>圖示
      </label>
      <UpLoad />
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <label>
        <span class="danger">*</span>資料狀態
      </label>
      <el-select v-model="value" placeholder="請選擇">
        <el-option value="是"></el-option>
        <el-option value="否"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script setup>
// component
import UpLoad from '@/components/common/UpLoad.vue';


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
