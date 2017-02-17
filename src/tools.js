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