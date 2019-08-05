import React, { Component } from 'react';
import { Table, Divider, Tag, Button, Modal } from 'antd';

import axios from 'axios';

// const data = [
//     {
//       key: '1',
//       title: 'John Brown',
//       age: 32,
//       address: 'New York No. 1 Lake Park',
//       price: ['nice', 'developer'],
//     },
//     {
//       key: '2',
//       name: 'Jim Green',
//       age: 42,
//       address: 'London No. 1 Lake Park',
//       price: ['loser'],
//     },
//     {
//       key: '3',
//       name: 'Joe Black',
//       age: 32,
//       address: 'Sidney No. 1 Lake Park',
//       price: ['cool', 'teacher'],
//     },
//   ];



class Dgoods extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            visible: false,
            delete : '',
            columns : [
                {
                    title: '商品名称',
                    dataIndex: 'title',
                    key: 'title',
                    render: (text,record) => <a href={`http://120.24.58.161:3005/#/gdetails/${record.goods_id}`}>{text}</a>,
                },
                {
                    title: '商品ID',
                    dataIndex: 'goods_id',
                    key: 'goods_id',
                },
                {
                    title: '商品详情',
                    dataIndex: 'title_long',
                    key: 'title_long',
                },
                {
                    title: '商品价格',
                    dataIndex: 'cprice',
                    key: 'cprice',
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record,index) => (
                        <span>
                            <a href="javascript:;">编辑</a>
                            <Divider type="vertical" />
                            <a onClick={this.showModal.bind(this,record)} href="javascript:;">删除</a>
                        </span>
                    ),
                },
            ]
        }
        this.showModal = this.showModal.bind(this);
    }
    async componentDidMount() {
        let data1 = await axios.get('https://webservice.juanpi.com/api/getGoods', {
            params: {
                page: 1,
                zy_ids: 'p8_c4_l4',
                app_name: 'zhe',
                catname: 'tab_hpzc',
                flag: 'tab_hpzc'
            }
        });
        let data2 = await axios.get('https://webservice.juanpi.com/api/getGoods', {
            params: {
                page: 2,
                zy_ids: 'p8_c4_l4',
                app_name: 'zhe',
                catname: 'tab_hpzc',
                flag: 'tab_hpzc'
            }
        });
        let data3 = await axios.get('https://webservice.juanpi.com/api/getGoods', {
            params: {
                page: 3,
                zy_ids: 'p8_c4_l4',
                app_name: 'zhe',
                catname: 'tab_hpzc',
                flag: 'tab_hpzc'
            }
        });
        this.setState({ data: [...this.state.data, ...data1.data.data.goods] })
        this.setState({ data: [...this.state.data, ...data2.data.data.goods] })
        this.setState({ data: [...this.state.data, ...data3.data.data.goods] })
    }
    showModal = (record) => {
        this.setState({
            visible: true,
        });
        this.setState({
            delete: record.goods_id,
        });
    };

    handleOk = e => {
        //点击ok遍历data
        let id = this.state.delete
        let newArr = [];
        this.state.data.map(item=>{
            if(item.goods_id !== id){
                newArr.push(item);
            }
        });
        this.setState({
            data : newArr,
        });
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return <div id="dgoods">
            <Table columns={this.state.columns} dataSource={this.state.data} />
            <Modal
                title="提醒"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <p>确定要删除该商品吗？</p>
            </Modal>
        </div>
    }
}


export default Dgoods;