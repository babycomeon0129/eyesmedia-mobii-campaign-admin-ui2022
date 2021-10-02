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
      <el-select placeholder="請選擇" filterable>
        <el-option value="是"></el-option>
        <el-option value="否"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script setup>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
