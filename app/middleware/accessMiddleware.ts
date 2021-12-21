/*
 * @Autor: Cool
 * @Version: 2.0
 * @Date: 2021-11-05 09:52:56
 * @LastEditTime: 2021-11-05 09:57:25
 * @Description:
 * @LastEditors: Cool
 */

import { Context, Next } from 'koa'
import { accessLogger } from '../logger'

const accessMiddleware = (ctx: Context, next: Next) => {
  const logStr = `path: ${ctx.path} | method: ${ctx.method} | msg: ${ctx.message}`
  accessLogger.info(logStr)
  return next()
}

export default accessMiddleware
