import axios from 'axios';
import { useStore } from 'vuex';
// element UI
import { ElMessage } from 'element-plus';

const store = useStore();

export default {
    /**
     * call api
     *
     * @param method axios 類型
     * @param path API 路徑
     * @param parm body data
     * @param isShow 是否顯示錯誤訊息
     * @returns {String}
     */
    ajaxCall(method, path, parm = null, isShow = true) {
        return axios[method](`${process.env.VUE_APP_campaignAPI}${store.state.campaign.apiVersion}/${path}`, parm).then((result) => {
            if (result.data.errorCode !== '996600001' && result.data.errorCode !== '156600001') {
                if (isShow) {
                    ElMessage.error(`errorCode:${result.data.errorCode}，${result.data.errorCode}`);
                }
            }
            return result.data;
        }).catch((error) => {
            console.log(error);
        });
    },

    /**
     * put请求
     * @param url 接口路由
     * @param data 接口参数
     * @param auth 是否需要帶登入訊息
     * @returns {AxiosPromise<any>}
     */
    put(url, data, auth = false) {
        if (auth) {
            return axios.put(url, data, { headers: { Authorization: 'Your back-end user authenticates information' } });
        } else {
            return axios.put(url, data);
        }
    },

    /**
     * 删除
     * @param url 接口路由
     * @param auth 是否需要帶登入訊息
     * @returns {AxiosPromise}
     */
    del(url, auth = false) {
        if (auth) {
            return axios.delete(url, { headers: { Authorization: 'Your back-end user authenticates information' } });
        } else {
            return axios.delete(url);
        }
    },

    /**
     * 上传文件
     * @param url 接口路由
     * @param file 接口文件
     * @param auth 是否需要帶登入訊息
     */
    uploader(url, file, auth = false) {
        let param = new FormData();
        param.append('file', file)
        if (auth) {
            return axios.post(url, param, { headers: { Authorization: 'Your back-end user authenticates information' } })
        } else {
            return axios.post(url, param)
        }
    },
}