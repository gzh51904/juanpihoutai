import React, { Component } from 'react';
import axios from 'axios';

import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Icon,
    Rate,
    Checkbox,
    Row,
    Col,
    input,
    Modal, 
} from 'antd';

const { Option } = Select;


class Cgoods extends Component {
    constructor() {
        super();
        this.state = {
            editing: false,
            visible: false
        }
        this.showModal = this.showModal.bind(this)
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    showModal = () => {
      var spname = document.querySelector('#tex').value;
      var gid = document.querySelector('#goodsid').value;
      var spri = document.querySelector('#price').value;
      var opri = document.querySelector('#oprice').value;
      var zhong = document.querySelector('.ant-select-selection-selected-value');
      var pinzhong = document.querySelector('.ant-select-selection-selected-value');
      var yans = '';
      var  yan = document.querySelectorAll('.ant-select-selection__choice');
      for(var i =0;i<yan.length;i++){
        if(yan){
          yans += yan[i].title
          
        }
      }


      
      var szhong = '';
     
      if(pinzhong){
        
        szhong = pinzhong.title;
        
      }
      // console.log('zizi',spname,gid,spri,opri,yans,szhong)
      axios.post('http://localhost:3001/goods',{
        spname,
        gid,
        spri,
        opri,
        yans,
        szhong,
      }).then(({data})=>{
        if(data.code===1000){
          this.setState({
            visible: true,
          });
        }
      })
      
    };
  
    handleOk = e => {
     
      document.querySelector('#tex').value='';
      document.querySelector('#goodsid').value='';
      document.querySelector('#price').value='';
      document.querySelector('#oprice').value='';
     
      var mas =  document.querySelectorAll('.ant-select-selection__choice');
      

      if(mas.length===2){
        mas[0].style.display='none';
        mas[1].style.display='none';
  
      }
      
      
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
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        };
        return (
          <>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="商品名称">
            <input id="tex" type="text" />
             
            </Form.Item>

            <Form.Item label="商品ID">
            <input id="goodsid" type="text" />
             
            </Form.Item>
            

            <Form.Item label="商品价格">
            <input id="price" type="text" />
             
            </Form.Item>

            <Form.Item label="商品市价">
            <input id="oprice" type="text" />
             
            </Form.Item>
            <Form.Item label="商品种类" hasFeedback>
              {getFieldDecorator('select', {
                rules: [{ required: true, message: '请选择商品种类!' }],
              })(
                <Select placeholder="请选择商品种类">
                  <Option value="male">男装</Option>
                  <Option value="famle">女装</Option>
                  <Option value="shoe">鞋子</Option>
                  <Option value="bag">箱包</Option>
                  <Option value="baby">母婴</Option>
                  <Option value="makup">美妆</Option>
                  <Option value="home">居家</Option>
                  <Option value="homes">家纺</Option>
                  <Option value="tex">文体</Option>
                  <Option value="food">美食</Option>
                  <Option value="digital">数码</Option>
                  <Option value="dianqi">电器</Option>
                  <Option value="bar">内衣</Option>
                  <Option value="shoushi">配饰</Option>
                </Select>,
              )}
            </Form.Item>
    
            <Form.Item label="给商品指定颜色">
              {getFieldDecorator('select-multiple', {
                rules: [
                  { required: true, message: '给商品指定颜色', type: 'array' },
                ],
              })(
                <Select mode="multiple" placeholder="给商品指定颜色">
                  <Option value="red">红色</Option>
                  <Option value="green">绿色</Option>
                  <Option value="blue">蓝色</Option>
                  <Option value="black">黑色</Option>
                  <Option value="white">白色</Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item label="给商品指定码数">
              {getFieldDecorator('none', {
                rules: [
                  { required: true, message: '给商品指定码数', type: 'array' },
                ],
              })(
                <Select mode="multiple" placeholder="给商品指定码数">
                  <Option value="M">M</Option>
                  <Option value="S">S</Option>
                  <Option value="X">X</Option>
                  <Option value="XL">XL</Option>
                  <Option value="XXL">XXL</Option>
                  <Option value="XXXL">XXXL</Option>
                  <Option value="XXXXL">XXXXL</Option>
                </Select>,
              )}
            </Form.Item>
    
            
    
            
    
            {/* <Form.Item label="Upload" extra="">
              {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                rules: [
                  { required: true, message: '给商品指定图片', type: 'array' },
                ],
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>,
              )}
            </Form.Item> */}
    
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button onClick={this.showModal.bind(this)} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>添加新商品成功！</p>
        </Modal>
        </>
        );
      }
}
const Cgoodsdemo = Form.create({ name: 'validate_other' })(Cgoods);
export default Cgoodsdemo;