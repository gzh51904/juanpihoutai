import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


import Axios from 'axios';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    message,
    Button,
    AutoComplete,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;


class Cuser extends Component {
    constructor() {
        super();
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        }
     
        this.add = this.add.bind(this)
    }
    success = () => {
        message.success('添加成功');
    };
    add() {
        let {nickname,phone,password,confirm} = this.props.form.getFieldsValue();
        
        
        Axios.post('http://localhost:3001/reg', {
                username: nickname,
                tel: phone,
                password: password
        }).then(({ data }) => {
            if (data.code == 1000) {
                this.success(this)
               this.props.form.setFieldsValue({
                   'nickname':'',
                   'phone':'',
                   'password':'',
                   'confirm':''
               })
            }
        })


        // this.props.form.setFieldsValue({'nickname':123456})

    }
    componentWillMount() {
        // console.log(this.props);
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return <div id="cuser" style={{ width: '50%', position: 'absolute', left: '30%' }}>
            <Form labelAlign="left">


                <Form.Item
                    label={
                        <span>
                            用户名&nbsp;
              <Tooltip title="请输入你的用户名">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请输入您的用户名!', whitespace: true }],
                        initialValue:''
                    })(<Input id="username" />)}
                </Form.Item>


                <Form.Item label="手机号">
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入正确的手机号!' }],
                    })(<Input addonBefore={prefixSelector}  style={{ width: '100%' }}  />)}
                </Form.Item>





                <Form.Item label="密码" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入你设置的密码！',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                        initialValue:''
                    })(<Input.Password />)}
                </Form.Item>


                <Form.Item label="确认密码" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: '请再次输入密码！',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                        initialValue:''
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <br />


                <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>
                            I have read the <a href="">agreement</a>
                        </Checkbox>,
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" onClick={this.add} >
                        Register
          </Button>
                </Form.Item>
            </Form>
        </div>
    }
}
const WrappedCuser = Form.create({ name: 'register' })(Cuser);
export default WrappedCuser;