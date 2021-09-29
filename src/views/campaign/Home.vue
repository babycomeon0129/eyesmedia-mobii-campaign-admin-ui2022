<template>
  <div class="home">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/">一頁式活動模組</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/">查詢</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <form>
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
              type="daterange"
              range-separator="-"
              start-placeholder="開始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <label>狀態</label>
            <div class="row">
              <el-select placeholder="請選擇" v-model="request.status">
                <el-option value="ENABLE" label="開啟"></el-option>
                <el-option value="DISABLE" label="關閉"></el-option>
              </el-select>
            </div>
          </div>
          <div class="col-6 btnarea">
            <el-button type="primary" @click="callApi">
              <i class="el-icon-search"></i>搜尋
            </el-button>
          </div>
        </div>
      </section>
    </form>
    <h3>資料列表</h3>
    <section>
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="banner" label="主圖">
          <template #default="scope">
            <img :src="scope.row.banner" />
          </template>
        </el-table-column>
        <el-table-column prop="mktEventCode" label="一頁式活動名稱"></el-table-column>
        <el-table-column prop="mktEventId" label="編號"></el-table-column>
        <el-table-column prop="mktEventEdate" label="活動時間"></el-table-column>
        <el-table-column prop="mktEventStatus" label="開啟功能"></el-table-column>
        <el-table-column prop="mktEventStatus" label="狀態">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'ENABLE' ? 'success' : 'info'">
              {{
                scope.row.status === 'ENABLE' ? "有效" : "無效"
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="功能列表">
          <template #default>
            <div class="table-icon">
              <el-button-group>
                <el-tooltip content="編輯" placement="top">
                  <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                </el-tooltip>
                <el-tooltip content="設定ICON" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-medal"
                    size="mini"
                    @click="store.state.campaign.settingIcon.show = true"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定廣告" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-money"
                    size="mini"
                    @click="store.state.campaign.settingAd.show = true"
                  ></el-button>
                </el-tooltip>

                <el-tooltip content="設定卡片" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-postcard"
                    size="mini"
                    @click="store.state.campaign.settingCard.show = true"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定優惠券" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-discount"
                    size="mini"
                    @click="store.state.campaign.settingVoucher.show = true"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定商品" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-shopping-bag-2"
                    size="mini"
                    @click="store.state.campaign.settingProduct.show = true"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定Banner" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-picture"
                    size="mini"
                    @click="store.state.campaign.settingBanner.show = true"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定商家" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-s-shop"
                    size="mini"
                    @click="store.state.campaign.settingStore.show = true"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定瀑布流" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-film"
                    size="mini"
                    @click="store.state.campaign.settingWaterfalls.show = true"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="刪除資料" placement="top">
                  <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                </el-tooltip>
              </el-button-group>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!-- 功能介面區 -->
    <SettingIcon :settingIconData="tableData" />
    <SettingAd :settingAdData="tableData" />
    <SettingCard :settingCardData="tableData" />
    <SettingBanner :settingBannerData="tableData" />
    <SettingVoucher :settingVoucherData="tableData" />
    <SettingProduct :settingProductData="tableData" />
    <SettingStore :settingStoreData="tableData" />
    <SettingWaterfalls :settingWaterfallsData="tableData" />
    <!-- 分頁 -->
    <el-pagination
      @current-change="changeCurrentPage($event)"
      :page-size="request.paginationInfo.pageSize"
      :pager-count="11"
      layout="prev, pager, next"
      :total="request.paginationInfo.totalPages"
    ></el-pagination>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { ElMessage } from 'element-plus';
// component
import SettingIcon from '@/components/campaign/SettingIcon.vue';
import SettingAd from '@/components/campaign/SettingAd.vue';
import SettingCard from '@/components/campaign/SettingCard.vue';
import SettingBanner from '@/components/campaign/SettingBanner.vue';
import SettingVoucher from '@/components/campaign/SettingVoucher.vue';
import SettingProduct from '@/components/campaign/SettingProduct.vue';
import SettingStore from '@/components/campaign/SettingStore.vue';
import SettingWaterfalls from '@/components/campaign/SettingWaterfalls.vue';

/** vuex */
const store = useStore();
/** loading遮罩 */
const loading = ref(false);
/** 表格資料 */
const tableData = ref(null);
/** 日期範圍 */
const dateRange = ref([]);
/** API request */
const request = reactive({
  name: null,
  sdate: computed(()=> dateRange.value[0]),
  edate: computed(()=> dateRange.value[1]),
  status: null,
  paginationInfo: {
    pageIndex: 1,
    totalPages: 1,
    totalNumber: 0,
    pageSize: 30
  }
});

/** 點擊分頁 */
const changeCurrentPage = event => {
  request.paginationInfo.pageIndex = event;
  callApi();
}

/** 取列表資料 */
const callApi = () => {
  loading.value = true;
  axios.post(`http://localhost:5000/campaign/api/v${store.state.campaign.apiVersion}/event/list`, request)
    .then(res => {
      const data = JSON.parse(res.data.data);
      // console.log(data);
      request.paginationInfo.totalPages = data.TotalPages;
      tableData.value = data.events;
      loading.value = false;
      if (res.data.errorCode === '996600001') {
        tableData.value = data.events;
       // console.log(tableData);
      } else {
        ElMessage.error(`errorCode:${res.data.errorCode}`);
      }

    }).catch(err => {
      console.log(err);
    });
}

// Vue 實體已建立，狀態與事件已初始化完成
onMounted(() => {
   callApi();
});


</script>

<style lang="scss">
::v-deep .el-select {
  flex: 1;
}

::v-deep .el-input__inner {
  width: 100%;
}

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