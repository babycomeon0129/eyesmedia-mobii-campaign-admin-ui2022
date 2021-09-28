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
            <el-input></el-input>
          </div>
          <div class="col-6">
            <label>開始與結束時間</label>
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="開始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <label>狀態</label>
            <div class="row">
              <el-select placeholder="請選擇">
                <el-option value="有效"></el-option>
                <el-option value="無效"></el-option>
              </el-select>
            </div>
          </div>
          <div class="col-6 btnarea">
            <el-button type="primary">
              <i class="el-icon-search"></i>搜尋
            </el-button>
          </div>
        </div>
      </section>
    </form>
    <h3>資料列表</h3>
    <section>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="banner" label="主圖">
          <template #default="scope">
            <img :src="scope.row.banner" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="一頁式活動名稱"></el-table-column>
        <el-table-column prop="id" label="編號"></el-table-column>
        <el-table-column prop="time" label="活動時間"></el-table-column>
        <el-table-column prop="open" label="開啟功能"></el-table-column>
        <el-table-column prop="status" label="狀態">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
              {{
                scope.row.status ? "有效" : "無效"
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
                  <el-button type="warning" icon="el-icon-money" size="mini" @click="store.state.campaign.settingAd.show = true"></el-button>
                </el-tooltip>

                <el-tooltip content="設定卡片" placement="top">
                  <el-button type="warning" icon="el-icon-postcard" size="mini" @click="store.state.campaign.settingCard.show = true"></el-button>
                </el-tooltip>
                <el-tooltip content="設定優惠券" placement="top">
                  <el-button type="warning" icon="el-icon-discount" size="mini" @click="store.state.campaign.settingVoucher.show = true"></el-button>
                </el-tooltip>
                <el-tooltip content="設定商品" placement="top">
                  <el-button type="warning" icon="el-icon-shopping-bag-2" size="mini" @click="store.state.campaign.settingProduct.show = true"></el-button>
                </el-tooltip>
                <el-tooltip content="設定Banner" placement="top">
                  <el-button type="warning" icon="el-icon-picture" size="mini" @click="store.state.campaign.settingBanner.show = true"></el-button>
                </el-tooltip>
                <el-tooltip content="設定商家" placement="top">
                  <el-button type="warning" icon="el-icon-s-shop" size="mini" @click="store.state.campaign.settingStore.show = true"></el-button>
                </el-tooltip>
                <el-tooltip content="設定瀑布流" placement="top">
                  <el-button type="warning" icon="el-icon-film" size="mini" @click="store.state.campaign.settingWaterfalls.show = true"></el-button>
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
    <el-pagination :page-size="50" :pager-count="11" layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>

<script setup >
import { ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios'
// component
import SettingIcon from '@/components/campaign/SettingIcon.vue';
import SettingAd from '@/components/campaign/SettingAd.vue';
import SettingCard from '@/components/campaign/SettingCard.vue';
import SettingBanner from '@/components/campaign/SettingBanner.vue';
import SettingVoucher from '@/components/campaign/SettingVoucher.vue';
import SettingProduct from '@/components/campaign/SettingProduct.vue';
import SettingStore from '@/components/campaign/SettingStore.vue';
import SettingWaterfalls from '@/components/campaign/SettingWaterfalls.vue';


const listData = axios.post('http://localhost:5000/campaign/api/v1/event/list', {
  "name": '',
  "sdate": '',
  "edate": '',
  "status": '',
  "paginationInfo": {
    "pageIndex": 0,
    "totalPages": 0,
    "totalNumber": 0,
    "pageSize": 0
  }
}).then( res =>{
  console.log(res);
}).catch(err=> {
  console.log(err);
});

console.log(listData);


const store = useStore(); // 等同於this.$store
/** 假資料 */
const tableData = ref([
  {
    banner: './1.jpg',
    title: '123',
    id: 456,
    time: '2013-2014',
    open: '優惠券／廣告',
    status: 1,
    sort: 0
  },
  {
    banner: './1.jpg',
    title: '半糖奶',
    id: 7777,
    time: '2011-3333',
    open: '優惠券／商品 / 廣告',
    status: 1,
    sort: 1
  },
  {
    banner: './1.jpg',
    title: '消毒盒',
    id: 454654654,
    time: '2022-2033',
    open: '無',
    status: 0,
    sort: 2
  }]);


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