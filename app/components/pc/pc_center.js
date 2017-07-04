import React from "react";
export default class PCCenter extends React.Component{
    render(){
        return(
            <div>
                个人中心
                <hr/>
                {/*{console.log(this.props.params)}*/}
                用户名:{this.props.params.username}
                <hr/>
                用户密码:{this.props.params.userpassword}
               <hr/>
            </div>
        )
    }
}