import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import Home from './router/Home.jsx'
import Login from './router/Login.jsx'

//引进redux 
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import loginAction from './stote/loginAction';

function getCookie(cookie_name) {
    var allcookies = document.cookie;
    //索引长度，开始索引的位置
    var cookie_pos = allcookies.indexOf(cookie_name);

    // 如果找到了索引，就代表cookie存在,否则不存在
    if (cookie_pos != -1) {
        // 把cookie_pos放在值的开始，只要给值加1即可
        //计算取cookie值得开始索引，加的1为“=”
        cookie_pos = cookie_pos + cookie_name.length + 1; 
        //计算取cookie值得结束索引
        var cookie_end = allcookies.indexOf(";", cookie_pos);
        
        if (cookie_end == -1) {
            cookie_end = allcookies.length;

        }
        //得到想要的cookie的值
        var value = unescape(allcookies.substring(cookie_pos, cookie_end)); 
    }
    return value;
}

class App extends Component{
    constructor(props){
        super();
        this.state = {
        }
    }
     
  render(){
    return (
        <div className="App">
            {
                this.props.status ? <Home/> : <Login/>
            }
            
        </div>
      );
    
  }
}

App = withRouter(App);

//利用高阶组件connect连接当前组件与store
//把store中的数据通过props传入当前组件

let mapStateToProps = (state)=>{
    return{
        status : state.status
    }
}
let mapDispacthToProps = (dispatch)=>{
    return bindActionCreators(loginAction,dispatch)
}


App = connect(mapStateToProps,mapDispacthToProps)(App)
export default App;
