<template>
  <div class="row">
    <ButtonAdd />
    <el-table :data="store.state.campaign.blockListData.STORE" style="width: 100%">
      <el-table-column prop="mktEventTabName" label="商店Tab名稱" width="180">
      </el-table-column>
      <el-table-column prop="itemCount" label="商店數量"></el-table-column>
      <el-table-column prop="mktEventTabSort" label="排序"></el-table-column>
      <el-table-column prop="mktEventTabStatus" label="是否顯示商店Tab">
        <template #default="scope">{{ scope.row.mktEventTabStatus === 'ENABLE' ? '是' : '否' }}</template>
      </el-table-column>
      <el-table-column label="功能">
        <template #default="scope">
          <div class="table-icon">
            <el-button-group>
              <ButtonEdit :editID="store.state.campaign.blockListData.STORE[scope.$index].mktEventTabId" />
              <ButtonDel :delID="store.state.campaign.blockListData.STORE[scope.$index].mktEventTabId" :idx="scope.$index" />
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
import ButtonEdit from './widget/ButtonEdit.vue';


const store = useStore();

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
