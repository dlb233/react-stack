/**
 * Created by LuoJia on 2017/2/16.
 *
 * Copyright (c) 2017-present Dulingbo,SefonSoft Company, Inc.
 * All rights reserved.
 *
 * Author information:
 * Email:dulingbo@sefonSoft.com
 * Company:Sefon Soft.ChengDu
 * file information(文件功能):
 */

import React, {Component} from 'react'

import ColorfulStackBar from './colorfulStackBar/ColorfulStackBar.jsx'

const fakeData = {
    data:[
        [17256,7326,4659,3056,1801],
        [16666,8026,5112,5262,2351],
        [15236,8888,6113,5265,2562],
        [16256,6598,8526,5985,2859],
        [15856,7326,5962,6126,3123],
        [14526,5698,7123,6659,5265],
        [13956,10121,7848,7089,5565],
        [13256,9105,6235,7980,6105],
        [11231,8265,6591,8098,6111],
        [10900,5498,9859,8265,6265],
        [10056,8888,8562,8200,7777],
        [9956,9232,8999,9000,8206]
    ],
    names:["2/3G网络4G终端用户(需换卡)","2/3G网络2/3G终端用户","2/3G网络4G终端用户(但不符合换卡条件)",
        "4G网络4G终端用户(活跃用户)","4G网络4G终端用户(离网or静默用户)"],
    colors:["#379cf8","#a3e06a", "#f9b32a", "#c4a9f8", "#83e5e5", "#f288bc", "#ff8f83", "#bbbbbb"]
}

class Container extends Component{
    render() {
        return (
            <div style={{height:"600px"}}>
                <ColorfulStackBar option={fakeData}/>
            </div>
        );
    }
}

export default Container