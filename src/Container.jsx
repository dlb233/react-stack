/**
 * Created by dlb233 on 2017/2/16.
 *
 * Copyright (c) 2017-present dlb233 Inc.
 *
 * Author infomation:
 * Email:420615326@qq.com
 * file infomation(文件功能):
 */

import React, {Component} from 'react'

import ColorfulStackBar from './colorfulStackBar/ColorfulStackBar.jsx'

const fakeData = {
    data:[//34098，45393
        {name:"week1",value:[17256,7326,4659,3056,1801]},
        {name:"week2",value:[16666,8026,5112,5262,2351]},
        {name:"week3",value:[15236,8888,6113,5265,2562]},
        {name:"week4",value:[16256,6598,8526,5985,2859]},
        {name:"week5",value:[15856,7326,5962,6126,3123]},
        {name:"week6",value:[14526,5698,7123,6659,5265]},
        {name:"week7",value:[13956,10121,7848,7089,5565]},
        {name:"week8",value:[10056,8888,8562,8200,7777]},
        {name:"week9",value:[9956,9232,8999,9000,8206]},
        {name:"week10",value:[13256,9105,6235,7980,6105]},
        {name:"week11",value:[11231,8265,6591,8098,6111]},
        {name:"week12",value:[10900,5498,9859,8265,6265]}
    ],
    names:[
        "类别一(备注一)",
        "类别二",
        "类别三(备注三)",
        "类别四(备注四)",
        "类别五(备注五)"
    ],
    colors:["#379cf8","#a3e06a", "#f9b32a", "#c4a9f8", "#83e5e5"]
}

class Container extends Component{
    render() {
        return (
            <div style={{height:"600px"}}>
                <ColorfulStackBar option={fakeData} tabRequire={true} slideBarRequire={true} minCount={3}/>
            </div>
        );
    }
}

export default Container