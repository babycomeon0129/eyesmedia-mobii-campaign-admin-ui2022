<template>
  <div class="setting-icon">
    <el-dialog title="設定廣告" v-model="store.state.campaign.settingAd.show" width="60%" :show-close="false">
      <div class="add-dialog">
        <button class="btn btn-add" @click="store.state.campaign.settingAd.add = true; store.state.campaign.settingAd.show = false"><i class="el-icon-plus"></i>新增</button>
        <el-table :data="props.settingAdData" style="width: 100%">
          <el-table-column prop="banner" label="圖示" width="180">
            <template #default="scope">
              <img :src="scope.row.banner" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="名稱">
          </el-table-column>
          <el-table-column prop="sort" label="排序">
          </el-table-column>
          <el-table-column prop="status" label="是否顯示廣告">
            <template #default="scope">
             {{ scope.row.status ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column label="功能">
            <template #default>
              <div class="table-icon">
                <el-button-group>
                  <el-tooltip content="編輯" placement="top">
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      size="mini"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip content="刪除資料" placement="top">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                    ></el-button>
                  </el-tooltip>
                </el-button-group>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="store.state.campaign.settingAd.show = false">關閉</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 功能區 -->
    <AddAd />
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { defineProps } from 'vue';
// component 
import AddAd from '@/components/campaign/AddAd.vue';

const store = useStore();
const props = defineProps({
  settingAdData: Array
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
