import React from "react";
import "../../static/css/mobile_header.css";
import Logo from "../../static/images/iwennews.png";
import MobileBanner from "./public/mobile_banner.js";
import MobileContent from "./public/mobile_content.js";
import { Icon, Tabs } from "antd";
const TabPane = Tabs.TabPane;
export default class MobileHeader extends React.Component {
    
    render() {
        
        return (
            
            <div className="mobile_header">
                {/*手机端header*/}
                <div className="mobile_header_title" >
                    <a href="#">
                        <img className="logo" src={Logo} alt="logo" />
                    </a>
                    <h2>疯子新闻</h2>
                    <a href="#"><Icon className="login" type="user" /></a>
                </div>
                <MobileBanner />
                <div className="mobile_header_tabs">
                    <Tabs defaultActiveKey="toutiao">
                        <TabPane tab="头条" key="toutiao">
                            
                            <MobileContent  url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=top&count=4"/>
                        </TabPane>
                        <TabPane tab="国内" key="guonei">
                            <MobileContent  url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=guonei&count=4"/>
                        </TabPane>
                        <TabPane tab="国际" key="guoji">
                            <MobileContent  url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=guoji&count=4"/>
                        </TabPane>
                        <TabPane tab="体育" key="tiyu">
                            <MobileContent  url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=tiyu&count=4"/>
                        </TabPane>
                        <TabPane tab="娱乐" key="yule">
                            <MobileContent  url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=yule&count=4"/>
                        </TabPane>
                        <TabPane tab="军事" key="junshi">
                            <MobileContent  url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=junshi&count=4"/>
                        </TabPane>
                        <TabPane tab="科技" key="keji">
                            <MobileContent  url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=keji&count=4"/>
                        </TabPane>
                        <TabPane tab="时尚" key="shishang">
                            <MobileContent  url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=shishang&count=4"/>
                        </TabPane>
                    </Tabs>
                    
                </div>
                
            </div>
            
        )
    }
}