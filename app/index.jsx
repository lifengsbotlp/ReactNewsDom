import React from "react";
import ReactDOM from "react-dom";
import MediaQuery from "react-responsive";//响应式插件
import PCIndex from "./components/pc/pc_index.js";
import MobileIndex from "./components/mobile/mobile_index.js";
import "./static/css/common.css";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import PCCenter from "./components/pc/pc_center.js";
import PCGuoJi from "./components/pc/newstype/pc_guoji.js";
import PCGuoNei from "./components/pc/newstype/pc_guonei.js";
import PCJunShi from "./components/pc/newstype/pc_junshi.js";
import PCKeJi from "./components/pc/newstype/pc_keji.js";
import PCShiShang from "./components/pc/newstype/pc_shishang.js";
import PCTiYu from "./components/pc/newstype/pc_tiyu.js";
import PCTop from "./components/pc/newstype/pc_top.js";
import PCYuLe from "./components/pc/newstype/pc_yule.js";
class App extends React.Component {
    render() {
        return (
            <div>

                {/* PC端 */}
                <MediaQuery query="(min-device-width:1224px)">
                    <Router history={hashHistory}>
                        <Route path="/" component={PCIndex}>
                            {/*头部不更变 路由嵌套*/}
                            <IndexRoute component={PCTop}/>
                            <Route path="/guoji" component={PCGuoJi}></Route>
                            <Route path="/guonei" component={PCGuoNei}></Route>
                            <Route path="/junshi" component={PCJunShi}></Route>
                            <Route path="/keji" component={PCKeJi}></Route>
                            <Route path="/shishang" component={PCShiShang}></Route>
                            <Route path="/tiyu" component={PCTiYu}></Route>
                            <Route path="/yule" component={PCYuLe}></Route>
                        </Route>
                        <Route path="/center/:username/:userpassword" component={PCCenter}></Route>
                    </Router>
                </MediaQuery>
                {/* 移动端 */}
                <MediaQuery query="(max-device-width:1224px)">
                    <MobileIndex />
                    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
		            <meta name="format-detection" content="telephone=no" /> 
                </MediaQuery>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById("root"));