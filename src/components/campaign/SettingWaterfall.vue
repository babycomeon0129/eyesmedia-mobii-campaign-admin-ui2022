<template>
  <div class="row">
    <ButtonAdd />
    <el-table :data="store.state.campaign.blockListData.WATERFALL" style="width: 100%">
      <el-table-column prop="banner" label="分類" width="180">
        <template #default="scope">
          <img :src="scope.row.banner" />
        </template>
      </el-table-column>
      <el-table-column prop="mktEventItemName" label="數量"></el-table-column>
      <el-table-column prop="mktEventItemSort" label="排序"></el-table-column>
      <el-table-column prop="mktEventItemStatus" label="是否顯示瀑布流">
        <template #default="scope">{{ scope.row.mktEventItemStatus === 'ENABLE' ? '是' : '否' }}</template>
      </el-table-column>
      <el-table-column label="功能">
        <template #default="scope">
          <div class="table-icon">
            <el-button-group>
              <el-tooltip content="編輯" placement="top">
                <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              </el-tooltip>
              <ButtonDel :delID="store.state.campaign.blockListData.WATERFALL[scope.$index].mktEventTabId" :idx="scope.$index" />
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
import ButtonDel from './widget/ButtonDel.vue';


const store = useStore();

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
