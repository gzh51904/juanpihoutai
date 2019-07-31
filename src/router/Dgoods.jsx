import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';

const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      price: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      price: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      price: ['cool', 'teacher'],
    },
  ];
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    },
    {
      title: '商品ID',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '商品详情',
      dataIndex: 'address',
      key: 'address',
    },
    {
        title: '商品价格',
        dataIndex: 'price',
        key: 'price',
      },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">编辑</a>
          <Divider type="vertical" />
          <a href="javascript:;">删除</a>
        </span>
      ),
    },
  ];


class Dgoods extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return <div id="dgoods">
            <Table columns={columns} dataSource={data} />
        </div>
    }
}


export default Dgoods;