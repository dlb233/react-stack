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

/**
 * 计算相邻的两同类数据条的高度差
 * */
const calcLength = (h1,h2,maxValue,widthDivideHeight) =>{
    return (h2-h1)/maxValue*widthDivideHeight;
}

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
                        let itemNext = data[index+1];//下一根柱状图数据

                        //自己和下一根柱状图各相同节的数据总量
                        if (itemNext) {
                            let sumItem = item.reduce((pre, cur)=>pre + cur);
                            let sumNext = data[index + 1].reduce((pre, cur)=>pre + cur);
                            lines.push([sumItem, sumNext]);
                            for (let i = 0; i < item.length; i++) {
                                lines.push([sumItem -= item[i], sumNext -= itemNext[i]]);
                            }
                        }

                        return <CSBar {...other}
                            key={"CSBar_index"+index}
                            data={item} index={index}
                            isLast={index===data.length-1}
                            lines={lines}
                            marginDivideWidth={this.props.marginDivideWidth}
                            widthDivideHeight={this.props.widthDivideHeight}
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
        const {barWidth,isLast,barMarginRight,lines,data,colors,marginDivideWidth,widthDivideHeight,maxValue} = this.props;
        let marginDivideWidthPercentage = jtools.percentageNumber(marginDivideWidth);

        return (
            <div style={{width:barWidth,height:"100%",
            marginRight:isLast?"":barMarginRight}}>
                {data.map((item, index)=> {

                    //todo...通过lines计算两根线的斜率和长度，做rotate变换
                    let angle1 = 0,angle2=0; //两个连线的斜率
                    if(widthDivideHeight && lines.length>0){
                        angle1=jtools.getAngle(marginDivideWidth,calcLength(lines[index][1],lines[index][0],maxValue,widthDivideHeight));
                        angle2=jtools.getAngle(marginDivideWidth,calcLength(lines[index+1][1],lines[index+1][0],maxValue,widthDivideHeight));
                        console.log("---------------",angle1);
                    }

                    //绘制柱状图的每一段，高度根据与最大高度的比例确定
                    return <div className={"CSBar_bar_part_"+index} key={"CSBar_bar_index"+index}
                                style={{width:"100%",height:this.calcHeight(item),
                                    position:"relative",
                                    backgroundColor:colors[index]}}>
                        {lines.length > 0 ?
                            <div style={{height:"2px",marginLeft:"100%",
                                    width:marginDivideWidthPercentage+"",
                                    backgroundColor:this.props.colors[index],
                                    position:"absolute",
                                    transformOrigin:"left",
                                    transform:`rotate(${angle1.angleDeg}deg)`,
                                    top:0}}></div>
                            : ""}
                        {lines.length > 0 ?
                            <div style={{height:"2px",marginLeft:"100%",
                                    width:marginDivideWidthPercentage+"",
                                    backgroundColor:this.props.colors[index],
                                    transformOrigin:"left",
                                    transform:`rotate(${angle2.angleDeg}deg)`,
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