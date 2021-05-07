import axios from 'axios'

/*进行全局配置*/
axios.defaults.baseURL = 'http://127.0.0.1:3000/';
axios.defaults.timeout = 15000;
/*封装自己的get/post方法*/
export default {
    get: function (path = '', data = {}) {
        return new Promise((resolve, reject) => {
            axios.get(path, {
                params: data  //传递参数
            }).then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                reject(error);
            })
        })
    },
    post: function (path = '', data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(path, data).then(function (response)
            {
                resolve(response.data);
            }).catch(function (error) {
                reject(error);
            })
        })
    }
}