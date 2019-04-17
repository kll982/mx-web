import React from "react";
import {
    Table,
    Button,
    Modal,
    Input,
    Radio,
    Select,
    Icon,
    Form,
    Tag,
    Progress,
    message,
    Row,
    Col,
    Breadcrumb,
    Spin
} from "antd";

import $jsonp from "../../utils/service.js";
import api from "../../utils/api.js";
import styles from "./index.less";
import publicstyle from '../../img/public.less'
import stylez from '../../container/index.less';


const Option = Select.Option;
let self;
require("./aliyun-min-sdk.js");
require("./oss-js-upload.js");
export default class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            evisible: false,
            selcet: true,
            loading: true,
            id: "",
            formValue: null,
            status: 0,
            estatus: 0,
            bdata: [],
            imgUrl: "",
            h5url: "",
            eh5url: "",
            sort: 0,
            esort: 0,
            cpercent: 0,
            epercent: 0,
            cpercent2: 0,
            epercent2: 0,
            cbannerUrl: "",
            ebannerUrl: "",
            cbannerUrl2: "",
            ebannerUrl2: "",
            crandom: 0.5,
            erandom: 0.6
        }
    }

    componentWillMount() {
        self = this;
        self.getList();
    }

    componentDidMount() {


    }

    // 轮播图位置
    handleSelect = (e) => {
        this.setState({
            selcet: e.target.value
        })
    }
// input
    handleInputUrl = (e) => {
        this.setState({
            h5url: e.target.value
        })
    }
    ehandleInputUrl = (e) => {
        this.setState({
            eh5url: e.target.value
        })
    }
    // 序号
    sortChange = (e) => {
        this.setState({
            sort: e.target.value
        })
    }
    esortChange = (e) => {
        this.setState({
            esort: e.target.value
        })
    }
    // 新增banner的展示
    showModal = () => {
        this.setState({
            visible: true,
            crandom: Math.random()
        });
    }
// 新增banner的创建
    handleCreate = () => {
        let self = this;
        if (self.state.cbannerUrl) {
            $jsonp(self, api.bannerAdd, {
                type: 1,
                imgUrl: self.state.cbannerUrl,
                pcImgUrl: self.state.cbannerUrl2,
                linkType: 1,
                linkParam: self.state.h5url,
                sort: self.state.sort
            }).then((res) => {
                self.setState({
                    visible: false,
                    cpercent: 0,
                    cbannerUrl: ""
                })
                self.getList();
            })
        } else {
            Modal.warning(
                {
                    title: "提示",
                    content: "请选择一张图片",

                })
        }


    }
    //编辑
    edit = (record) => {
        this.setState({
            evisible: true,
            erandom: Math.random(),
            estatus: record.status,
            id: record.id,
            eh5url: record.h5url,
            esort: record.bannerOrder,
            imgUrl: record.bannerimg,
            pcImgUrl: record.pcImgUrl,
            ebannerUrl: record.bannerimg,
        })
    }
    eedit = () => {
        let self = this;
        $jsonp(self, api.bannerupdateUrl, {
            id: self.state.id,
            imgUrl: self.state.ebannerUrl,
            pcImgUrl: self.state.ebannerUrl2,
            linkType: 1,
            linkParam: self.state.eh5url,
            sort: self.state.esort,
            status: self.state.estatus
        }).then((res) => {
            self.setState({
                evisible: false,
                epercent: 0,
                ebannerUrl: "",
            })
            self.getList();
        })

    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    ehandleCancel = () => {
        this.setState({
            evisible: false,
        });
    }


    handleStatus = (value) => {
        this.setState({
            status: value
        })
    }
    ehandleStatus = (value) => {
        this.setState({
            estatus: value
        })
    }
    //下线
    unline = (record) => {
        let self = this;
        $jsonp(self, api.bannerunlineUrl, {
            id: record.key
        }).then((res) => {
            message.info("已经下线");
            self.getList();

        })


    }
    //上线
    upline = (record) => {
        let self = this;
        $jsonp(self, api.banneruplineUrl, {
            id: record.key
        }).then((res) => {
            message.success("已经上线");
            self.getList();
        })


    }

    //删除
    deleteItem = (record) => {
        let self = this;
        Modal.warning({
            title: "提示",
            content: "确定定要删除此项吗？",
            okText: "确定",
            maskClosable: true,
            onOk: function () {
                $jsonp(self, api.bannerdeleteUrl, {
                    id: record.id
                }).then((res) => {
                    self.getList();
                })

            }
        })

    }
    //获取列表数据的公共方法
    getList = () => {
        let self = this;
        self.setState({
            loading: true
        })
        $jsonp(self, api.bannerList, {
            type: 1,
            pageNo: 0,
            pageSize: 10
        }).then((res) => {
            var list = res.data.response.list;
            let bdata = [];
            for (let i = 0; i < list.length; i++) {
                var obj = {};
                obj.order = i + 1;
                obj.pcImgUrl = list[i].pcImgUrl;
                obj.key = list[i].id;
                obj.id = list[i].id;
                obj.bannerOrder = list[i].sort;
                obj.status = list[i].status;
                if (list[i].status == 1) {
                    obj.bannerStatus = "正常";
                } else {
                    obj.bannerStatus = "下线";
                }
                obj.bannerimg = list[i].imgUrl;
                obj.h5url = list[i].linkParam;
                bdata.push(obj)
            }
            self.setState({
                bdata: bdata
            })
        })

    }

    euploadfile = (e) => {
        let self = this;
        var file = e.target.files;
        var time = new Date();
        var times = time.getTime();

        self.setState({
            epercent: 0,
        })
        $jsonp(self, api.getOssTicketSign, {}).then((res) => {
            var dir = res.data.dir;
            var host = res.data.host;
            var id = res.data.id;
            var bucket = host.split("//")[1].split(".")[0];
            var endpoint = host.split("//")[0] + "//" + host.split(".")[1] + "." + host.split(".")[2] + "." + host.split(".")[3];
            var stsToken = {
                "RequestId": res.data.response.requestId,
                "AssumedRoleUser": {
                    "AssumedRoleId": res.data.response.assumedRoleUser.assumedRoleId,
                    "Arn": res.data.response.assumedRoleUser.arn
                },
                "Credentials": {
                    "AccessKeySecret": res.data.response.credentials.accessKeySecret,
                    "AccessKeyId": res.data.response.credentials.accessKeyId,
                    "Expiration": res.data.response.credentials.expiration,
                    "SecurityToken": res.data.response.credentials.securityToken
                }
            };
            var ossUpload = new OssUpload({
                bucket: bucket,
                endpoint: endpoint,
                chunkSize: 104857600,
                concurrency: 4,
                stsToken: stsToken,
            });
            ossUpload.upload({
                file: file[0],
                key: dir + "/" + id + times + ".png",
                maxRetry: 3,
                headers: {
                    'CacheControl': 'public',
                    'Expires': '',
                    'ContentEncoding': '',
                    'ContentDisposition': '',
                    'ServerSideEncryption': ''
                },
                onprogress: function (evt) {
                    let percent = self.state.epercent + 10;
                    if (percent > 100) {
                        percent = 100;
                    }
                    self.setState({
                        epercent: percent
                    })
                },
                onerror: function (evt) {
                    message.warning('上传失败');
                },
                oncomplete: function (res) {
                    message.success('上传成功');
                    self.setState({
                        epercent: 100,
                        ebannerUrl: host + "/" + dir + "/" + id + times + ".png"
                    })
                }
            });
        })
    }

    cuploadfile = (e) => {
        let self = this;
        var file = e.target.files;
        // var value=e.target.value;
        var time = new Date();
        var times = time.getTime();
        self.setState({
            cpercent: 0,
            // cbannerUrl:e.target.value
        })
        $jsonp(self, api.getOssTicketSign, {}).then((res) => {
            var dir = res.data.dir;
            var host = res.data.host;
            var id = res.data.id;
            var bucket = host.split("//")[1].split(".")[0];
            var endpoint = host.split("//")[0] + "//" + host.split(".")[1] + "." + host.split(".")[2] + "." + host.split(".")[3];
            var stsToken = {
                "RequestId": res.data.response.requestId,
                "AssumedRoleUser": {
                    "AssumedRoleId": res.data.response.assumedRoleUser.assumedRoleId,
                    "Arn": res.data.response.assumedRoleUser.arn
                },
                "Credentials": {
                    "AccessKeySecret": res.data.response.credentials.accessKeySecret,
                    "AccessKeyId": res.data.response.credentials.accessKeyId,
                    "Expiration": res.data.response.credentials.expiration,
                    "SecurityToken": res.data.response.credentials.securityToken
                }
            };
            var ossUpload = new OssUpload({
                bucket: bucket,
                endpoint: endpoint,
                chunkSize: 104857600,
                concurrency: 4,
                stsToken: stsToken,
            });

            ossUpload.upload({
                file: file[0],
                key: dir + "/" + id + times + ".png",
                maxRetry: 3,
                headers: {
                    'CacheControl': 'public',
                    'Expires': '',
                    'ContentEncoding': '',
                    'ContentDisposition': '',
                    'ServerSideEncryption': ''
                },
                onprogress: function (evt) {
                    let percent = self.state.cpercent + 10;
                    if (percent > 100) {
                        percent = 100;
                    }
                    self.setState({
                        cpercent: percent
                    })
                },
                onerror: function (evt) {
                    message.warning('上传失败');
                },
                oncomplete: function (res) {
                    message.success('上传成功');
                    self.setState({
                        cpercent: 100,
                        cbannerUrl: host + "/" + dir + "/" + id + times + ".png"
                    })
                }
            });

        })

    }


    render() {
        const columns = [
            {
                dataIndex: 'order',
                key: "order",
                title: '序号',
                width: '100px',
                className: publicstyle.center,
            },
            {
                dataIndex: 'bannerimg',
                className: publicstyle.center,
                key: "bannerimg",
                title: 'app图片',
                render: text => <img src={text} style={{width: 120 + "px"}} alt="this is pic"/>,
            },
            {
                dataIndex: 'bannerStatus',
                className: publicstyle.center,
                key: "bannerStatus",
                title: '状态',
                render: (text, record, index) => {
                    if (record.bannerStatus === "正常") {
                        return <Tag color="blue">{record.bannerStatus}</Tag>
                    } else {
                        return <Tag color="red">{record.bannerStatus}</Tag>
                    }
                }
            },
            {
                dataIndex: 'bannerOrder',
                className: publicstyle.center,
                key: "bannerOrder",
                title: '轮播顺序',

            }, {
                title: '操作',
                className: publicstyle.center,
                key: 'Action',
                render: (text, record, index) => {
                    if (record.bannerStatus === "正常") {
                        return (
                            <span>
          <Button type="primary" style={{marginRight: 10, marginBottom: 5}}
                  onClick={this.edit.bind(this, record)}>编辑</Button>
          <Button type="danger" style={{marginRight: 10, marginBottom: 5}}
                  onClick={this.unline.bind(this, record)}>下线</Button>
          <Button type="default" style={{marginBottom: 5}} onClick={this.deleteItem.bind(this, record)}>删除</Button>
          </span>
                        )
                    } else {
                        return (
                            <span>
          <Button type="primary" style={{marginRight: 10, marginBottom: 5}}
                  onClick={this.edit.bind(this, record)}>编辑</Button>
          <Button type="primary" style={{marginRight: 10, marginBottom: 5}}
                  onClick={this.upline.bind(this, record)}>上线</Button>
          <Button type="default" style={{marginBottom: 5}} onClick={this.deleteItem.bind(this, record)}>删除</Button>
          </span>
                        )
                    }
                }

            }];
        return (
            <div className={stylez.wrapPadding}>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                    <Breadcrumb.Item>轮播图管理</Breadcrumb.Item>
                </Breadcrumb>
                <div className={styles.clearfloat}></div>
                <Button type="primary" style={{marginBottom: 20}} onClick={this.showModal}><Icon type="plus"></Icon>新增Banner</Button>
                <Table
                    pagination={false}
                    bordered
                    columns={columns}
                    dataSource={this.state.bdata}
                />

                <Modal key={this.state.crandom} title="新增Banner" visible={this.state.visible}
                       onOk={this.handleCreate} onCancel={this.handleCancel}
                >
                    <Row>
                        <Col span={16} offset={4}>
                            <div style={{marginBottom: 20}}>
                                <div className={styles.imgbox}><span
                                    style={{paddingRight: 10, paddingBottom: 20}}>app图片:</span>
                                    <img src={this.state.cbannerUrl}/>
                                    <span className={styles.files}>
            <Input type="file" className={styles.inputfiles} onChange={this.cuploadfile}/>
        </span>
                                </div>

                                <Progress percent={this.state.cpercent}/>
                            </div>
                        </Col>
                    </Row>


                    <Row style={{marginBottom: 20}}>
                        <Col span={16} offset={4}>
    <span>
    <span>序号:</span><Input type="number" defaultValue={this.state.sort} style={{width: "50%", marginLeft: 10}}
                           onChange={this.sortChange} placeholder=""/>
    </span>
                        </Col>
                    </Row>
                    <Row style={{marginBottom: 20}}>
                        <Col span={16} offset={4}>
    <span>
    <span>跳转方式:</span>
    <Radio
        checked
        style={{marginLeft: 10}}
        onChange={this.handleSelect}
    >H5页面
    </Radio>
    <Input type="text" style={{width: "50%", marginLeft: 10}} onChange={this.handleInputUrl}/>
    </span>
                        </Col>
                    </Row>


                    <Row>
                        <Col span={16} offset={4} style={{display: "none"}}>
                            <div>
                                <span style={{paddingRight: 10}}>状态:</span>
                                <Select
                                    defaultValue=""
                                    style={{width: '32%'}}
                                    onSelect={this.handleStatus}
                                >
                                    <Option value="0">下线</Option>
                                    <Option value="1">正常</Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </Modal>


                <Modal key={this.state.erandom} title="编辑Banner" visible={this.state.evisible}
                       onOk={this.eedit} onCancel={this.ehandleCancel}
                >
                    <Row>
                        <Col span={16} offset={4}>
                            <div style={{marginBottom: 20}}>
                                <div className={styles.imgbox}>
                                    <span style={{paddingRight: 10, paddingBottom: 20}}>app图片:</span>
                                    <img src={this.state.ebannerUrl}/>
                                    <span className={styles.files}>
            <Input type="file" className={styles.inputfiles} onChange={this.euploadfile}/>
        </span>
                                </div>

                                <Progress percent={this.state.epercent}/>
                            </div>
                        </Col>
                    </Row>


                    <Row style={{marginBottom: 20}}>
                        <Col span={16} offset={4}>
    <span>
    <span>序号:</span><Input type="number" defaultValue={this.state.esort} style={{width: "50%", marginLeft: 10}}
                           onChange={this.esortChange} placeholder=""/>
    </span>
                        </Col>
                    </Row>
                    <Row style={{marginBottom: 20}}>
                        <Col span={16} offset={4}>
    <span>
    <span>跳转方式:</span>
    <Radio
        checked
        style={{marginLeft: 10}}
        onChange={this.ehandleSelect}
    >H5页面
    </Radio>
    <Input type="text" value={this.state.eh5url} style={{width: "50%", marginLeft: 10}}
           onChange={this.ehandleInputUrl}/>
    </span>
                        </Col>
                    </Row>


                    <Row>
                        <Col span={16} offset={4}>
                            <div>
                                <span style={{paddingRight: 10}}>状态:</span>
                                <Select
                                    defaultValue={`${this.state.estatus}`}

                                    style={{width: '32%'}}
                                    onSelect={this.ehandleStatus}
                                >
                                    <Option value="0">下线</Option>
                                    <Option value="1">正常</Option>

                                </Select>
                            </div>
                        </Col>
                    </Row>


                </Modal>

            </div>
        );
    }
}


