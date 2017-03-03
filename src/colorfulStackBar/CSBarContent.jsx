/**
 * Created by dlb233 on 2017/1/5.
 *
 * Copyright (c) 2017-present dlb233 Inc.
 *
 * Author infomation:
 * Email:420615326@qq.com
 * file infomation(文件功能): 堆叠柱状图 内容部分
 */

import * as jtools from '../tools.js'
import React, { Component, PropTypes } from 'react'

const barHeight = 0.8; //柱图区域高度比

/**
 * 计算相邻的两同类数据条的高度差
 * */
const calcLength = (h1,h2,maxValue,outHeight) =>{
    return (h2-h1)/maxValue*outHeight;
}

export default class CSBarContent extends Component {

    constructor(props) {
        super(props);
        //todo...计算marginRight

        this.state = {

        }
    }

    render() {
        const {handledData,...other} = this.props;
        return (
            <div style={{height:"100%"}}>
                <div className="CSBar_bars" style={{height:"100%"}}>
                    <div style={{width:jtools.percentageNumber(parseInt(this.props.barWidth)/200)}}></div>
                    {handledData.map((item, index)=> {

                        let lines = [];
                        let totalValue=0;
                        let itemNext = handledData[index+1];//下一根柱状图数据

                        //自己和下一根柱状图各相同节的数据总量
                        if (itemNext) {
                            let sumItem = totalValue =  item.value.reduce(((pre, cur)=>pre + cur.value),0);
                            let sumNext = handledData[index + 1].value.reduce(((pre, cur)=>pre + cur.value),0);
                            lines.push([sumItem, sumNext]);
                            for (let i = 0; i < item.value.length; i++) {
                                lines.push([sumItem -= item.value[i].value, sumNext -= itemNext.value[i].value]);
                            }
                        }else{
                            totalValue = item.value.reduce(((pre, cur)=>pre + cur.value),0);
                        }

                        return <CSBar {...other}
                            key={"CSBar_index"+index}
                            data={handledData[index]}
                            index={index}
                            totalValue={totalValue}
                            isLast={index===handledData.length-1}
                            lines={lines}
                            marginDivideWidth={this.props.marginDivideWidth}
                            widthDivideHeight={this.props.widthDivideHeight}
                        />
                    })}
                    <div style={{width:jtools.percentageNumber(parseInt(this.props.barWidth)/200)}}></div>
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
        return (value / this.props.maxValue * barHeight);
    }

    /**
     * 给每段数据增加hover事件
     * */
    componentDidMount(){
        for(let i in this.props.data.value){
            let className = `.CSBar_bar_part_${i}`;
            $(className).hover(()=>{
                $(`${className} div`).css("visibility","visible");
            },()=>{
                $(`${className} div`).css("visibility","hidden");
            })
        }

    }

    componentWillReceiveProps(newProps){
        if(this.props.data.value.length!==newProps.data.value.length){
            this.setState({
            //todo...DOM发生变化需要重新绑定事件，而onmouseon和onmouseleave似乎也有问题，看一下jquery的hover源码为宜
                needBindEvent:true
            });
        }
    }

    componentDidUpdate(){
        if(this.state.needBindEvent){
            for(let i in this.props.data.value){
                let className = `.CSBar_bar_part_${i}`;
                $(className).hover(()=>{
                    $(`${className} div`).css("visibility","visible");
                },()=>{
                    $(`${className} div`).css("visibility","hidden");
                })
            }
            this.setState({
                needBindEvent:false
            })
        }
    }

    render() {
        const {barWidth,isLast,barMarginRight,lines,data,colors,marginDivideWidth,maxValue,outHeight,outWidth,totalValue} = this.props;

        let offsetTop = (1-totalValue/maxValue)*outHeight*barHeight;
        return (
            <div style={{width:barWidth,height:"100%",top:`${offsetTop}px`,
            marginRight:isLast?"":barMarginRight}}>
                {data.value.map((item, index)=> {

                    //通过lines计算两根线的斜率和长度，做rotate变换
                    let angle1 = 0,angle2=0; //两个连线的斜率
                    let lineLength1,lineLength2=jtools.percentageNumber(marginDivideWidth);//两根连线的长度
                    if(outHeight && lines.length>0){
                        let tempMarginWidth = marginDivideWidth*outWidth*Number.parseInt(barWidth)/100;
                        angle1=jtools.getAngle(tempMarginWidth,calcLength(lines[index][1],lines[index][0],maxValue,outHeight*barHeight));
                        angle2=jtools.getAngle(tempMarginWidth,calcLength(lines[index+1][1],lines[index+1][0],maxValue,outHeight*barHeight));
                        lineLength1 = jtools.percentageNumber(marginDivideWidth/Math.cos(angle1.angle));
                        lineLength2 = jtools.percentageNumber(marginDivideWidth/Math.cos(angle2.angle));
                    }

                    let thisHeight = this.calcHeight(item.value),
                        offsetTop = 0;

                    if(outHeight){
                        thisHeight*=outHeight;
                    }

                    //绘制柱状图的每一段，高度根据与最大高度的比例确定
                    return <div className={"CSBar_bar_part_"+index} key={"CSBar_bar_index"+index}
                                style={{width:"100%",height:thisHeight,
                                    position:"relative",
                                    backgroundColor:colors[index]}}>
                            {/*浮动信息*/}
                            <div style={{position:"absolute",visibility:"hidden",
                                top:"-42px",left:"50%",transform:"translate(-50%,0)",textAlign:"center"}}>
                                <span style={{display:"block"}}>
                                    {item.value}
                                </span>
                                <span style={{color:"#00995a"}}>
                                    {item.varyPercentage}
                                </span>
                            </div>

                            {/*两根连线*/}
                            {lines.length > 0 ?
                            <div style={{height:"2px",marginLeft:"100%",
                                    width:lineLength1+"",
                                    backgroundColor:this.props.colors[index],
                                    position:"absolute",
                                    visibility:"hidden",
                                    transformOrigin:"left",
                                    transform:`rotate(${angle1.angleDeg}deg)`,
                                    top:0}}></div>
                            : ""}
                            {lines.length > 0 ?
                            <div style={{height:"2px",marginLeft:"100%",
                                    width:lineLength2+"",
                                    backgroundColor:this.props.colors[index],
                                    transformOrigin:"left",
                                    visibility:"hidden",
                                    transform:`rotate(${angle2.angleDeg}deg)`,
                                    position:"absolute",
                                    bottom:0}}></div>
                            : ""}
                    </div>
                })}
                <div style={{width:"100%",position:"relative",top:"5px"}}>
                    <span style={{position:"absolute",width:"100%",textAlign:"center"}}>{data.name}</span>
                </div>
            </div>
        )
    }
}

class CSBarBottomLine extends Component {

    render() {
        return (
            <div style={{
                height:"1px",
                backgroundColor:"#000",
                position:"relative",
                top:jtools.percentageNumber(barHeight-1)
                }}>
            </div>
        )
    }
}