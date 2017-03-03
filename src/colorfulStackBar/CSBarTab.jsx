/**
 * Created by dlb233 on 2017/1/5.
 *
 * Copyright (c) 2017-present dlb233 Inc.
 *
 * Author infomation:
 * Email:420615326@qq.com
 * file infomation(文件功能):堆叠柱状图的图例
 */

import React, { Component, PropTypes } from 'react'

export default class CSBarTab extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    toggleTypeSelect=(value)=>{
        if(typeof this.props.changeChosenType ==="function"){
            this.props.changeChosenType(Number.parseInt(value));
        }
    }

    render(){
        let {names,colors,chosenType} = this.props;
        return(
            <div>
                <ul style={{position:"absolute",right:"100px"}}>
                    {names.map((item,index)=>{
                        let indexDepart = item.indexOf("(");
                        let mainTitle=item,
                            subTitle=""; //主副标题
                        if(indexDepart>=0){
                            mainTitle = item.substring(0,indexDepart);
                            subTitle = item.substring(indexDepart);
                        }
                        return(
                            <li style={{
                                display:"inline-block",
                                position:"relative",
                                color:"#8c6679",
                                marginRight:"15px"
                                }}
                                key={`csBar_tab_${index}`}
                                >
                                <span
                                    style={{
                                    display:"inline-block",
                                    width:"13px",
                                    height:"13px",
                                    border:"1px solid #8c6679",
                                    backgroundColor:chosenType[index]?colors[index]:"#fff"}}
                                    data-value={index}
                                    onClick={(e)=>{this.toggleTypeSelect(e.target.getAttribute("data-value"))}}
                                    >
                                </span>
                                <span
                                    style={{
                                    display:"inline-block",
                                    lineHeight:"15px",
                                    marginLeft:"2px"
                                }}>
                                    {mainTitle}
                                </span>
                                <span
                                    style={{
                                    position:"relative",
                                    left:"15px",
                                    display:"block"}}>
                                    {subTitle}
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

}