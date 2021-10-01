<template>
  <div class="settingwaterfall">
    <el-dialog
      title="設定瀑布流"
      v-model="store.state.campaign.settingWaterfall.show"
      width="60%"
      :show-close="false"
    >
      <div class="add-dialog">
        <div class="row">
          <label>
            <span class="danger">*</span>瀑布流版位標題
          </label>
          <el-input></el-input>
        </div>
        <div class="row">
          <button
            class="btn btn-add"
            @click="store.commit('campaign/SETTING_WATERFALL', 'show'); store.commit('campaign/SETTING_WATERFALL', 'add')"
          >
            <i class="el-icon-plus"></i>新增
          </button>
          <el-table :data="props.settingWaterfallData" style="width: 100%">
            <el-table-column prop="banner" label="分類" width="180">
              <template #default="scope">
                <img :src="scope.row.banner" />
              </template>
            </el-table-column>
            <el-table-column prop="title" label="數量"></el-table-column>
            <el-table-column prop="sort" label="排序"></el-table-column>
            <el-table-column prop="status" label="是否顯示瀑布流">
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
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="store.commit('campaign/SETTING_WATERFALL', 'show')">確認</el-button>
          <el-button @click="store.commit('campaign/SETTING_WATERFALL', 'show')">關閉</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 功能區 -->
    <AddWaterfall />
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { defineProps } from 'vue';
// component 
import AddWaterfall from '@/components/campaign/AddWaterfall.vue';

const store = useStore();
const props = defineProps({
  settingWaterfallData: Array
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
