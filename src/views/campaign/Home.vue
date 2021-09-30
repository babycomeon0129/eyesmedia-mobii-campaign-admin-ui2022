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
    <h3>
      資料列表
      <button class="btn btn-add" @click="router.push({ path: `/AddCampaign` })">
        <i class="el-icon-plus"></i>新增
      </button>
    </h3>
    <section>
      <el-table :data="listData" stripe style="width: 100%">
        <el-table-column prop="banner" label="主圖">
          <template #default="scope">
            <img :src="scope.row.banner" />
          </template>
        </el-table-column>
        <el-table-column prop="mktEventName" label="一頁式活動名稱"></el-table-column>
        <el-table-column prop="mktEventCode" label="編號"></el-table-column>
        <el-table-column label="活動時間">
          <template #default="scope">
            {{ moment(scope.row.mktEventSdate).format('YYYY-MM-DD') }} ~
            <br />
            {{ moment(scope.row.mktEventEdate).format('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column prop="mktEventOpenFunction" label="開啟功能"></el-table-column>
        <el-table-column prop="mktEventStatus" label="狀態">
          <template #default="scope">
            <el-tag :type="scope.row.mktEventStatus === 'ENABLE' ? 'success' : 'info'">
              {{
                scope.row.mktEventStatus === 'ENABLE' ? "有效" : "無效"
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="功能列表">
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
                <el-tooltip content="設定ICON" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-medal"
                    size="mini"
                    @click="store.commit('campaign/SETTING_ICON', 'show'); evenId = scope.row.mktEventId"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定廣告" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-money"
                    size="mini"
                    @click="store.commit('campaign/SETTING_AD', 'show')"
                  ></el-button>
                </el-tooltip>

                <el-tooltip content="設定卡片" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-postcard"
                    size="mini"
                    @click="store.commit('campaign/SETTING_CARD', 'show')"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定優惠券" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-discount"
                    size="mini"
                    @click="store.commit('campaign/SETTING_VOUCHER', 'show')"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定商品" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-shopping-bag-2"
                    size="mini"
                    @click="store.commit('campaign/SETTING_PRODUCT', 'show')"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定Banner" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-picture"
                    size="mini"
                    @click="store.commit('campaign/SETTING_BANNER', 'show')"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定商家" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-s-shop"
                    size="mini"
                    @click="store.commit('campaign/SETTING_STORE', 'show')"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="設定瀑布流" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-film"
                    size="mini"
                    @click="store.commit('campaign/SETTING_WATERFALLS', 'show')"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="刪除資料" placement="top">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="deleteData(scope.row.mktEventId, scope.$index)"
                  ></el-button>
                </el-tooltip>
              </el-button-group>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!-- 功能介面區 -->
    <SettingIcon :eventID="evenId" />
    <SettingAd :settingAdData="listData" />
    <SettingCard :settingCardData="listData" />
    <SettingBanner :settingBannerData="listData" />
    <SettingVoucher :settingVoucherData="listData" />
    <SettingProduct :settingProductData="listData" />
    <SettingStore :settingStoreData="listData" />
    <SettingWaterfalls :settingWaterfallsData="listData" />
    <!-- 分頁 -->
    <el-pagination
      @current-change="changeCurrentPage($event)"
      :page-size="request.paginationInfo.pageSize"
      :pager-count="11"
      layout="prev, pager, next"
      :total="request.paginationInfo.totalNumber"
    ></el-pagination>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';
// moment
import moment from 'moment'
// element UI
import { ElMessage } from 'element-plus';
import { ElLoading } from 'element-plus';
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
/** router */
const router = useRouter();
/** 列表資料 */
const listData = ref(null);
/** 日期範圍 */
const dateRange = ref([]);
/** 活動ID */
const evenId = ref('');
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
      console.log(res);
      const data = JSON.parse(res.data.data);
      request.paginationInfo = data.paginationInfo;
      listData.value = data.events;
      // 關閉loading遮罩
      ElLoading.service().close();
      if (res.data.errorCode === '996600001') {
        listData.value = data.events;
        // console.log(listData);
      } else {
        console.log(res);
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

// Vue 實體已建立，狀態與事件已初始化完成
onMounted(() => {
  getListData();
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