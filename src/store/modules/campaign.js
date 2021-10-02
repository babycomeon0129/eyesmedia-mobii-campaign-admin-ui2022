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
    edit: false,
    type: ''
  },
  /** 設定icon */
  settingIcon: {
    data: []
  },
  /** 設定廣告 */
  settingAd: {
    data: []
  },
  /** 設定卡片 */
  settingCard: {
    data: []
  },
  /** 設定Banner */
  settingBanner: {
    data: []
  },
  /** 設定優惠券 */
  settingVoucher: {
    data: []
  },
  /** 設定商品 */
  settingProduct: {
    data: []
  },
  /** 設定商店 */
  settingStore: {
    data: []
  },
  /** 設定瀑布流 */
  settingWaterfall: {
    data: []
  }
})

// getters 
const getters = {
  /** 區塊服務名稱 */
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
      case 'PRODUCT':
        return '商品';
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
  /** 控制活動dialog
   * @ctrl 控制功能視窗開啟/關閉 show:設定 add:新增 edit:編輯
   */
  SETTING_DIALOG(state, ctrl ) {
    switch(ctrl) {
      case 'show':
        state.campaignDialog.show = !state.campaignDialog.show;
        break;
      case 'add':
        state.campaignDialog.add = !state.campaignDialog.add;
        break;
      case 'edit':
        state.campaignDialog.edit = !state.campaignDialog.edit;
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