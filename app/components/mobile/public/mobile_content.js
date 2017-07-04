import React from "react";
import { get } from "../../../fetch/get.js";
import "../../../static/css/mobile_content.css";
export default class MobileContent extends React.Component {
    constructor() {
        super();
        this.state = {
            newsInfo: [
                {
                    url: [],
                    title: [],
                    thumbnail_pic_s: []
                }
            ],
            num:2,
        }
    }
    componentDidMount() {
        var url=this.props.url;
        var num=this.state.num;
        var newUrl=url.replace("4",num)
        var result = get(newUrl);
        result.then(res => {
            return res.json();
        }).then(json => {
            json.map((ele, index) => {
                // console.log(ele);
                this.setState({
                    newsInfo: json
                })
            })
        })
    }
    render() {
        return (
            <div className="mobil_content_box">
                {
                    this.state.newsInfo.map((ele, index) => {
                        return (
                            <div className="mobi_content_con" key={index}>
                                <a  href={ele.url}>
                                    <img src={ele.thumbnail_pic_s} alt="" />
                                    <span>{ele.title}</span>
                                </a>
                                 <hr/>
                            </div> 
                        )
                    })
                }
            </div>
        )
    }
}