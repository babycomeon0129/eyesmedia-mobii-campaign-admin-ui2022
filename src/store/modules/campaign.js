import { createStore } from 'vuex'

export default createStore({
  state: {
    apiVersion: 1,
    /** 設定icon */
    settingIcon: {
      show: false,
      add: false
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
    settingWaterfalls: {
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
