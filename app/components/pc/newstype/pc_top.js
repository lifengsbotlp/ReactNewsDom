import React from "react";
import { Row, Col, Carousel } from "antd";
import { get } from "../../../fetch/get.js";
import "../../../static/css/pc_top.css";
import timg from "../../../static/images/2.png";
import PCTopText from "./top_text/top_text.js";
export default class PCTop extends React.Component {
    constructor() {
        super();
        this.state = {
            bannerimg: []
        }
    }
    componentDidMount() {
        var result = get("http://www.iwen.wiki/sxtstu/blueberrypai/getIndexBanner.php");
        var bannerUrl = [];
        var bin = [];
        result.then(res => {
            return res.json();
        }).then(json => {
            json.banner.map((ele, index) => {
                bannerUrl.push(ele.img);
            });
            this.setState({
                bannerimg: bannerUrl
            })


        })

    }
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 2000
        }
        // console.log(this.state.bannerimg)
        // console.log(timg);
        return (
            <div className="top">
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <div className="TopContent">
                            <div className="Topbanner">
                                <Carousel  {...settings}>
                                    {
                                        this.state.bannerimg.map((ele, index) => {
                                            {/*console.log(ele);*/ }
                                            return (
                                                <div key={index}>
                                                    <a href="#">
                                                        <img src={ele} alt="banner" />
                                                    </a>
                                                </div>
                                            )
                                        })
                                    }
                                    <div>
                                        <a href="#">
                                            <img src={timg} alt="banner" />
                                        </a>
                                    </div>
                                </Carousel>
                            </div>
                            <PCTopText url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=top&count=3"/>
                            <PCTopText url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=junshi&count=3"/>
                            
                            
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}