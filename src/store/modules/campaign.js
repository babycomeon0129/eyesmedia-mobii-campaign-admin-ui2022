import { reactive } from 'vue';

const state = reactive({
  /** API 版本 */
  apiVersion: 1,
  /** 活動ID */
  eventID: '',
  /** 區塊服務類型 */
  blockType: '',
  /** 設定dialog */
  campaignDialog: {
    show: false,
    add: false,
    type: ''
  },
  /** 設定icon */
  settingIcon: {
    show: false,
    add: false,
    data: []
  },
  /** 設定廣告 */
  settingAd: {
    show: false,
    add: false
  },
  /** 設定卡片 */
  settingCard: {
    show: false,
    add: false
  },
  /** 設定Banner */
  settingBanner: {
    show: false,
    add: false
  },
  /** 設定優惠券 */
  settingVoucher: {
    show: false,
    add: false
  },
  /** 設定商品 */
  settingProduct: {
    show: false,
    add: false
  },
  /** 設定商店 */
  settingStore: {
    show: false,
    add: false
  },
  /** 設定瀑布流 */
  settingWaterfall: {
    show: false,
    add: false
  }
})

// getters 
const getters = {
  blockTitle: state => {
    switch(state.blockType) {
      case 'CARD':
        return '卡片';
      case 'AD':
        return '廣告';
      case 'BANNER':
        return 'Banner';
      case 'ICON':
        return '按鈕';
      case 'VOUCHER':
        return '優惠券';
      case 'STORE':
        return '商店';
      case 'WATERFALL':
        return '瀑布流';
    }
  }
}

// actions 
const actions = {
  // ...
}

// mutations 
const mutations = {
  
  /** 設定活動ID */
  SETTING_EVENTID(state, id) {
    state.eventID = id;
  },
  /** 設定區塊類型 */
  SETTING_BLOCKTYPE(state, type) {
    state.blockType = type;
  },
  /** 控制活動dialog */
  SETTING_DIALOG(state, ctrl ) {
    switch(ctrl) {
      case 'show':
        state.campaignDialog.show = !state.campaignDialog.show;
        break;
      case 'add':
        state.campaignDialog.add = !state.campaignDialog.add;
        break;
    }
  },
  /** 設定icon
   * @param type 類型
   * @param data 改變資料
   */
  SETTING_ICON(state, {type, data}) {
    switch (type) {
      case 'show':
        state.settingIcon.show = !state.settingIcon.show;
        break;
      case 'add':
        state.settingIcon.add = !state.settingIcon.add;
        break;
      case 'data':
        state.settingIcon.data = data;
        break;
    }
  },
  /** 設定廣告
   * @param type 類型
   * @param data 改變資料
   */
  SETTING_AD(state, type, data) {
    switch (type) {
      case 'show':
        state.settingAd.show = !state.settingAd.show;
        break;
      case 'add':
        state.settingAd.add = !state.settingAd.add;
        break;
      case 'data':
        state.settingAd.data = data;
        break;
    }
  },
  /** 設定卡片
   * @param type 類型
   * @param data 改變資料
   */
  SETTING_CARD(state, type, data) {
    switch (type) {
      case 'show':
        state.settingCard.show = !state.settingCard.show;
        break;
      case 'add':
        state.settingCard.add = !state.settingCard.add;
        break;
      case 'data':
        state.settingAd.data = data;
        break;
    }
  },
  /** 設定Banner */
  SETTING_BANNER(state, type) {
    switch (type) {
      case 'show':
        state.settingBanner.show = !state.settingBanner.show;
        break;
      case 'add':
        state.settingBanner.add = !state.settingBanner.add;
        break;
    }
  },
  /** 設定優惠券 */
  SETTING_VOUCHER(state, type) {
    switch (type) {
      case 'show':
        state.settingBanner.show = !state.settingBanner.show;
        break;
      case 'add':
        state.settingBanner.add = !state.settingBanner.add;
        break;
    }
  },
  /** 設定商品 */
  SETTING_PRODUCT(state, type) {
    switch (type) {
      case 'show':
        state.settingProduct.show = !state.settingProduct.show;
        break;
      case 'add':
        state.settingProduct.add = !state.settingProduct.add;
        break;
    }
  },
  /** 設定商店 */
  SETTING_STORE(state, type) {
    switch (type) {
      case 'show':
        state.settingStore.show = !state.settingStore.show;
        break;
      case 'add':
        state.settingStore.add = !state.settingStore.add;
        break;
    }
  },
  /** 設定瀑布流 */
  SETTING_WATERFALL(state, type) {
    switch (type) {
      case 'show':
        state.settingWaterfall.show = !state.settingWaterfall.show;
        break;
      case 'add':
        state.settingWaterfall.add = !state.settingWaterfall.add;
        break;
    }
  }

}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}