/**
 * Created by Toulon on 2017/2/16.
 *
 * Copyright (c) 2017-present dlb233 Inc.
 *
 * Author infomation:
 * Email:420615326@qq.com
 * file infomation(文件功能):
 */

/**
 * 计算百分比
 * @param num 要转换的值
 * @param dot 保留的小数位数
 * */
export const percentageNumber = (num,dot=0)=> {
    dot = Math.pow(10,dot);
    // 小数点后两位百分比

    return Math.round(num * 100*dot)/(dot) + "%";
}

/**
 * 计算角度
 * @param x 所求角的邻直角边长度
 * @param y 所求角的对直角边长度
 * */
export const getAngle = (x, y)=> {
    return {
        angleDeg: 180 / (Math.PI / Math.atan2(y, x)), //人类理解的角度,给transform使用
        angle: Math.atan2(y, x) //计算用角度
    }
}

export const clone = (obj) => {
    return _clone(obj);
}

/**
 * 克隆一个对象
 * @param obj 要克隆的对象
 * @return 克隆好的对象
 * */
const _clone = (obj) => {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0; i < obj.length; ++i) {
            copy[i] = _clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = _clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}