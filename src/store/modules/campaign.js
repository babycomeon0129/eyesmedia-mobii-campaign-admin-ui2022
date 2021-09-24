import { createStore } from 'vuex'

export default createStore({
  state: {
    /** 是否顯示設定icon */
    settingIcon: {
      show: false,
      add: false
    },
    /** 是否顯示設定廣告 */
    settingAd: {
      show: false,
      add: false
    },
    /** 是否顯示設定卡片 */
    settingCard: {
      show: false,
      add: false
    },
    /** 是否顯示設定Banner */
    settingBanner: {
      show: false,
      add: false
    },
    /** 是否顯示設定優惠券 */
    settingVoucher: {
      show: false,
      add: false
    },
    /** 是否顯示設定商品 */
    settingProduct: {
      show: false,
      add: false
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
