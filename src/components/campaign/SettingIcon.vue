<template>
  <ButtonAdd />
  <el-table :data="store.state.campaign.blockListData.ICON" style="width: 100%">
    <el-table-column prop="banner" label="圖示" width="180">
      <template #default="scope">
        <img :src="scope.row.banner" />
      </template>
    </el-table-column>
    <el-table-column prop="mktEventItemName" label="名稱"></el-table-column>
    <el-table-column prop="mktEventItemSort" label="排序"></el-table-column>
    <el-table-column prop="mktEventItemStatus" label="資料狀態">
      <template #default="scope">
        <el-tag
          :type="scope.row.mktEventItemStatus === 'ENABLE' ? 'success' : 'info'"
        >{{ scope.row.mktEventItemStatus ? '有效' : '無效' }}</el-tag>
      </template>
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
</template>

<script setup>
import { useStore } from 'vuex';
// component
import ButtonAdd from './widget/ButtonAdd.vue';

const store = useStore();




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
