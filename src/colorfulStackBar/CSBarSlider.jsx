/**
 * Created by dlb233 on 2017/1/5.
 *
 * Copyright (c) 2017-present dlb233 Inc.
 *
 * Author infomation:
 * Email:420615326@qq.com
 * file infomation(文件功能): 堆叠柱状图下部滑动条
 */

import React, { Component, PropTypes } from 'react'
import { Range } from 'rc-slider';

export default class CSBarSlider extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <div style={{}}>
                <Range />
            </div>
        )
    }

}