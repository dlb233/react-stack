/**
 * Created by Dulingbo on 2017/1/5.
 *
 * Copyright (c) 2017-present Dulingbo,SefonSoft Company, Inc.
 * All rights reserved.
 *
 * Author infomation:
 * Email:dulingbo@sefonSoft.com
 * Company:Sefon Soft.ChengDu
 * file infomation(文件功能): 堆叠柱状图 内容部分
 */

import * as jtools from '../tools.js'
import React, { Component, PropTypes } from 'react'

const barHeight = 0.8; //柱图区域高度比


export default class CSBarContent extends Component {

    constructor(props) {
        super(props);
        //todo...计算marginRight

        this.state = {}
    }

    render() {
        const {data,...other} = this.props;

        return (
            <div style={{height:"100%"}}>
                <div className="CSBar_bars" style={{height:"100%"}}>
                    {data.map((item, index)=> {

                        let lines = [];
                        if (data[index + 1]) {
                            let sumItem = item.reduce((pre, cur)=>pre + cur);
                            let sumNext = data[index + 1].reduce((pre, cur)=>pre + cur);
                            lines.push([sumItem, sumNext]);
                            for (let i = 0; i < sumItem.length; i++) {
                                lines.push([sumItem -= sumItem[i], sumNext -= sumNext[i]]);
                            }
                        }

                        return <CSBar {...other}
                            key={"CSBar_index"+index}
                            data={item} index={index}
                            isLast={index===data.length-1}
                            lines={lines}
                            marginDivideWidth={jtools.percentageNumber(this.props.marginDivideWidth)}
                        />
                    })}
                </div>
                <CSBarBottomLine />
            </div>
        )
    }
}

/**
 * 柱状图-单条
 * */
class CSBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * 根据最大值的高度来计算当前值的高度
     * */
    calcHeight = (value)=> {
        return jtools.percentageNumber(value / this.props.maxValue * barHeight);
    }

    render() {
        const {barWidth,isLast,barMarginRight,lines,data,colors,marginDivideWidth} = this.props;
        return (
            <div style={{width:barWidth,height:"100%",
            marginRight:isLast?"":barMarginRight}}>
                {data.map((item, index)=> {

                    //todo...通过lines计算两根线的斜率和长度，做rotate变换

                    //绘制柱状图的每一段，高度根据与最大高度的比例确定
                    return <div className={"CSBar_bar_part_"+index} key={"CSBar_bar_index"+index}
                                style={{width:"100%",height:this.calcHeight(item),
                                    position:"relative",
                                    backgroundColor:colors[index]}}>
                        {lines.length > 0 ?
                            <div style={{height:"2px",marginLeft:"100%",
                                    width:marginDivideWidth+"",
                                    backgroundColor:this.props.colors[index],
                                    position:"absolute",
                                    top:0}}></div>
                            : ""}
                        {lines.length > 0 ?
                            <div style={{height:"2px",marginLeft:"100%",
                                    width:marginDivideWidth+"",
                                    backgroundColor:this.props.colors[index],
                                    position:"absolute",
                                    bottom:0}}></div>
                            : ""}
                    </div>
                })}
            </div>
        )
    }
}

class CSBarBottomLine extends Component {

    render() {
        return (
            <div></div>
        )
    }
}