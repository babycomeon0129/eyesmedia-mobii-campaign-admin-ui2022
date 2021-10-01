<template>
  <button
    class="btn btn-add"
    @click="store.commit('campaign/SETTING_AD', 'show'); store.commit('campaign/SETTING_AD', 'add')"
  >
    <i class="el-icon-plus"></i>新增
  </button>
  <el-table :data="props.settingAdData" style="width: 100%">
    <el-table-column prop="banner" label="圖示" width="180">
      <template #default="scope">
        <img :src="scope.row.banner" />
      </template>
    </el-table-column>
    <el-table-column prop="title" label="名稱"></el-table-column>
    <el-table-column prop="sort" label="排序"></el-table-column>
    <el-table-column prop="status" label="是否顯示廣告">
      <template #default="scope">{{ scope.row.status ? '是' : '否' }}</template>
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
import { defineProps } from 'vue';


const store = useStore();
const props = defineProps({
  settingAdData: Array
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
