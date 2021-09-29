import { readonly, reactive } from 'vue'

const state = reactive({
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
})

// getters 
const getters = {
  //...
}

// actions 
const actions = {
  // ...
}

// mutations 
const mutations = {
  /** 設定icon */
  SETTING_ICON(state, type) {
    switch (type) {
      case 'show':
        state.settingIcon.show = !state.settingIcon.show;
        break;
      case 'add':
        state.settingIcon.add = !state.settingIcon.add;
        break;
    }
  },
  /** 設定廣告 */
  SETTING_AD(state, type) {
    switch (type) {
      case 'show':
        state.settingAd.show = !state.settingAd.show;
        break;
      case 'add':
        state.settingAd.add = !state.settingAd.add;
        break;
    }
  },
  /** s */

}


export default {
  namespaced: true,
  state: readonly(state),
  getters,
  actions,
  mutations
}