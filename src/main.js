import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// axios
import axios from 'axios'
// import api from './common/api';
// import ajax from './common/ajax';
// axios 攔截器
//import './common/axios'
/** Element Plus (1.1.0-beta.10是壞掉的，暫時不升級 ) */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhTw from 'element-plus/lib/locale/lang/zh-tw'
// collapse 展開折叠
import { ElCollapseTransition } from 'element-plus'

// createApp(App).config.globalProperties.$axios = axios;
// createApp(App).config.globalProperties.$api = api;
// createApp(App).config.globalProperties.$ajax = ajax;
createApp(App).config.globalProperties.$http = axios;
createApp(App).use(store).use(router).use(ElementPlus, { locale: zhTw}, ElCollapseTransition.name, ElCollapseTransition).mount('#app');
