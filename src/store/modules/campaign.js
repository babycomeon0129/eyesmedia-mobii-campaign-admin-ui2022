import { reactive } from 'vue';

const state = reactive({
  /** API 版本 */
  apiVersion: 1,
  /** 活動ID */
  eventID: '',
  /** 活動的區塊ID */
  blockID: '',
  /** 活動的區塊標題 */
  blockName: '',
  /** 區塊服務類型 */
  blockType: '',
  /** 區塊列表資料的分頁資訊*/
  blockListPaginationInfo: {
    totalNumber: 0
  },
  /** 設定dialog */
  campaignDialog: {
    show: false,  // 顯示設定dialog
    add: false,   // 顯示新增dialog 
    edit: false   // 顯示編輯dialog
  },
  /** 區塊資料的新增 request */
  blockAddRequest: null,
  /** 區塊列表資料 */
  blockListData: {
    ICON: [],
    AD: [],
    CARD: [],
    BANNER: [],
    VOUCHER: [],
    PRODUCT: [],
    STORE: [],
    WATERFALL: []
  }
})

// getters 
const getters = {
  /** 區塊服務名稱
   * @returns {String} 區塊服務名稱中文
   */
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
  },
  /** 區塊清單資料respone類型選擇 */
  resType: state => {
    switch(state.blockType) {
      case 'BANNER':
      case 'AD':
      case 'ICON':
        return 'items';
      default:
        return 'tabs';
    }
  },
  getBlockName: state => {
    return state.blockName;
  }
}

// actions 
const actions = {
  // ...
}

// mutations 
const mutations = {
  
  /** 設定活動ID
   * @param {String} id 活動id(event ID)
   */
  SETTING_EVENTID(state, id) {
    state.eventID = id;
  },
  /** 設定活動的區塊ID
   * @param {String} id 區塊ID(Block id)
   */
  SETTING_BLOCK_ID(state, id) {
    state.blockID = id;
  },
  /** 設定活動的區塊標題
   * @param {String} name 區塊標題(Block name)
   */
  SETTING_BLOCK_NAME(state, name) {
    state.blockName = name;
  },
  /** 設定區塊類型 */
  SETTING_BLOCKTYPE(state, type) {
    state.blockType = type;
  },
  /** 設定區塊列表資料總比數 
   * @param {OBJECT} pgn 分頁資訊
  */
  SETTING_BLOCK_LIST_PGN(state, pgn) {
    state.blockListPaginationInfo = pgn;
  },
  /** 控制活動dialog
   * @param {String} ctrl 控制功能視窗開啟/關閉 show:設定 add:新增 edit:編輯
   */
  SETTING_DIALOG(state, ctrl ) {
    state.campaignDialog[ctrl] = !state.campaignDialog[ctrl];
  },
  /** 設定區塊列表資料
   * @param {Object} payload 綁定資料
   * @param {String} payload.type 區塊類型
   * @param {Array } payload.data 回傳資料
   */
  SETTING_BLOCK_LIST_DATA(state, {type, data}) {
    state.blockListData[type] = data;
  },
  /** 設定區塊資料的新增request */
  SETTING_ADD_REQUEST (state, request) {
    state.blockAddRequest = request;
  },
  /** 刪除區塊列表資料
   * @param {Object} payload 想刪的資料資料
   * @param {String} payload.type 區塊類型
   * @param {Array } payload.index 位置？（就index我不知道該怎麼解釋）
   */
  DEL_BLOCK_LIST_DATA (state, {type, index}) {
    state.blockListData[type].splice(index, 1);
  }
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}