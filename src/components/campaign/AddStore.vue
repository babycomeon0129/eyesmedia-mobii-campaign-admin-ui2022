<template>
  <div class="row">
    <div class="col-6">
      <label>
        <span class="danger">*</span>商店 Tab 名稱
      </label>
      <el-input></el-input>
    </div>
    <div class="col-6">
      <label>
        <span class="danger">*</span>排序
        <el-tooltip placement="top">
          <template #content>數字越小越前面</template>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </label>
      <el-input type="number"></el-input>
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
      <el-select placeholder="請選擇" filterable>
        <el-option value="是"></el-option>
        <el-option value="否"></el-option>
      </el-select>
    </div>
    <div class="col-6">
      <label>是否顯示商店Tab</label>
      <el-select placeholder="請選擇">
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
