/**
 * Created by Toulon on 2017/2/16.
 *
 * Author information:
 * Email:420615326@qq.com
 * file information(文件功能):
 */

/**
 * 计算百分比
 * */
export const percentageNumber = (num)=> {
    // 小数点后两位百分比
    return Math.round(num * 10000 / 100.00) + "%";
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