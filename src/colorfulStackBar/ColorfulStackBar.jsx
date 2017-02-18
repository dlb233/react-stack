/**
 * Created by Dulingbo on 2017/01/05.
 *
 * Copyright (c) 2017-present Dulingbo,SefonSoft Company, Inc.
 * All rights reserved.
 *
 * Author infomation:
 * Email:dulingbo@sefonSoft.com
 * Company:Sefon Soft.ChengDu
 * file infomation(文件功能): 彩色堆叠柱状图
 */

import * as jtools from '../tools.js'

import React, { Component, PropTypes } from 'react'
import './ColorfulStackBar.scss'
import  CSBarTab from './CSBarTab.jsx'
import  CSBarContent from './CSBarContent.jsx'
import  CSBarSlider from './CSBarSlider.jsx'

const marginDivideWidth = 1.5; //柱间间距与柱宽的比例
const defaultLength = 9; //默认展示柱图数量
const barHeightPercentage = 0.7; //柱状图最大高度占比

/**
 * 彩色堆叠柱状图
 * @author：杜凌波
 * 可接受参数(props传入)：
 * @param tabRequire:boolean类型,是否需要图例
 * @param slideBarRequire:boolean类型,是否需要底部滑动条
 * @param data:array类型，要展示的数据
 * */
export default class ColorfulStackBar extends Component{

    constructor(props){
        super(props);
        let dataLength = this.props.option.data.length;//数据条数
        let defaultSliderWidth=0; //默认的滚动条已经滚动的长度比例

        //初始滑动条位置
        if(dataLength<=defaultLength){
            defaultSliderWidth=1;
        }else{
            defaultSliderWidth = defaultLength/dataLength;
        }

        let maxValue=0;

        //求得当前数组中的最大值
        for(let item of this.props.option.data){
            let sum = item.reduce((pre,cur)=>{return pre+cur});
            if(sum>maxValue) maxValue=sum;
        }

        this.state = {
            sliderStart:0,   //滑动条起始位置比例
            sliderWidth:defaultSliderWidth,    //选中滑动条的长度比例
            maxValue:maxValue
        }
    }

    /**
     * 根据当前的滑动条位置和长度获取当前显示的数据
     * */
    getShowData(){
        let dataLength = this.props.option.data.length;
        let {sliderStart,sliderWidth} = this.state;

        let start = Math.floor(sliderStart*dataLength);
        let showDatalength = Math.floor(sliderWidth*dataLength);

        let data = this.props.option.data.slice(start,showDatalength);
        let names = this.props.option.names.slice(start,showDatalength);
        //todo...根据当前选择的类别状况取色，暂时取全色
        let colors = this.props.option.colors;

        let barWidth = 1/((marginDivideWidth+1)*defaultLength-marginDivideWidth+1);  //柱状图单柱宽度公式，两边各多半个单柱状图宽度的空白

        let floorBarWidth = Math.floor(barWidth*100)/100; //转换为整数百分比,向下取整以免超出

        let barMarginRight = jtools.percentageNumber(marginDivideWidth*floorBarWidth);

        barWidth = jtools.percentageNumber(floorBarWidth);

        return {
            data,
            names,
            colors,
            barMarginRight,
            barWidth
        };
    }

    componentDidMount(){
        let outsideDiv = this.refs.outsideDiv;
        if(outsideDiv){
            let outWidth = outsideDiv.clientWidth,
                outHeight = outsideDiv.clientHeight*barHeightPercentage,
                widthDivideHeight =  outWidth/outHeight;

            if(outWidth && outHeight && widthDivideHeight!==this.state.widthDivideHeight){
                this.setState({
                    widthDivideHeight,
                    outWidth,
                    outHeight
                });
            }
        }
    }

    componentDidUpdate(){
        let outsideDiv = this.refs.outsideDiv;
        if(outsideDiv){
            let outWidth = outsideDiv.clientWidth,
                outHeight = outsideDiv.clientHeight*barHeightPercentage,
                widthDivideHeight =  outWidth/outHeight;

            if(outWidth && outHeight && widthDivideHeight!==this.state.widthDivideHeight){
                this.setState({
                    widthDivideHeight,
                    outWidth,
                    outHeight
                });
            }
        }
    }

    render(){
        return(
            <div style={{height:"100%"}} ref="outsideDiv">
                {this.props.tabRequire?
                    <div className="CSBar_tab" style={{height:"15%"}}>
                        <CSBarTab />
                    </div>:""
                }

                <div className="CSBar_content" style={{height:jtools.percentageNumber(barHeightPercentage)}}>
                    <CSBarContent {...this.getShowData()}
                        maxValue={this.state.maxValue}
                        widthDivideHeight={this.state.widthDivideHeight}
                        outWidth={this.state.outWidth}
                        outHeight={this.state.outHeight}
                        marginDivideWidth={marginDivideWidth}/>
                </div>

                {this.props.slideBarRequire?
                    <div className="CSBar_slider" style={{height:"15%"}}>
                        <CSBarSlider />
                    </div>:""
                }
            </div>
        )
    }
}
