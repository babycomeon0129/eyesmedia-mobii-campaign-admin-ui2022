<template>
  <div class="home">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/">一頁式活動模組</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <form>
      <!-- 查詢搜尋區 -->
      <h3>查詢條件</h3>
      <section>
        <div class="row">
          <div class="col-6">
            <label>一頁式活動名稱</label>
            <el-input v-model="request.name"></el-input>
          </div>
          <div class="col-6">
            <label>開始與結束時間</label>
            <el-date-picker
              v-model="dateRange"
              type="datetimerange"
              range-separator="-"
              start-placeholder="開始日期"
              end-placeholder="结束日期"
              :clearable="false"
              value-format="YYYY-MM-DDTHH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <label>狀態</label>
            <div class="row">
              <el-select placeholder="請選擇" v-model="request.status">
                <el-option value="ENABLE" label="有效"></el-option>
                <el-option value="DISABLE" label="無效"></el-option>
              </el-select>
            </div>
          </div>
          <div class="col-6 btnarea">
            <el-button type="primary" @click="getListData">
              <i class="el-icon-search"></i>搜尋
            </el-button>
          </div>
        </div>
      </section>
    </form>
    <!-- 資料列表 -->
    <h3>
      資料列表
      <button class="btn btn-add" @click="router.push({ path: `/AddCampaign` })">
        <i class="el-icon-plus"></i>新增
      </button>
    </h3>
    <section>
      <el-table :data="listData" stripe style="width: 100%">
        <el-table-column prop="mktEventName" label="一頁式活動名稱"></el-table-column>
        <el-table-column prop="mktEventCode" label="編號" width="140px"></el-table-column>
        <el-table-column label="活動時間" width="170px">
          <template #default="scope">
            {{ moment(scope.row.mktEventSdate).format('YYYY-MM-DD HH:mm:ss') }} ~
            <br />
            {{ moment(scope.row.mktEventEdate).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column prop="mktEventStatus" label="狀態" width="70px">
          <template #default="scope">
            <el-tag :type="scope.row.mktEventStatus === 'ENABLE' ? 'success' : 'info'">
              {{
                scope.row.mktEventStatus === 'ENABLE' ? "有效" : "無效"
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="網址" >
          <template #default="scope">
            <el-row align="middle">
              <el-col :span="3"><el-button icon="el-icon-link" size="mini" circle @click="copyUrl(scope.row.mktEventUrl)"/></el-col>
              <el-col :span="21">{{ scope.row.mktEventUrl }}</el-col>
            </el-row>
          </template>
        </el-table-column>
        
        <el-table-column label="功能列表" width="200px">
          <template #default="scope">
            <div class="table-icon">
              <el-button-group>
                <el-tooltip content="編輯" placement="top">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="router.push({ path: `/AddCampaign/${scope.row.mktEventId}` })"
                  ></el-button>
                </el-tooltip>
                
                <el-tooltip content="設定置頂Banner" placement="top">
                  <el-button
                    :plain="!scope.row.mktEventOpenFunction.includes('BANNER')"
                    type="warning"
                    icon="el-icon-picture"
                    size="mini"
                    @click="getBlockList('BANNER', scope.row.mktEventId)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定ICON" placement="top">
                  <el-button
                    :plain="!scope.row.mktEventOpenFunction.includes('ICON')"
                    type="warning"
                    icon="el-icon-medal"
                    size="mini"
                    @click="getBlockList('ICON', scope.row.mktEventId)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定中間廣告" placement="top">
                  <el-button
                    :plain="!scope.row.mktEventOpenFunction.includes('AD')"
                    type="warning"
                    icon="el-icon-money"
                    size="mini"
                    @click="getBlockList('AD', scope.row.mktEventId)"
                  ></el-button>
                </el-tooltip>

                <el-tooltip content="設定圖文廣告欄位" placement="top">
                  <el-button
                    :plain="!scope.row.mktEventOpenFunction.includes('CARD')"
                    type="warning"
                    icon="el-icon-postcard"
                    size="mini"
                    @click="getBlockList('CARD', scope.row.mktEventId)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定優惠券" placement="top">
                  <el-button
                    :plain="!scope.row.mktEventOpenFunction.includes('VOUCHER')"
                    type="warning"
                    icon="el-icon-discount"
                    size="mini"
                    @click="getBlockList('VOUCHER', scope.row.mktEventId)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定商品" placement="top">
                  <el-button
                    :plain="!scope.row.mktEventOpenFunction.includes('PRODUCT')"
                    type="warning"
                    icon="el-icon-shopping-bag-2"
                    size="mini"
                    @click="getBlockList('PRODUCT', scope.row.mktEventId)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定商店" placement="top">
                  <el-button
                    :plain="!scope.row.mktEventOpenFunction.includes('STORE')"
                    type="warning"
                    icon="el-icon-s-shop"
                    size="mini"
                    @click="getBlockList('STORE', scope.row.mktEventId)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定瀑布流" placement="top">
                  <el-button
                    :plain="!scope.row.mktEventOpenFunction.includes('WATERFALL')"
                    type="warning"
                    icon="el-icon-film"
                    size="mini"
                    @click="getBlockList('WATERFALL', scope.row.mktEventId)"
                  ></el-button>
                </el-tooltip>

                <el-popconfirm
                  confirm-button-text="刪除"
                  cancel-button-text="取消"
                  icon="el-icon-info"
                  icon-color="red"
                  title="確定要刪除嗎？"
                  @confirm="deleteData(scope.row.mktEventId, scope.$index)"
                >
                  <template #reference>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                    ></el-button>
                  </template>
                </el-popconfirm>
                
              </el-button-group>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!-- 功能介面區 -->
    <SettingDialog />
    <AddDialog />
    <EditDialog />
    <!-- 分頁 -->
    <el-pagination
      v-show="listData.length > 0"
      @current-change="changeCurrentPage($event)"
      :page-size="request.paginationInfo.pageSize"
      :pager-count="11"
      layout="prev, pager, next"
      :total="request.paginationInfo.totalNumber"
    ></el-pagination>
  </div>
</template>

<script setup>
import AddDialog from '@/components/campaign/AddDialog.vue';
import EditDialog from '@/components/campaign/EditDialog.vue';
// component
import SettingDialog from '@/components/campaign/SettingDialog.vue';
import axios from 'axios';
// element UI
import { ElLoading, ElMessage } from 'element-plus';
// moment
import moment from 'moment';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

/** vuex */
const store = useStore();
/** router */
const router = useRouter();
/** 列表資料 */
const listData = ref([]);
/** 日期範圍 */
const dateRange = ref([]);
/** API request */
const request = reactive({
  name: null,
  sdate: computed(() => dateRange.value[0]),
  edate: computed(() => dateRange.value[1]),
  status: null,
  paginationInfo: {
    pageIndex: 1,
    totalPages: 1,
    totalNumber: 0,
    pageSize: 10
  }
});

/** 點擊分頁 */
const changeCurrentPage = event => {
  request.paginationInfo.pageIndex = event;
  getListData();
}

/** 取列表資料 */
const getListData = () => {
  // 開啟loading遮罩
  ElLoading.service({ fullscreen: true });
  axios.post(`${process.env.VUE_APP_campaignAPI}${store.state.campaign.apiVersion}/event/list`, request)
    .then(res => {
      // 關閉loading遮罩
      ElLoading.service().close();
      // console.log(res.data);
      if (res.data.errorCode === '996600001') {
        const data = JSON.parse(res.data.data);
        request.paginationInfo = data.paginationInfo;
        listData.value = data.events;
      } else {
        ElMessage.error(`errorCode:${res.data.errorCode}`);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

/** 刪除資料 */
const deleteData = (eventID, index) => {
  axios.delete(`${process.env.VUE_APP_campaignAPI}${store.state.campaign.apiVersion}/event/remove/${eventID}`)
    .then(res => {
      if (res.data.errorCode === '996600001') {
        ElMessage.success({
          message: '刪除成功',
          type: 'success',
        });
        listData.value.splice(index, 1);
      } else {
        ElMessage.error(`errorCode:${res.data.errorCode}`);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

/** 取得區塊服務資料
 * @param type    {string} 區塊類型，如：AD、ICON等等
 * @param eventID {string} 活動ID，帶mktEventId
 */
const getBlockList = (type, eventID) => {
  ElLoading.service({ fullscreen: true });
  store.commit('campaign/SETTING_EVENTID', eventID);
  store.commit('campaign/SETTING_BLOCKTYPE', type);
  store.commit('campaign/SETTING_BLOCK_LIST_DATA', {
    type: type,
    data: []
  });
  const request = reactive({
    id: eventID,
    type: type,
    paginationInfo: {
      pageIndex: 1,
      totalPages: 1,
      totalNumber: 0,
      pageSize: 10
    }
  });
  axios.post(`${process.env.VUE_APP_campaignAPI}${store.state.campaign.apiVersion}/block/list`, request)
    .then(res => {
      ElLoading.service().close();
      if (res.data.errorCode === '996600001') {
        const data = JSON.parse(res.data.data);
        store.commit('campaign/SETTING_DIALOG', 'show');
        if (data !== null) {
          store.commit('campaign/SETTING_BLOCK_ID', data.block.mktEventBlockId);
          store.commit('campaign/SETTING_BLOCK_NAME', data.block.mktEventBlockName);
          store.commit('campaign/SETTING_BLOCK_LIST_PGN', data.paginationInfo);
          store.commit('campaign/SETTING_BLOCK_LIST_DATA', {
            type: type,
            data: data.block[store.getters['campaign/resType']]
          });
        } else {
          store.commit('campaign/SETTING_BLOCK_ID', '');
          store.commit('campaign/SETTING_BLOCK_NAME', '');
          // 至少要告訴設定頁總資料為0，不然分頁會壞掉
          store.commit('campaign/SETTING_BLOCK_LIST_PGN', {
            totalNumber: 0
          });
        }
      } else {
        ElMessage.error(`errorCode:${res.data.errorCode}`);
      }
    })
    .catch(err => {
      console.log(err);
    });
}
/** 複製活動連結 */
const copyUrl = (mktEventUrl) => {
  navigator.clipboard.writeText(mktEventUrl).then(() => {
    ElMessage.success({
      message: '已複製網址',
      type: 'success',
    });
  }).catch(() => {
    ElMessage.success({
      message: '網址複製失敗',
      type: 'error',
    });
  });
}

// Vue 實體已建立，狀態與事件已初始化完成
onMounted(() => {
  getListData();
});


</script>

<style scoped lang="scss">
.btnarea {
  position: relative;
  button {
    position: absolute;
    right: 0.5em;
    bottom: 0;
    i {
      padding-right: 5px;
    }
  }
}
::v-deep .el-pagination {
  margin-top: 1em;
  --el-pagination-background-color: rgba(0, 0, 0, 0);
}
</style>