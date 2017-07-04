import React from "react";
import MobileHeader from "./mobile_header.js"
export default class MobileIndex extends React.Component {
    constructor() {
        super();
        //手机端自适应iPhone5
        //100px=2rem
        (function (doc, win) {
            var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    if (clientWidth >= 640) {
                        docEl.style.fontSize = '100px';
                    } else {
                        docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
                    }
                };

            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
           
        })(document, window);
    }
    render() {
        return (
            <div>
                <MobileHeader />
            </div>
        )
    }
}