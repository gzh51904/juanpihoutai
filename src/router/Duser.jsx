import React, { Component } from 'react';
import { Table, Divider, Tag ,Button, Modal} from 'antd';
import axios from 'axios'

// const data = [
//     {
//       key: '1',
//       name: 'John Brown',
//       age: 32,
//       address: 'New York No. 1 Lake Park',
//       tags: ['nice', 'developer'],
//     },
//     {
//       key: '2',
//       name: 'Jim Green',
//       age: 42,
//       address: 'London No. 1 Lake Park',
//       tags: ['loser'],
//     },
//     {
//       key: '3',
//       name: 'Joe Black',
//       age: 32,
//       address: 'Sidney No. 1 Lake Park',
//       tags: ['cool', 'teacher'],
//     },
//   ];


class Duser extends Component {
    constructor() {
        super();
        this.state = {
            data : [],
            _id : '',
            colums : [
                {
                  title: '用户名',
                  dataIndex: 'username',
                  key: 'username',
                  render: text => <a href="javascript:;">{text}</a>,
                },
                {
                  title: 'ID',
                  dataIndex: '_id',
                  key: '_id',
                },
                {
                  title: '手机号码',
                  dataIndex: 'tel',
                  key: 'tel',
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (text, record) => (
                    <span>
                      <a href="javascript:;">编辑</a>
                      <Divider type="vertical" />
                      <a onClick={this.showModal.bind(this,record)} href="javascript:;">删除</a>
                    </span>
                  ),
                },
              ]
        }
    }
    async componentWillMount(){
        let data = await axios.get('http://localhost:3001/users', {});
        this.setState({data : data.data});
    }
    showModal = (record) => {
        this.setState({
            visible: true,
        });
        this.setState({
            delete: record._id,
        });
    };

    handleOk = e => {
        //点击ok遍历data
        let id = this.state.delete
        let newArr = [];
        this.state.data.map(item=>{
            if(item._id !== id){
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
        return <div id="duser">
            <Table columns={this.state.colums} dataSource={this.state.data} />
            <Modal
                title="提醒"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <p>确定要删除该用户吗？</p>
            </Modal>
        </div>
    }
}


export default Duser;