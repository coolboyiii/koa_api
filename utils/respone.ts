/*
 * @Autor: Cool
 * @Version: 2.0
 * @Date: 2021-11-05 18:43:17
 * @LastEditTime: 2021-11-09 11:19:42
 * @Description:
 * @LastEditors: Cool
 */

import { Context } from 'koa'

/**
 * @description
 * @author Cool
 * @date 2021-11-08 11:12:15
 * @param {Context} ctx 上下文对象
 * @param {*} [data={}] 返回数据
 * @param {number} [code=0] 状态码
 * @param {boolean} [success=true] 成功信息
 * @param {string} [message='成功'] 提示消息
 */
const Success = (
  ctx: Context,
  data: any = {},
  message: string = '成功',
  code: number = 0,
  success: boolean = true
): void => {
  ctx.body = {
    code,
    data,
    message,
    success
  }
}

/**
 * @description
 * @author Cool
 * @date 2021-11-08 10:40:07
 * @param {Context} ctx 上下文对象
 * @param {*} [data={}] 返回数据
 * @param {number} [code=1] 状态码
 * @param {boolean} [success=false] 失败信息
 * @param {string} [message='失败'] 提示消息
 */
const Error = (
  ctx: Context,
  message: string = '失败',
  data: any = {},
  code: number = 1,
  success: boolean = false
): void => {
  ctx.body = {
    code,
    data,
    message,
    success
  }
}

export { Success, Error }
