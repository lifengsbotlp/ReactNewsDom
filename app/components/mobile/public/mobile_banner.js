import React from "react";
import { Carousel } from "antd";
import "../../../static/css/mobile_banner.css";
import { get } from "../../../fetch/get.js";
import timg from "../../../static/images/2.png";
export default class MobileBanner extends React.Component {
    constructor() {
        super();
        this.state = {
            bannerimg: []
        }
    }
    componentDidMount() {
        var result = get("http://www.iwen.wiki/sxtstu/blueberrypai/getIndexBanner.php");
        var bannerurl = [];
        result.then(res => {
            return res.json();
        }).then(json => {
            json.banner.map((ele, index) => {
                bannerurl.push(ele.img)
            })
            this.setState({
                bannerimg: bannerurl
            })
        })

    }
    render() {
        return (
            <div className="mobile_banner">
                <Carousel autoplay>
                    {
                        this.state.bannerimg.map((ele, index) => {
                            {/*console.log(ele);*/}
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
        )
    }
}