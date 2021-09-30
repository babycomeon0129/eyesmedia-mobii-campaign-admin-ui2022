import { reactive } from 'vue';

const state = reactive({
  /** API 版本 */
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
  /** 設定卡片 */
  SETTING_CARD(state, type) {
    switch (type) {
      case 'show':
        state.settingCard.show = !state.settingCard.show;
        break;
      case 'add':
        state.settingCard.add = !state.settingCard.add;
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
  SETTING_WATERFALLS(state, type) {
    switch (type) {
      case 'show':
        state.settingWaterfalls.show = !state.settingWaterfalls.show;
        break;
      case 'add':
        state.settingWaterfalls.add = !state.settingWaterfalls.add;
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