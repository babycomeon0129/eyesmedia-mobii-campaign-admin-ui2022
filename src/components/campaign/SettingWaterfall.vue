<template>
  <div class="row">
    <!-- 禁止用戶建立多組瀑布流，故資料長度大於1時隱藏新增按鈕 -->
    <ButtonAdd v-if="store.state.campaign.blockListData.WATERFALL.length === 0" />
    <el-table :data="store.state.campaign.blockListData.WATERFALL" style="width: 100%">
      <el-table-column label="分類" width="180">
        <template #default="scope">
          {{ TextConversion(scope.row.categorys[0].mktEventCategoryType) }}
        </template>
      </el-table-column>
      <el-table-column prop="itemCount" label="數量"></el-table-column>
      <el-table-column prop="mktEventTabStatus" label="是否顯示瀑布流">
        <template #default="scope">{{ scope.row.mktEventTabStatus === 'ENABLE' ? '是' : '否' }}</template>
      </el-table-column>
      <el-table-column label="功能">
        <template #default="scope">
          <div class="table-icon">
            <el-button-group>
              <ButtonEdit :editID="store.state.campaign.blockListData.WATERFALL[scope.$index].mktEventTabId" />
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
import ButtonEdit from './widget/ButtonEdit.vue';


const store = useStore();

/** 類型轉換成文字 */
const TextConversion = type => {
  switch (type) {
    case 'STORE':
      return '商店';
    case 'PRODUCT':
      return '商品';
    case 'VOUCHER':
      return '優惠券';
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
