<template>
  <div class="setting-icon">
    <el-dialog
      title="設定卡片"
      v-model="store.state.campaign.settingCard.show"
      width="60%"
      :show-close="false"
    >
      <div class="add-dialog">
        <div class="row">
          <label>
            <span class="danger">*</span>卡片版位標題
          </label>
          <el-input></el-input>
        </div>
        <div class="row">
          <button
            class="btn btn-add"
            @click="store.commit('campaign/SETTING_CARD', 'show');store.commit('campaign/SETTING_CARD', 'add')"
          >
            <i class="el-icon-plus"></i>新增
          </button>
          <el-table :data="props.settingCardData" style="width: 100%">
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
        </div>
        <div class="row">
          <img src="../../../public/images/campaign/setting-card.jpg" class="rwdimg">
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="store.commit('campaign/SETTING_CARD', 'show')">確認</el-button>
          <el-button @click="store.commit('campaign/SETTING_CARD', 'show')">關閉</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 功能區 -->
    <AddCard />
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { defineProps } from 'vue';
// component 
import AddCard from '@/components/campaign/AddCard.vue';

const store = useStore();
const props = defineProps({
  settingCardData: Array
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
