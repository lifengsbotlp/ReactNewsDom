import React from "react";
import { get } from "../../../../fetch/get.js";
import "../../../../static/css/pc_top_text.css";
export default class PCTopText extends React.Component {
    constructor() {
        super();
        this.state = {
            topText: [{
                title: "未知"
            }]
        }
    }
    componentDidMount() {
        var textResult = get(this.props.url);
        textResult.then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                topText: json
            })
            // console.log(json);
        })
    }
    render() {
        return (
            <div className="top_text_box">
                <div className="top_text_com">
                    <ul>
                        {
                            this.state.topText.map((element, index) => {
                                return (
                                    <li key={index}>
                                        <a target="_blank" href={element.url}>{element.title}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}