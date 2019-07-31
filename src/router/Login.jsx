import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

class Login extends Component {
    constructor() {
        super();
        this.state = {

        }
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
          </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>
        </div>
    }
}
Login = withRouter(Login);
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm;