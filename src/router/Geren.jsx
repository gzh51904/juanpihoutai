import React, { Component } from 'react';

import { Descriptions, Badge } from 'antd';
class Geren extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return <div id="geren">
            <Descriptions title="User Info" bordered>
                <Descriptions.Item label="用户名">Yoga</Descriptions.Item>
                <Descriptions.Item label="性别">男</Descriptions.Item>
                <Descriptions.Item label="级别">复制粘贴工程师</Descriptions.Item>
                <Descriptions.Item label="注册时间">2019-07-30 18:00:00</Descriptions.Item>
                <Descriptions.Item label="使用时间" span={3}>
                    2019-04-24 18:00:00
    </Descriptions.Item>
                <Descriptions.Item label="状态" span={3}>
                    <Badge status="processing" text="Running" />
                </Descriptions.Item>
                <Descriptions.Item label="投资金额">$80000.00</Descriptions.Item>
                <Descriptions.Item label="盈利金额">$200000.00</Descriptions.Item>
                <Descriptions.Item label="今日盈利">$6000.00</Descriptions.Item>
                <Descriptions.Item label="个人简介">
                    Data disk type: MongoDB
      <br />
                    Database version: 3.4
      <br />
                    Package: dds.mongo.mid
      <br />
                    Storage space: 10 GB
      <br />
                    Replication_factor:3
      <br />
                    Region: East China 1<br />
                </Descriptions.Item>
            </Descriptions>
        </div>
    }
}

export default Geren;