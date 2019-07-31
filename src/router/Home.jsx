import React, { Component } from 'react';
import {Route,Redirect,withRouter,Switch} from 'react-router-dom';
import Login from './Login.jsx'

import Geren from './Geren';
import Cuser from './Cuser';
import Duser from './Duser';
import Cgoods from './Cgoods';
import Dgoods from './Dgoods';


import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class Home extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
        }
        this.goto = this.goto.bind(this)
    }
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };

    goto(key){
        if(key === 3)
            this.props.history.push('/cuser');
        else if(key === 4)
            this.props.history.push('/duser');
        else if(key === 6)
            this.props.history.push('/cgoods');
        else if(key === 8)
            this.props.history.push('/dgoods');
        else if(key === 1)
            this.props.history.push('/home');
    }
    render() {
        return <div id="home">
            <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" onClick={this.goto.bind(this,1)}>
              <Icon type="pie-chart" />
              <span>个人信息</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>用户管理</span>
                </span>
              }
            >
              <Menu.Item key="3" onClick={this.goto.bind(this,3)}>添加用户</Menu.Item>
              <Menu.Item key="4" onClick={this.goto.bind(this,4)}>修改用户</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>商品信息</span>
                </span>
              }
            >
              <Menu.Item key="6" onClick={this.goto.bind(this,6)}>添加商品</Menu.Item>
              <Menu.Item key="8" onClick={this.goto.bind(this,8)}>修改商品</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 ,background:'url(http://img5.imgtn.bdimg.com/it/u=3411618610,4149960071&fm=26&gp=0.jpg)no-repeat',backgroundPosition:'left center',backgroundSize:'auto 64px'}} />
          <Content style={{ margin: '0 16px' }}>
              <Switch>
                <Route path="/home" component={Geren}/>
                <Route path="/cuser" component={Cuser}/>
                <Route path="/duser" component={Duser}/>
                <Route path="/cgoods" component={Cgoods}/>
                <Route path="/dgoods" component={Dgoods}/>
                <Redirect from="/" to="/home" exact />
              </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>最强卷皮网后台系统</Footer>
        </Layout>
      </Layout>
        </div>
    }
}
Home = withRouter(Home);
export default Home;