/**
 * Created by dlb233 on 2017/01/05.
 *
 * Copyright (c) 2017-present dlb233 Inc.
 *
 * Author infomation:
 * Email:420615326@qq.com
 * file infomation(文件功能): 彩色堆叠柱状图
 */

import * as jtools from '../tools.js'

import React, { Component, PropTypes } from 'react'
import './ColorfulStackBar.scss'
import  CSBarTab from './CSBarTab.jsx'
import  CSBarContent from './CSBarContent.jsx'
import  CSBarSlider from './CSBarSlider.jsx'

const marginDivideWidth = 1.5; //柱间间距与柱宽的比例
const defaultLength = 8; //默认展示柱图数量
const barHeightPercentage = 0.7; //柱状图最大高度占比
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css'


/**
 * 彩色堆叠柱状图
 * 可接受参数(props传入)：
 * @param tabRequire:boolean类型,是否需要图例
 * @param slideBarRequire:boolean类型,是否需要底部滑动条
 * @param data:object类型，要展示的数据，见container中fakeData
 *      data.data:Array类型 每一个元素为{name:xxx,value:[]}，表示一根柱状堆叠图的数据
 *      data.names: Array类型 每一个元素对应data.data.value中的元素，表示类别名称
 *      data.colors:Array类型，每一个元素对应data.data.value中的元素，表示类别展示的颜色
 *
 * @param minCount:number类型，最小展示的柱状图数量
 * */
export default class ColorfulStackBar extends Component{

    constructor(props){
        super(props);
        let dataLength = this.props.option.data.length;//数据条数
        let defaultSliderWidth=0; //默认的滚动条已经滚动的长度比例

        //初始滑动条位置
        if(dataLength<=defaultLength){
            defaultSliderWidth=100; //百分比
        }else{
            defaultSliderWidth = Math.round(defaultLength/dataLength*100);
        }

        let minRange =
            this.props.minCount?
                Math.ceil(this.props.minCount/dataLength*100)
                :0;

        let maxValue=0;

        //求得当前数组中的最大值
        for(let item of this.props.option.data){
            let sum = item.value.reduce((pre,cur)=>{return pre+cur});
            if(sum>maxValue) maxValue=sum;
        }

        let handledData = this.handleData(this.props.option.data);

        let chosenType=this.props.option.names.map((item,index)=>true);

        this.state = {
            sliderStart:0,   //滑动条起始位置比例
            sliderWidth:defaultSliderWidth,    //选中滑动条的长度比例
            handledData,
            minRange,
            chosenType, //当前被选中展示的类别的下标
            maxValue:maxValue
        }
    }

    /**
     * 数据变化则更新handledData
     * 未做严格的对比判断，只考虑data未在初始时传入的情况
     * */
    componentWillReceiveProps(newProps){
        if(newProps.option.data.length!==this.props.option.data.length){
            this.setState({
                handledData:this.handleData(newProps.option.data)
            });
        }
    }

    componentDidMount(){
        //第一次渲染出和resize的时候刷新容器宽高
        this.refreshContainer();
        $(window).resize(()=> {
            this.refreshContainer();
        });
    }

    componentDidUpdate(){
        //this.refreshContainer();
    }

    /**
     * 刷新容器宽高
     * */
    refreshContainer=()=>{
        let outsideDiv = this.refs.outsideDiv;
        if(outsideDiv){
            let outWidth = outsideDiv.clientWidth,
                outHeight = outsideDiv.clientHeight*barHeightPercentage;

            //防止DidMount时外部容器无宽高
            if(outWidth && outHeight && (outHeight!=this.state.outHeight||outWidth!==this.state.outWidth)){
                this.setState({
                    outWidth,
                    outHeight
                });
            }
        }
    }

    /**
     * 为了更方便展示，处理一下参数的data数据
     * 加上相邻柱变化百分比
     * */
    handleData=(data)=>{
        return data.map((item,index)=>{
            let temp = item.value.map((il,indexIl)=>{
                let varyPercentage = (index>0?jtools.percentageNumber(il/data[index-1].value[indexIl]-1,1):""); //相对于上一个数据的变化率
                return{
                    value:il,
                    varyPercentage
                }
            })
            return{
                name:item.name,
                value:temp
            }
        });
    }

    /**
     * 根据当前的滑动条位置和长度获取当前显示的数据
     * */
    getShowData(){
        let dataLength = this.props.option.data.length;
        let {sliderStart,sliderWidth,chosenType} = this.state;

        let start = Math.round(sliderStart*dataLength/100);
        let showDatalength = Math.round(sliderWidth*dataLength/100);

        let handledData = this.getChosenTypeData(this.state.handledData.slice(start,showDatalength+start),chosenType);//数据

        let colors = ColorfulStackBar.getChosenTypeColors(this.props.option.colors,chosenType);//颜色

        let names = this.props.option.names.slice(start,showDatalength);

        let barWidth = 1/((marginDivideWidth+1)*showDatalength-marginDivideWidth+1);  //柱状图单柱宽度公式，两边各多半个单柱状图宽度的空白

        let floorBarWidth = Math.floor(barWidth*100)/100; //转换为整数百分比,向下取整以免超出

        let barMarginRight = jtools.percentageNumber(marginDivideWidth*floorBarWidth,1);

        barWidth = jtools.percentageNumber(floorBarWidth,1);

        return {
            handledData,
            names,
            colors,
            barMarginRight,
            barWidth
        };
    }

    /**
     * 获取选中的类别的数据
     * */
    getChosenTypeData(data,chosenType){
        let tempData = jtools.clone(data);
        return tempData.map((item,index)=>{
            let temp = [];
            for(let il in chosenType){
               chosenType[il] && temp.push(item.value[il])
            }
            item.value =temp;
            return item;
        })
    }

    /**
     * 获取选中的类别的颜色
     * */
    static getChosenTypeColors(colors,chosenType){
        let tempData = [];
        for(let il in chosenType){
            chosenType[il] && tempData.push(colors[il])
        }
        return tempData;
    }

    changeChosenType(index){
        let temp = jtools.clone(this.state.chosenType);
        temp[index]=!temp[index];
        this.setState({
            chosenType:temp
        });
    }

    sliderChange(value){
        this.setState({
            sliderStart:value[0],
            sliderWidth:value[1]-value[0]
        })
    }

    render(){
        const {sliderStart,sliderWidth,minRange} = this.state;
        return(
            <div style={{height:"100%"}} ref="outsideDiv">
                {(this.props.tabRequire && this.props.option.names)?
                    <div className="CSBar_tab" style={{height:"15%"}}>
                        <CSBarTab names={this.props.option.names}
                                  colors={this.props.option.colors}
                                  chosenType={this.state.chosenType}
                                  changeChosenType={this.changeChosenType.bind(this)}/>
                    </div>:""
                }

                <div className="CSBar_content" style={{height:jtools.percentageNumber(barHeightPercentage)}}>
                    <CSBarContent {...this.getShowData()}
                        maxValue={this.state.maxValue}
                        outWidth={this.state.outWidth}
                        outHeight={this.state.outHeight}
                        marginDivideWidth={marginDivideWidth}/>
                </div>

                {this.props.slideBarRequire?
                   <div style={{height:"15%"}}>
                       <Range allowCross={false} defaultValue={[sliderStart, sliderStart+sliderWidth]} pushable={minRange} onChange={this.sliderChange.bind(this)}/>
                   </div>:
                    ""
                }
            </div>
        )
    }
}
