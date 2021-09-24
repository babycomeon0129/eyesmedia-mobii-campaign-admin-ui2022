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
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
