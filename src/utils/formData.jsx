import {hashHistory} from 'react-router';
import $ from 'jquery';
import {message, Modal} from 'antd';
import Promise from 'es6-promise';

Promise.polyfill();

var loginTipAlert = 0;
const $FormData = function (self, url, data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            xhrFields: {
                withCredentials: true,
            },
            success: (res) => {
                var res = JSON.parse(res)
                if (res.code == 200) {
                    if (data.index) {
                        res.index = data.index
                    } else {
                        res.index = 0
                    }
                    loginTipAlert = 0;
                    resolve(res);
                }
                else if (res.code == 500) {
                    self.setState({
                        loading: false,
                        passLoading: false,
                        subLoading: false,
                        saveLoading: false,
                        invalidLoading: false,
                    })

                    message.warning(res.message);
                    reject(res.message);
                    loginTipAlert = 0;
                    return false
                } else if (res.code == 600) {

                    self.setState({
                        loading: false,
                        passLoading: false,
                        subLoading: false,
                        saveLoading: false,
                        invalidLoading: false,
                    })
                    loginTipAlert += 1;
                    if (loginTipAlert == 1) {
                        Modal.info({
                            title: "提示",
                            content: res.message,
                            okText: "去登陆",
                            onOk: function () {
                                localStorage.clear();
                                sessionStorage.clear();
                                hashHistory.push("/");
                            }
                        })
                    }

                    reject(res.message);

                } else if (res.code == 700) {
                    self.setState({
                        loading: false,
                        passLoading: false,
                        subLoading: false,
                        saveLoading: false,
                        invalidLoading: false,
                    })
                    loginTipAlert = 0;
                    message.warning(res.message);
                    reject('权限不足');
                } else {
                    self.setState({

                        passLoading: false,
                        subLoading: false,
                        saveLoading: false,
                        invalidLoading: false,
                    })
                    loginTipAlert = 0;
                    message.error("服务器无响应");
                    reject('服务器无响应');
                }

            },
            error: (res, one) => {
                loginTipAlert = 0;

                self.setState({
                    loading: false,
                    passLoading: false,
                    subLoading: false,
                    saveLoading: false,
                    invalidLoading: false,
                })
            }

        });
    })
};

export default $FormData;
