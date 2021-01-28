import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import 'antd/dist/antd.css';
import { PageHeader, Tag, Row, Col, Table ,message} from 'antd';
import { Input } from 'antd';
import {
    FolderViewOutlined, DeleteOutlined, FormOutlined, FileAddOutlined, UploadOutlined, ContainerOutlined,
    FileProtectOutlined, UserSwitchOutlined, UserAddOutlined, LogoutOutlined, MonitorOutlined
} from "@ant-design/icons"
const { Search } = Input;
const { Column } = Table;
const layout = {
    labelCol: {
        span: 6,

    },
    wrapperCol: {
        span: 14,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};
const middleLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};
class SearchContractByCode extends React.Component {
    constructor() {
        super();

        this.state = {
            searchValue: []
        };

        
    }
    render() {
        const onSearch = value => {
            axios({
                url: '/api/v1/Contract/get-by-taxcode',
                method: "GET",
                params: {
                    taxCode: value,
    
                }
            })
                .then((response) => {
    
                    return response.data;
                })
                .then((data) => {
                    console.log(data.data)
                    this.setState({
                        searchValue: data.data,
                    })
    
    
                })
                .catch(error => {
                    console.log(error)
                    if (error.response.status === 500) {
                        message.error(error.response.status + ' Server under maintainence');
                    } else if (error.response.status === 404) {
                        message.error(error.response.status + ' Server not found');
                    }
    
                });
        };
        return (
            <Row type="flex" justify="center" align="top" >




                <Col span={10} > <Search placeholder="vui lòng nhập mã hợp đồng" onSearch={onSearch} enterButton />

                <Table dataSource={this.state.searchValue}
                
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}>
                        <Column title="Mã hợp đồng" dataIndex="contractNum" key="contractNum"
                            render={(text, record) => (
                                <a><FileProtectOutlined /> {text}</a>
                            )}
                        />
                        <Column title="Tên hợp đồng" dataIndex="contractTitle" key="contractTitle"
                            render={(text, record) => (

                                <a><ContainerOutlined />{text}</a>

                            )}
                        />

                        <Column title="Bên B" dataIndex="customer" key="customer"
                            render={(text, record) => (

                                <b>{text.companyName}</b>

                            )} />
                        <Column title="Ngày hết hạn" dataIndex="contractExpiredDate" key="contractExpiredDate"
                            sorter={(a, b) => a.deadline.localeCompare(b.deadline)}
                            sortDirections={['descend', 'ascend']}
                            render={(text, record) => (

                                <b>{text}</b>

                            )} />
                        {/* <Column title="bên tạo hợp đồng" dataIndex="ben_tao_hd" key="ben_tao_hd"
                            render={(text, record) => (

                                <b>{text}</b>

                            )} /> */}
                        <Column title="giá trị hợp đồng" dataIndex="contractValue" key="contractValue"
                            render={(text, record) => (

                                <b>{text}</b>

                            )} />
                        <Column title="Trạng thái" dataIndex="statusAsString" key="statusAsString"
                            sorter={(a, b) => a.status.localeCompare(b.status)}
                            sortDirections={['descend', 'ascend']}
                            render={(text, record) => {
                                let color = 'pink'
                                if (text === 'Deactive') {
                                    color = 'red'
                                } else if (text === 'Active') {
                                    color = 'green'
                                } else if (text === 'Draft') {
                                    color = 'blue'
                                } else if (text === 'waiting for customer') {
                                    color = 'pink'
                                } else if (text === 'rejected') {
                                    color = 'grey'
                                }
                                return (<Tag color={color} key={text}>
                                    {text.toUpperCase()}
                                </Tag>);
                            }}
                        />
                        <Column
                            title="Chi tiết"
                            key="action"
                            render={(text, record) => (

                                <FolderViewOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={
                                    () => this.setState({
                                        contract: text,
                                        showContract: true
                                    })
                                } />

                            )}
                        />
                       
                      

                    </Table>

                </Col></Row>
        );
    }
}
export default SearchContractByCode;