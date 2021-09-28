import axios from 'axios';

// 請求攔截
axios.interceptors.request.use(config => {
    // 1. 這個位置就請求前最後後配至
    // 2. 也可以在這裡加入後端需要的用戶授權訊息
  return config
}, error => {
    return Promise.reject(error)
})

// 回應攔截
axios.interceptors.response.use(response => {
  // 請求成功
  // 1. 根據專案需求訂製自己的攔截
  // 2. 然後返回數據
  return response;
}, error => {
    // 請求失敗
      if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    // 對400錯誤的處理
                    console.log(error.response);
                break;
                case 401:
                    // 對401錯誤的處理
                    console.log(error.response);
                break;
                default:
                // 如果以上都不是的處理
                return Promise.reject(error);
          }
    }

})