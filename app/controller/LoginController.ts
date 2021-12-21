/*
 * @Autor: Cool
 * @Version: 2.0
 * @Date: 2021-11-05 18:32:05
 * @LastEditTime: 2021-11-08 14:13:42
 * @Description:
 * @LastEditors: Cool
 */

import { Context } from 'koa'
import { sign } from '../../utils/auth'
import { Success, Error } from '../../utils/respone'

class LoginController {
  async index(ctx: Context) {
    const data = {
      token: sign('aaa')
    }
    try {
      Success(ctx, data)
    } catch (error) {
      Error(ctx)
    }
  }
}

export default new LoginController()
