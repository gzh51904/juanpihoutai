import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Form, Icon, Input, Button, Checkbox,message,  } from 'antd';

import Axios from 'axios'

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import loginAction from '../stote/loginAction';

class Login extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
     //设置Cookie的方法
     setCookie(name,value,n){
        var oDate = new Date();
        oDate.setDate(oDate.getDate()+n);
        document.cookie = name+"="+value+";expires="+oDate;
    }
    success = () => {
        message.success('登录成功');
      };
      error = () => {
        message.error('账号或密码错误');
      };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                let {username, password} = values;
                Axios.get('http://localhost:3001/hlogin',{
                    params:{
                        username:username,
                        password:password
                    }
                }).then(({data})=>{
                    let code = data.code
                    if(code == 1000) {
                        this.success(this)
                        this.props.statusAction(true);
                        console.log(this.props)
                    }else{
                        this.error(this)
                    }
                })
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return <div id="login" style={{paddingTop:'250px',background:'#ccc', width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,}}>
            <Form style={{width:'20%',margin:'0 auto',background:'#ccc'}} onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                        initialValue:'admin'
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                        initialValue:''
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        Forgot password
          </a>
                    <Button type="primary"
                     htmlType="submit"
                      className="login-form-button"
                    
                      >
                        Log in
          </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>
        </div>
    }
}
let mapStateToProps = (state)=>{
    return{
        status : state.status
    }
}
let mapDispacthToProps = (dispatch)=>{
    return bindActionCreators(loginAction,dispatch)
}
Login = withRouter(Login);
Login = connect(mapStateToProps,mapDispacthToProps)(Login)
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm;