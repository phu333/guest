import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

import { Descriptions, InputNumber, Space, Button, DatePicker, Input, Card, Form, Select, Table, Comment, List, Avatar, Pagination } from 'antd';
import 'antd/dist/antd.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'

import 'react-quill/dist/quill.snow.css';

import JoditEditor from "jodit-react";
const dateFormat = 'YYYY-MM-DD';
const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;
const { TextArea } = Input;
const { Option } = Select;
const Cryptr = require('cryptr')
const cryptr = new Cryptr('myTotalySecretKey');
class ContractForGuest extends React.Component {
    constructor() {
        super();
        this.modules = {
            toolbar: [

            ]
        };

        this.formats = [
            'font',
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'color', 'background'
        ];
        this.state = {


            openExtension: false,
            openCommentSection: false,
            finish: false,
            showContent: "customer",
            comments: [],
            submitting: false,
            value: '',
            currentPage: 1,
            creator: "",
            isEdit: false,
            company: {},
            ASide: {
               
            },
            customers: {},
            validSignature: false,
            contract: {},
        };

       
    }
    
    componentDidMount() {
        const decrypt = cryptr.decrypt(this.props.match.params.id)
        console.log(decrypt)
        axios({
            url: '/api/v1/Contract/' + decrypt,
            method: "GET",

        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                console.log(data.data)
                this.setState({
                    contract: data.data
                })
                axios({
                    url: '/api/v1/Customer/' + data.data.customerId,
                    method: "GET",

                })
                    .then((response) => {

                        return response.data;
                    })
                    .then((data) => {
                        console.log(data.data)
                        this.setState({
                            customers: data.data
                        })


                    })
                    .catch(error => {
                        console.log(error)


                    });

            })
            .catch(error => {
                console.log(error)


            });


        axios({
            url: '/api/v1/Contract/a-side-info',
            method: "GET",

            params: {
                id: decrypt,
            }
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                console.log(data)
               
                axios({
                    url: '/api/v1/Company/info/guest?id='+data.companyId,
                    method: "PUT",
        
                   
                })
                    .then((response) => {
        
                        return response.data;
                    })
                    .then((data) => {
                        console.log(data)
                        this.setState({
                            ASide: data.data
                        })
        
        
        
        
                    })
                    .catch(error => {
                        console.log(error)
        
        
                    });


            })
            .catch(error => {
                console.log(error)


            });


    }

    
    onFinish = () => {
        const decrypt = cryptr.decrypt(this.props.match.params.id)
        console.log(this.state.customers.taxCode)
        if (this.state.company.id !== undefined) {
            axios({
                url: "https://localhost:44338/api/Signature/PostContract",
                method: "POST",
                data: {
                    Info: this.state.company.taxCode,

                }
            })
                .then((response) => {


                })
                .then((data) => {

                })
                .catch(error => {
                    console.log(error)


                });
            if (this.state.contract.fileUrl === null) {
                axios({
                    url: '/api/v1/Contract/export-docx/' + this.state.contract.id,
                    method: "GET",
                    headers: {
                        
                        'Content-Type': 'application/json',
                        'Accept': 'application/docx'
                    },
                    responseType: 'arraybuffer',

                })
                    .then((response) => {
                        console.log(response)
                        var fileDownload = require('js-file-download');
                        fileDownload(response.data, decrypt + '.docx');
                        return response.data;
                    })
                    .then((data) => {
                        console.log(data.data)

                    })
                    .catch(error => {
                        console.log(error)


                    });
            } else {
                window.open(this.props.contract.fileUrl, "_blank")
               
            }
        } else {
            axios({
                url: "https://localhost:44338/api/Signature/PostContract",
                method: "POST",
                data: {
                    Info: this.state.customers.taxCode,

                }
            })
                .then((response) => {


                })
                .then((data) => {

                })
                .catch(error => {
                    console.log(error)


                });
            if (this.state.contract.fileUrl === null) {
                axios({
                    url: '/api/v1/Contract/export-docx/' + this.state.contract.id,
                    method: "GET",
                    headers: {
                        
                        'Content-Type': 'application/json',
                        'Accept': 'application/docx'
                    },
                    responseType: 'arraybuffer',

                })
                    .then((response) => {
                        console.log(response)
                        var fileDownload = require('js-file-download');
                        fileDownload(response.data, decrypt + '.docx');
                        return response.data;
                    })
                    .then((data) => {
                        console.log(data.data)

                    })
                    .catch(error => {
                        console.log(error)


                    });
            } else {
                window.open(this.state.contract.fileUrl, "_blank")
                
            }
        }




    };


    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    render() {


        console.log(this.state.customers)


        const config = {
            readonly: true, // all options from https://xdsoft.net/jodit/doc/
            toolbar: false
        }




        return (

            <div style={{ height: "100vh", fontSize: 14,width:"80%",margin:"auto", padding:"10px" }}>
            

                <Space direction="vertical" align="center" >

                    <Space direction="vertical" align="center" >
                        <Card bordered={false} >
                            <h6 style={{ textAlign: 'center', fontSize: 14 }}>Cộng hòa xã hội chủ nghĩa Việt Nam</h6>
                            <h6 style={{ textAlign: 'center', fontSize: 14 }}>Độc lập-tự do-hạnh phúc</h6>
                            <br />
                            <h2 style={{ textAlign: 'center', fontSize: 16, fontWeight: "bold" }}>{this.state.contract.contractName}</h2>
                            <h6 style={{ textAlign: 'center', fontSize: 14 }}>Số {this.state.contract.contractNum}</h6>
                            <h6 style={{ fontSize: 14 }}>Hôm nay, (Ngày hợp đồng có hiệu lực),
                                    tại {this.state.contract.contractPlace}, chúng tôi gồm
                            </h6>
                        </Card>

                        <Card>

                            <Descriptions size="small" column={2} title={"Thông tin bên A"}  >
                                <Descriptions.Item label={(<><b>{"Công ty/Tổ chức"}</b></>)}>{this.state.ASide.name}
                                </Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Địa chỉ"}</b></>)}>{this.state.ASide.address}</Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Điện thoại"}</b></>)}>{this.state.ASide.phoneNumber}</Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Địa chỉ Email"}</b></>)}>{this.state.ASide.email}</Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Giấy phép kinh doanh"}</b></>)}>{this.state.ASide.businessLicense}</Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Mã số thuế"}</b></>)}>{this.state.ASide.taxCode}</Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Tài khoản số"}</b></>)}>{this.state.ASide.bankAccount}</Descriptions.Item>
                               
                                <Descriptions.Item label={(<><b>{"Do ông(bà)"}</b></>)} span={2}>{this.state.ASide.name}</Descriptions.Item>

                                <Descriptions.Item label={(<><b>{"Chức vụ"}</b></>)} span={2}>
                                    Giám đốc làm đại diện
                    </Descriptions.Item>


                            </Descriptions>
                            <Descriptions title="" size="small" column={2} title="Thông tin bên B"

                            >

                                <Descriptions.Item label={(<><b>{"Công ty/Tổ chức"}</b></>)}>
                                    {this.state.customers.name}
                                </Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Địa chỉ"}</b></>)}>{this.state.customers.address}</Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Điện thoại"}</b></>)}>{this.state.customers.phoneNumber}</Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Địa chỉ Email"}</b></>)}>{this.state.customers.email}</Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Giấy phép kinh doanh"}</b></>)}>{this.state.customers.businessLicense}</Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Mã số thuế"}</b></>)}>{this.state.customers.taxCode}</Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Tài khoản số"}</b></>)}>{this.state.customers.bankAccount}</Descriptions.Item>
                               
                                <Descriptions.Item label={(<><b>{"Do ông(bà):"}</b></>)} span={2}>{this.state.customers.name}</Descriptions.Item>

                                <Descriptions.Item label={(<><b>{"Chức vụ"}</b></>)} span={2}>
                                    làm đại diện
            </Descriptions.Item>


                            </Descriptions>


                        </Card>


                    </Space>
                    
                        
                        <JoditEditor

                            value={this.state.contract.contractContent}
                            config={config}
                            tabIndex={1} // tabIndex of textarea


                        />
                    
                   
                        <Card>

                            <Form

                                name="basic"
                                className="lcontract-form"

                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}

                            >
                                Giá trị hợp đồng:{this.state.contract.contractValue}
                                <h6 style={{ fontSize: 14 }}>Hợp đồng có hiệu lực kể từ ngày 3 tháng 11 năm 2020 đến
                                             {this.state.contract.contractExpiredDate}
                                </h6>
                                <Space size="large">


                                    <Button type="primary" value="Sign" onClick={this.onFinish}>{/*Nút này xuất hiện khi chưa ai kí hợp đồng nhưng chỉ có director mới thấy*/}
                                                        Tải về
                                                    </Button>



                                    <Button type="primary" value="reject">{/*nút này xuất hiện khi 2 bên đã kí hợp đồng này*/}
                                                            Reject
                                                        </Button>
                                </Space>
                            </Form>

                        </Card>
                    </Space>
                
            </div>

        );
    }
}







export default ContractForGuest