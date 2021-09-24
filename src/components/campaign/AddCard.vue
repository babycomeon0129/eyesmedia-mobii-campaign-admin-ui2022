<template>
  <div class="add-icon">
    <el-dialog
      title="新增卡片"
      v-model="store.state.campaign.settingCard.add"
      width="60%"
      :show-close="false"
    >
      <form>
        <div class="row">
          <div class="col-12">
            <label>
              <span class="danger">*</span>卡片Tab名稱
            </label>
            <el-input></el-input>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <label>是否顯示卡片Tab</label>
            <el-select placeholder="請選擇">
              <el-option value="是"></el-option>
              <el-option value="否"></el-option>
            </el-select>
          </div>
          <div class="col-6">
            <label>
              <span class="danger">*</span>排序
              <el-tooltip placement="top">
                <template #content>數字越小越前面</template>
                <i class="el-icon-question"></i>
              </el-tooltip>
            </label>
            <el-input></el-input>
          </div>
        </div>
        <div class="row add-card">
          <div class="col-12" v-for="card in cardList" :key="card.id">
            <div class="row card-title">
              <h4>卡片{{ card.id }}</h4>
              <!-- 刪除此筆 -->
              <button class="btn" type="button" @click="deletCard(card.id)">
                <i class="el-icon-delete danger"></i>
              </button>
            </div>
            <div class="row">
              <div class="col-6">
                <label>
                  <span class="danger">*</span>名稱
                </label>
                <el-input v-model="card.title"></el-input>
              </div>
              <div class="col-6">
                <label>是否顯示卡片</label>
                <el-select placeholder="請選擇">
                  <el-option :value="1">是</el-option>
                  <el-option :value="0">否</el-option>
                </el-select>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <label>
                  <span class="danger">*</span>上傳圖檔
                </label>
                <UpLoad />
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <label>
                  <span class="danger">*</span>網頁開啟模式
                </label>
                <el-select placeholder="請選擇">
                  <el-option :value="1">是</el-option>
                  <el-option :value="0">否</el-option>
                </el-select>
              </div>
              <div class="col-6">
                <label>
                  <span class="danger">*</span>URL
                </label>
                <el-input>
                  <template #append>
                    <el-checkbox label="App另開瀏覽器"></el-checkbox>
                  </template>
                </el-input>
              </div>
            </div>
          </div>
          <!-- 新增卡片 -->
            <div class="row">
              <button class="btn btn-addlist" @click="addCard" type="button"><i class="el-icon-circle-plus"></i></button>
            </div>
        </div>
      </form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="savaData">儲存</el-button>
          <el-button
            @click="store.state.campaign.settingCard.add = false; store.state.campaign.settingCard.show = true"
          >關閉</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus'
// component
import UpLoad from '@/components/common/UpLoad.vue';

const store = useStore();
/** 卡片列表 */
const cardList = reactive([
  {
    id: 1,
    title: '',
    img: '',
    target: '',
    url: '',
    show: true
  }
]);

/** 新增卡片 */
const addCard = () => {
  let cardId = cardList[cardList.length -1].id + 1;
  cardList.push({
    id: cardId,
    title: '',
    img: '',
    target: '',
    url: '',
    show: true
  })
};

/** 刪除卡片 */
const deletCard = id => {
  console.log(id);
  if(cardList.length > 1) {
    cardList.splice(id-1, 1);
    console.log(cardList);
  } else {
    ElMessage.error('請至少新增一個卡片');
  }
};
/** 儲存 */
const savaData = () => {
  store.state.campaign.settingCard.add = false;
  store.state.campaign.settingCard.show = true;

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.add-card {
  padding: 1em 0;
  .col-12 {
    padding: 0 0 1em 0;
  }
  .card-title {
    border-bottom: 1px solid #c9ced2;
    display: flex;
    align-items: flex-end;
    padding: 0 0 0 0.5em;
  }
  h4 {
    text-align: left;
    flex: 1;
  }
  i {
    &:hover {
      font-weight: bold;
    }
  }
}
</style>
