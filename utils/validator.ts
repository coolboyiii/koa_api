/*
 * @Autor: Cool
 * @Version: 2.0
 * @Date: 2021-11-09 09:56:09
 * @LastEditTime: 2021-11-09 15:28:16
 * @Description:
 * @LastEditors: Cool
 */

import Validator, { Rules, Values } from 'async-validator'
import { Context } from 'koa'

async function validator<T extends Values>(
  ctx: Context,
  rules: Rules
): Promise<{ data: T; error: any | null }> {
  const validators = new Validator(rules)
  let data = {}
  switch (ctx.method) {
    case 'GET':
      data = getPramars(ctx)
      break

    case 'POST':
      data = getFormData(ctx)
      break

    case 'DELETE':
      break

    case 'PUT':
      data = getFormData(ctx)
      break

    default:
      break
  }
  return await validators
    .validate(data)
    .then(() => {
      return {
        data: data as T,
        error: null
      }
    })
    .catch(({ errors }) => {
      return {
        data: {} as T,
        error: errors[0].message
      }
    })
}

const getFormData = (ctx: Context) => {
  return ctx.request.body
}

const getPramars = (ctx: Context) => {
  return ctx.query
}

export default validator
