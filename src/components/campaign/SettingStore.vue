<template>
  <div class="settingstore">
    <el-dialog
      title="設定商店"
      v-model="store.state.campaign.settingStore.show"
      width="60%"
      :show-close="false"
    >
      <div class="add-dialog">
        <div class="row">
          <label>
            <span class="danger">*</span>商店版位標題
          </label>
          <el-input></el-input>
        </div>
        <div class="row">
          <button
            class="btn btn-add"
            @click="store.commit('campaign/SETTING_STORE', 'show'); store.commit('campaign/SETTING_STORE', 'add')"
          >
            <i class="el-icon-plus"></i>新增
          </button>
          <el-table :data="props.settingStoreData" style="width: 100%">
            <el-table-column prop="banner" label="商店Tab名稱" width="180">
              <template #default="scope">
                <img :src="scope.row.banner" />
              </template>
            </el-table-column>
            <el-table-column prop="title" label="商店數量"></el-table-column>
            <el-table-column prop="sort" label="排序"></el-table-column>
            <el-table-column prop="status" label="是否顯示商店Tab">
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
          <el-button type="primary" @click="store.commit('campaign/SETTING_STORE', 'show')">確認</el-button>
          <el-button @click="store.commit('campaign/SETTING_STORE', 'show')">關閉</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 功能區 -->
    <AddStore />
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { defineProps } from 'vue';
// component 
import AddStore from '@/components/campaign/AddStore.vue';

const store = useStore();
const props = defineProps({
  settingStoreData: Array
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
