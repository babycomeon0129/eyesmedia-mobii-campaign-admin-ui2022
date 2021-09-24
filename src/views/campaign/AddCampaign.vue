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
              <el-input></el-input>
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
              <el-input v-model="input"></el-input>
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
              <el-input type="textarea"></el-input>
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
              <el-input></el-input>
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
                <p>https://www.mobii.ai/event/</p>
                <el-input></el-input>
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
                <el-select v-model="value" placeholder="請選擇">
                  <el-option value="1"></el-option>
                  <el-option value="2"></el-option>
                  <el-option value="3"></el-option>
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
                v-model="value1"
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
                <el-select v-model="value" placeholder="請選擇">
                  <el-option value="有效"></el-option>
                  <el-option value="無效"></el-option>
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
              <UpLoad :beforeUpload="beforeUpload" />
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
              <el-input></el-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <label>內容</label>
              <el-input type="textarea" row="4"></el-input>
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
              <el-input></el-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <label>內容</label>
              <el-input type="textarea" row="4"></el-input>
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
              <el-input></el-input>
            </div>
          </div>
        </section>
      </el-collapse-transition>
      <h3>備註</h3>
      <section>
        <el-input></el-input>
      </section>
        <div class="row btn-area">
          <el-button type="primary">確認</el-button>
          <el-button>取消</el-button>
        </div>
    </form>
  </div>
</template>

<script setup>
import UpLoad from '@/components/common/UpLoad.vue';
import { ref } from 'vue';

const sectionCollapse = ref({
  basicSetting: true,
  uploadBanner: true,
  featureInfo: true,
  otherInfo: true,
  justKa: true
});

/** 圖片上傳大小、尺寸限制 */
const beforeUpload = file => {
  const isLt2M = file.size / 1024 / 1024 < 2
  console.log(file);
  if (!isLt2M) {
    this.$message.error('上傳圖片大小不得超過2MB');
  }
  return isLt2M
}
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
