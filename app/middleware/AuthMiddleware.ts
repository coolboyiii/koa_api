/*
 * @Autor: Cool
 * @Version: 2.0
 * @Date: 2021-11-08 10:45:46
 * @LastEditTime: 2021-11-08 10:59:41
 * @Description:
 * @LastEditors: Cool
 */

import { Context, Next } from 'koa'
import { verify } from '../../utils/auth'

const AuthMiddleware = (ctx: Context, next: Next) => {
  const token = ctx.headers['authorization']
  if (token !== undefined && token !== '') {
    const { error } = verify(token)
    if (error !== null) {
      ctx.body = {
        message: error,
        code: 4000
      }
      return
    } else {
      return next()
    }
  }

  ctx.body = {
    message: 'token 不存在',
    code: 4001
  }

  return
}

export default AuthMiddleware
