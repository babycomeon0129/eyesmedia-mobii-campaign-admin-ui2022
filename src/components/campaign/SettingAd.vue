<template>
  <ButtonAdd />
  <el-table :data="store.state.campaign.blockListData.AD" style="width: 100%">
    <el-table-column prop="banner" label="圖示" width="180">
      <template #default="scope">
        <img :src="scope.row.banner" />
      </template>
    </el-table-column>
    <el-table-column prop="mktEventItemName" label="名稱"></el-table-column>
    <el-table-column prop="mktEventItemSort" label="排序"></el-table-column>
    <el-table-column prop="mktEventItemStatus" label="是否顯示廣告">
      <template #default="scope">{{ scope.row.mktEventItemStatus  === 'ENABLE' ? '是' : '否' }}</template>
    </el-table-column>
    <el-table-column label="功能">
      <template #default="scope">
        <div class="table-icon">
          <el-button-group>
            <ButtonEdit :editID="store.state.campaign.blockListData.AD[scope.$index].mktEventItemId" />
            <ButtonDel :delID="store.state.campaign.blockListData.AD[scope.$index].mktEventItemId" :idx="scope.$index" />
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
import ButtonDel from './widget/ButtonDel.vue';
import ButtonEdit from './widget/ButtonEdit.vue';


const store = useStore();

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
