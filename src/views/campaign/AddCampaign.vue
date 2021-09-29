<template>
  <div class="addCampaign">
    <!-- 麵包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/">一頁式活動模組</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/">新增 & 編輯</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <!-- 表單 -->
    <form>
      <!-- 基本設定 -->
      <h3 @click="sectionCollapse.basicSetting = !sectionCollapse.basicSetting">基本設定</h3>
      <el-collapse-transition>
        <section v-show="sectionCollapse.basicSetting">
          <div class="row">
            <div class="col-6">
              <label>一頁式活動編碼</label>
              <el-input v-model="request.data.mktEventCode"></el-input>
            </div>
            <div class="col-6">
              <label>
                <span class="danger">*</span>一頁式活動名稱
                <el-tooltip placement="top">
                  <template #content>
                    活動名稱(外部)
                    <br />page title、og title、meta title
                    <br />[外部名稱]
                    - Mobii!
                  </template>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </label>
              <el-input v-model="request.data.mktEventName"></el-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <label>
                Meta Description
                <el-tooltip placement="top">
                  <template #content>判斷搜尋時的 Meta Description 欄位</template>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </label>
              <el-input type="textarea" v-model="request.data.mktEventMetaDiscription"></el-input>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <label>
                SEO 關鍵字
                <el-tooltip placement="top">
                  <template #content>
                    1.判斷 SEO 關鍵字欄位
                    <br />2.輸入多個關鍵字時請用半形逗號『,』隔開
                  </template>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </label>
              <el-input v-model="request.data.mktEventSeo"></el-input>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <label>
                設定網址
                <el-tooltip placement="top">
                  <template #content>若無填寫則由系統自動帶入編碼當網址使用</template>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </label>
              <div class="row flexbox">
                <p>https://events.mobii.ai/campaign/</p>
                <el-input v-model="request.data.mktEventUriSuffix"></el-input>
              </div>
            </div>
            <div class="col-6">
              <label>
                是否開啟卡片群組身份判斷
                <el-tooltip placement="top">
                  <template #content>擁有被選中的群組身份的會員才可進行優惠券領取、購買等操作</template>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </label>
              <div class="row">
                <el-select placeholder="請選擇">
                  <el-option value="ENABLE">開啟</el-option>
                  <el-option value="DISABLE">關閉</el-option>
                </el-select>
                <el-checkbox label="是" border></el-checkbox>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <label>完整活動網址</label>
              <el-input></el-input>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <label>
                <span class="danger">*</span>開始與結束時間
              </label>
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="開始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
            <div class="col-6">
              <label>
                <span class="danger">*</span>資料狀態
              </label>
              <div class="row">
                <el-select v-model="request.data.mktEventStatus" placeholder="請選擇">
                  <el-option value="ENABLE" label="開啟"></el-option>
                  <el-option value="DISABLE" label="關閉"></el-option>
                </el-select>
              </div>
            </div>
          </div>
        </section>
      </el-collapse-transition>
      <!-- 上傳版面圖片 -->
      <h3 @click="sectionCollapse.uploadBanner = !sectionCollapse.uploadBanner">上傳版面圖片</h3>
      <el-collapse-transition>
        <section v-show="sectionCollapse.uploadBanner">
          <div class="row">
            <div class="col-12">
              <label>Logo 橫幅</label>
              <UpLoad :imgWidth="220" :imgHeigh="56" />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <img src="../../../public/images/campaign/setting-title.jpg" class="rwdimg" />
            </div>
          </div>
        </section>
      </el-collapse-transition>
      <!-- 特色資訊 -->
      <h3 @click="sectionCollapse.featureInfo = !sectionCollapse.featureInfo">特色資訊</h3>
      <el-collapse-transition>
        <section v-show="sectionCollapse.featureInfo">
          <div class="row">
            <div class="col-6">
              <label>標題</label>
              <el-input v-model="request.data.mktEventTitle"></el-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <label>內容</label>
              <el-input type="textarea" row="4" v-model="request.data.mktEventContent"></el-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <img src="../../../public/images/campaign/setting-info.jpg" class="rwdimg" />
            </div>
          </div>
        </section>
      </el-collapse-transition>
      <!-- 其他資訊 -->
      <h3 @click="sectionCollapse.otherInfo = !sectionCollapse.otherInfo">其他資訊</h3>
      <el-collapse-transition>
        <section v-show="sectionCollapse.otherInfo">
          <div class="row">
            <div class="col-12">
              <label>標題</label>
              <el-input v-model="request.data.mktEventOtherTitle"></el-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <label>內容</label>
              <el-input type="textarea" row="4" v-model="request.data.mktEventOtehrContent"></el-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <img src="../../../public/images/campaign/setting-otherinfo.jpg" class="rwdimg" />
            </div>
          </div>
        </section>
      </el-collapse-transition>
      <!-- 其他資訊 -->
      <h3 @click="sectionCollapse.justKa = !sectionCollapse.justKa">JustKa 連結</h3>
      <el-collapse-transition>
        <section v-show="sectionCollapse.justKa">
          <div class="row">
            <div class="col-12">
              <label>URL</label>
              <el-input v-model="request.data.mktEventOtehrJustka"></el-input>
            </div>
          </div>
        </section>
      </el-collapse-transition>
      <h3>備註</h3>
      <section>
        <el-input v-model="request.data.mktEventNote"></el-input>
      </section>
      <div class="row btn-area">
        <!-- 新增資料 -->
        <el-button type="primary" @click="updateData" v-if="route.params.eventId !== undefined">確認</el-button>
        <!-- 編輯資料 -->
        <el-button type="primary" @click="createData" v-if="route.params.eventId === undefined">確認</el-button>
        <el-button>取消</el-button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
// element UI
import { ElMessage } from 'element-plus';
import { ElLoading } from 'element-plus';
// component
import UpLoad from '@/components/common/UpLoad.vue';


const store = useStore();
const router = useRouter();
const route = useRoute();

console.log(route.params.eventId);

/**  操作清單Collapse收闔用 */
const sectionCollapse = ref({
  basicSetting: true,
  uploadBanner: true,
  featureInfo: true,
  otherInfo: true,
  justKa: true
});

/** 設定日期 */
const dateRange = ref([]);

/** API request */
const request = reactive({
  data: {
    mktEventId: '',
    mktEventCode: '',
    mktEventName: '',
    mktEventMetaDiscription: '',
    mktEventSeo: '',
    mktEventUriSuffix: '',
    mktEventSdate: computed(() => dateRange.value[0]),
    mktEventEdate: computed(() => dateRange.value[1]),
    mktEventStatus: 'ENABLE',
    mktEventTitle: '',
    mktEventContent: '',
    mktEventOtherTitle: '',
    mktEventOtehrContent: '',
    mktEventLogo: '',
    mktEventNote: '',
    mktEventOtehrJustka: ''
  }
});

/** 新增資料 */
const createData = () => {
  axios.post(`${process.env.VUE_APP_hostUrl}campaign/api/v${store.state.campaign.apiVersion}/event/add`, request.data)
    .then(res => {
      console.log(res);
      if (res.data.errorCode === '996600001') {
        ElMessage.success({
          message: '新增成功',
          type: 'success',
        });
        router.push({ path: '/' });
      } else {
        ElMessage.error(`errorCode:${res.data.errorCode}`);
      }
    })
    .catch(err => {
      console.log(err);
    })
}

/** 編輯資料 */
const editData = () => {
  if (route.params.eventId !== undefined) {
    request.data.mktEventId = route.params.eventId;
    axios.get(`${process.env.VUE_APP_hostUrl}campaign/api/v${store.state.campaign.apiVersion}/event/detail/${request.data.mktEventId}`)
      .then(res => {
        if (res.data.errorCode === '996600001') {
          const data = JSON.parse(res.data.data);
          request.data = data;
          dateRange.value[0] = data.mktEventSdate;
          dateRange.value[1] = data.mktEventEdate;
          request.data.mktEventSdate = computed(() => dateRange.value[0]);
          request.data.mktEventEdate = computed(() => dateRange.value[1]);
        } else {
          ElMessage.error(`errorCode:${res.data.errorCode}`);
        }

      })
      .catch(err => {
        console.log(err);
      });
  }
}

/** 更新資料 */
const updateData = () => {
  // 開啟loading遮罩
  ElLoading.service({ fullscreen: true });
  axios.post(`${process.env.VUE_APP_hostUrl}campaign/api/v${store.state.campaign.apiVersion}/event/update`, request.data)
    .then(res => {
      if (res.data.errorCode === '996600001') {
        // 關閉loading遮罩
        ElLoading.service().close();
        this.$loading.close();
        ElMessage.success({
          message: '更新成功',
          type: 'success',
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
}

onMounted(() => {
  editData();
});


</script>

<style scoped lang="scss">
::v-deep .el-select {
  flex: 1;
}

::v-deep .el-input__inner {
  width: 100%;
}
.btn-area {
  padding: 2em 0;
  justify-content: right;
}
</style>
