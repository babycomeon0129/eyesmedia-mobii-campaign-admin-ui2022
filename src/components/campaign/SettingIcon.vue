<template>
  <div class="setting-icon">
    <el-dialog title="設定ICON" v-model="store.state.campaign.settingIcon.show" width="60%" :show-close="false">
      <div class="add-dialog">
        <button class="btn btn-add" @click="store.commit('campaign/SETTING_ICON', 'show');store.commit('campaign/SETTING_ICON', 'add')"><i class="el-icon-plus"></i>新增</button>
        <el-table :data="props.settingIconData" style="width: 100%">
          <el-table-column prop="banner" label="圖示" width="180">
            <template #default="scope">
              <img :src="scope.row.banner" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="名稱">
          </el-table-column>
          <el-table-column prop="sort" label="排序">
          </el-table-column>
          <el-table-column prop="status" label="資料狀態">
            <template #default="scope">
              <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
                {{ scope.row.status ? '有效' : '無效' }}
              </el-tag>
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
          <el-button @click="store.commit('campaign/SETTING_ICON', 'show')">關閉</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 功能區 -->
    <AddIcon />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useStore } from 'vuex';
// import axios from 'axios';
// component 
import AddIcon from '@/components/campaign/AddIcon.vue';

const store = useStore();
const props = defineProps({
  eventID: String
})

// const listData = () => {
//   const request = {
//     id: props.eventID,
//     type: 'ICON'
//   }
//   axios.get(`${process.env.VUE_APP_campaignAPI}${store.state.campaign.apiVersion}/block/list`, request)
//   .then( res => {
//     console.log(res);
//   })
// }


// console.log(listData);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
