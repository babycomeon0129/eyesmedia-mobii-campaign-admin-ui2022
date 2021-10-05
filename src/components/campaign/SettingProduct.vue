<template>
  <div class="row">
    <label>
      <span class="danger">*</span>商品版位標題
    </label>
    <el-input></el-input>
  </div>
  <div class="row">
    <ButtonAdd />
    <el-table :data="store.state.campaign.blockListData.PRODUCT" style="width: 100%">
      <el-table-column prop="banner" label="商品Tab名稱" width="180">
        <template #default="scope">
          <img :src="scope.row.banner" />
        </template>
      </el-table-column>
      <el-table-column prop="mktEventItemName" label="商品券數量"></el-table-column>
      <el-table-column prop="mktEventItemSort" label="排序"></el-table-column>
      <el-table-column prop="mktEventItemStatus" label="是否顯示Tab">
        <template #default="scope">{{ scope.row.mktEventItemStatus === 'ENABLE' ? '是' : '否' }}</template>
      </el-table-column>
      <el-table-column label="功能">
        <template #default>
          <div class="table-icon">
            <el-button-group>
              <el-tooltip content="編輯" placement="top">
                <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              </el-tooltip>
              <el-tooltip content="刪除資料" placement="top">
                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
              </el-tooltip>
            </el-button-group>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
// component
import ButtonAdd from './widget/ButtonAdd.vue';

const store = useStore();

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
