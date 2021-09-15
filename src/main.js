import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/** Element Plus (1.1.0-beta.10是壞掉的，暫時不升級 ) */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhTw from 'element-plus/lib/locale/lang/zh-tw'

createApp(App).use(store).use(router).use(ElementPlus, { locale: zhTw }).mount('#app')
