import React from "react";
import { Row, Col, Menu, Icon,Button,Modal,Tabs,Form,Input,Checkbox,message} from 'antd';
import {Link} from "react-router";
import Logo from "../../static/images/iwennews.png";
import "../../static/css/pc_header.css";
import { get } from "../../fetch/get.js";
import { post } from "../../fetch/post.js";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class PCHeader extends React.Component{
    constructor(){
        super();
        this.state = {
            current:"top",
            islogin:false,
            userNickName:"sbotlp",
            modalVisible:false,
            action:"login",
        }
    }
    //进入时，判断用户名和秘密是否存在，如果存在则直接登录状态，如果不存在，爱那那去
    //同时需要执行生命周期！在view绘制前执行判断用户名是否存在
    componentWillMount(){
        if(localStorage.getItem("username")){
            this.setState({
                userNickName:localStorage.getItem("username"),
                islogin:true
            })
        }
    }
    // Menu的事件
    currentClick(event){
        //唤醒“登录注册”对话框
        if(event.key=="register"){
            this.setState({
                modalVisible:true
            })
        }
        this.setState({
            current:event.key
        })
        // console.log(event)
    }
    //退出登入事件
    logout(){
        this.setState({
            islogin:false
        })
        //点击退出登入之后清除本地存储
        localStorage.clear();
    }
    //控制"登录注册对话框"的显示与隐藏
    setModalVisible(){
        this.setState({
            modalVisible:false
        })
    }
    /**
     * 区分是登录还是注册
     * action:代表登录和注册的状态
     */
    callback(key){
        if(key=="1"){
            this.setState({
                action:"login"
            })
        }else if(key=="2"){
            this.setState({
                action:"register"
            })
        }
    }
    handlerSubmit(event){
        event.preventDefault();
        var formData = this.props.form.getFieldsValue();//老版本获取表单内容的方法
        // console.log(formData);
        //新版本获取表单内容的方法！
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         console.log('Received values of form: ', values);
        //     }
        // });
        
        //获取输入的信息
        var formData = this.props.form.getFieldsValue();
        if(this.state.action == "login"){
            //登录和注册接口    
            // console.log("记住密码"+Checkbox);
            let result = fetch("http://www.iwen.wiki/sxtstu/news/selectuser.php?username="+formData.r_username+"&password="+formData.r_password);
            result.then(res => {
                return res.json();
            }).then(json => {
                // console.log("登入"+formData);
                this.setState({
                    islogin:true,
                    userNickName:json.username,
                    modalVisible:false
                })

                //本地存储密码简易型
                localStorage.setItem("username",json.username);
                localStorage.setItem("password",json.password);
                
            })
        }else if(this.state.action == "register"){
            let result=fetch("http://www.iwen.wiki/sxtstu/news/adduser.php?username="+formData.username+"&password="+formData.password+"&repassword="+formData.confirmpassword);
            result.then(res=>{
                return res.json();
            }).then(json=>{
                // console.log(json);
                // console.log("注册"+formData);
                message.success(json)//插件自带的全局弹窗
                this.setModalVisible(false);//测试调用函数！其实和上面登入的一样
                this.setState({
                    islogin:true,
                    userNickName:formData.username
                })
            })
        }
        

    }
    render(){
        //个人中心读取用户信息！读取用户账户密码~本地存储的
        //组件和组件直接的交互
        
        var username = localStorage.getItem("username");
        var userpassword = localStorage.getItem("password");
        // var {getFieldProps} = this.props.form;//旧版表单引入方式
        const { getFieldDecorator } = this.props.form;//新版表单引入方式
        var showMenu=this.state.islogin
        ?
        <Menu.Item key="logout" className="header-login">
             <Button type="primary" className="header_btn">{this.state.userNickName}</Button>
             <Button type="dashed" className="header_btn">
                 <Link to={`/center/${username}/${userpassword}`}>个人中心</Link>
            </Button>
             <Button type="ghost" className="header_btn" onClick={this.logout.bind(this)}>退出</Button>
        </Menu.Item>
        :
        <Menu.Item key="register" className="header-login">
            登录|注册
        </Menu.Item> 
        return(
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Row>
                            <Col span={1}>
                                <div className="logo">
                                    <Link to={`/`}>
                                        <img src={Logo} alt="Logo"/>
                                    </Link>
                                </div>
                            </Col>
                            <Col span={22}>
                                <Menu onClick={this.currentClick.bind(this)} className="menu" mode="horizontal" selectedKeys={[this.state.current]}> 
                                    <Menu.Item key="top">
                                        <Link to={`/`}>
                                            <Icon type="to-top" />
                                            头条
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="guonei">
                                        <Link to={`/guonei`}>
                                            <Icon type="minus-square" />
                                            国内
                                        </Link>
                                    </Menu.Item> 
                                    <Menu.Item key="guoji">
                                        <Link to={`/guoji`}>
                                            <Icon type="global" />
                                            国际
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="体育">
                                        <Link to={`/tiyu`}>
                                            <Icon type="smile" />  
                                            体育
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="yule">
                                        <Link to={`/yule`}>
                                             <Icon type="appstore" /> 
                                            娱乐
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="junshi">
                                        <Link to={`/junshi`}>
                                            <Icon type="rocket" /> 
                                            军事
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="keji">
                                        <Link to={`/keji`}>
                                            <Icon type="fork" /> 
                                            科技
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="shishang">
                                        <Link to={`shishang`}>
                                            <Icon type="apple" /> 
                                            时尚
                                        </Link>
                                    </Menu.Item>
                                    {showMenu}
                                </Menu> 
                                {/* 登录注册对话框:对话框、tabs、表单 */}
                                <Modal visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关闭">
                                    {/*tabs奇幻显示*/}
                                    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                                        <TabPane tab="登入" key="1">
                                            {/*登入*/}
                                            <Form onSubmit={this.handlerSubmit.bind(this)}>
                                                <FormItem label="用户名">
                                                    {/*旧版表单方法*/}
                                                    {/*<Input placeholder="请输入用户名" type="text" {...getFieldProps("r_username")} prefix={<Icon type="user" style={{ fontSize: 13 }} />}></Input>*/}
                                                    
                                                    {/*新版方法 可直接设置传递数据类型已经设置规定规则*/}
                                                    {getFieldDecorator('r_username', {
                                                        rules: [{ required: true, message: 'Please input your username!' }],
                                                    })(
                                                        <Input placeholder="请输入用户名" />
                                                    )}
                                                </FormItem>
                                                <FormItem label="密码">
                                                    {/*旧版表单方法*/}
                                                    {/*<Input placeholder="请输入密码" type="password" {...getFieldProps("r_password")} prefix={<Icon type="lock" style={{ fontSize: 13 }} />}></Input>*/}
                                                    
                                                    {/*新版方法*/}
                                                    {getFieldDecorator('r_password', {
                                                        rules: [{ required: true, message: 'Please input your password!' }],
                                                    })(
                                                        <Input placeholder="请输入密码" type="password"/>
                                                    )}
                                                </FormItem>
                                                <FormItem>
                                                   {getFieldDecorator('remember', {
                                                        valuePropName: 'checked',
                                                        initialValue: true,
                                                    })(
                                                        <Checkbox>Remember me</Checkbox>
                                                    )}
                                                    <a className="login-form-forgot login_wjmm" href="">忘记密码</a>
                                                </FormItem>
                                                <FormItem>
                                                    <Button type="primary" htmlType="submit" className="login-form-button">登入</Button>
                                                </FormItem>
                                            
                                            </Form>
                                        </TabPane>
                                        <TabPane tab="注册" key="2">
                                            {/*注册*/}
                                            <Form onSubmit={this.handlerSubmit.bind(this)}>
                                                <FormItem label="用户名">
                                                    {/*旧版表单方法*/}
                                                    {/*<Input placeholder="请输入用户名" type="text" {...getFieldProps("username")} prefix={<Icon type="user" style={{ fontSize: 13 }} />}></Input>*/}
                                                    
                                                    {/*新版方法 可直接设置传递数据类型已经设置规定规则*/}
                                                    {getFieldDecorator('username', {
                                                        rules: [
                                                                { required: true, message: 'Please input your username!' },
                                                                {max:26},
                                                                {min:6},
                                                                {type:'string', message: 'The input is not valid E-mail!'},
                                                            ],
                                                    })(
                                                        <Input placeholder="请输入用户名"/>
                                                    )}
                                                </FormItem>
                                                <FormItem label="密码">
                                                    {/*旧版表单方法*/}
                                                    {/*<Input placeholder="请输入密码" type="password" {...getFieldProps("password")}  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}></Input>*/}
                                                    
                                                    {/*新版方法*/}
                                                    {getFieldDecorator('password', {
                                                        
                                                        rules: [{ required: true, message: 'Please input your password!' },{max:26},{min:6}],
                                                    })(
                                                        <Input placeholder="请输入密码" type="password"/>
                                                    )}
                                                </FormItem>
                                                <FormItem label="确认密码">
                                                    {/*旧版表单方法*/}
                                                    {/*<Input placeholder="请输再次入密码" type="password" {...getFieldProps("confirmpassword")}  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}></Input>*/}
                                                    
                                                    {/*新版方法*/}
                                                    {getFieldDecorator('confirmpassword', {
                                                        rules: [{ required: true, message: 'Please input your confirmpassword!' }],
                                                    })(
                                                        <Input placeholder="请在次输入密码" type="password"/>
                                                    )}
                                                </FormItem>
                                                <Button type="primary" htmlType="submit" className="login-form-button">注册</Button>
                                            </Form>
                                        </TabPane>
                                    </Tabs>
                                </Modal> 
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}
//表单必须要最后导出并且把表单挂载到整个组件上面
export default PCHeader = Form.create({})(PCHeader);