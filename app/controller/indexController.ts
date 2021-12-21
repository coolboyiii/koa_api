/*
 * @Autor: Cool
 * @Version: 2.0
 * @Date: 2021-11-04 17:42:49
 * @LastEditTime: 2021-11-09 16:06:00
 * @Description:
 * @LastEditors: Cool
 */

import { createReadStream, createWriteStream, existsSync, mkdir } from 'fs'
import { Context } from 'koa'
import paths from 'path'
import { Error, Success } from '../../utils/respone'
import AdminService from '../service/AdminService'
import { format, randomStr } from '../../utils/format'
import validator from '../../utils/validator'
import { Rules } from 'async-validator'

class IndexController {
  async index(ctx: Context) {
    const admin = await AdminService.getAdmin()
    ctx.body = admin
  }

  /**
   * @description 用户列表
   * @author Cool
   * @date 2021-11-09 04:05:01
   * @param {Context} ctx
   * @returns {*}
   * @memberof IndexController
   */
  async adminList(ctx: Context) {
    const params = new URLSearchParams(ctx.querystring)
    let page = 1,
      limit = 15
    if (params.get('page') !== null && !isNaN(Number(params.get('page')))) {
      page = Number(params.get('page'))
    }
    if (params.get('limit') !== null && !isNaN(Number(params.get('limit')))) {
      limit = Number(params.get('limit'))
    }
    const data = await AdminService.getAdminList(page, limit)
    return Success(ctx, data)
  }

  /**
   * @description 文件上传
   * @author Cool
   * @date 2021-11-09 04:04:33
   * @param {Context} ctx
   * @returns {*}
   * @memberof IndexController
   */
  async upload(ctx: Context) {
    const file = ctx.request.files?.file
    //@ts-ignore
    if (file && file.name !== '') {
      //@ts-ignore
      const { path, name } = file
      const ext = paths.extname(name)
      const reader = createReadStream(path)
      const mkdirFile = format()
      const filePath = `${mkdirFile}/upload-${randomStr(10)}${ext}`
      const isDir = existsSync(
        `/LXPROJECT/Vite2+Vue3+TypeScript+Element Plus/koa_api/upimages/${mkdirFile}`
      )
      if (!isDir) {
        mkdir(
          `/LXPROJECT/Vite2+Vue3+TypeScript+Element Plus/koa_api/upimages/${mkdirFile}`,
          () => {
            const writer = createWriteStream(`upimages/${filePath}`)
            reader.pipe(writer)
          }
        )
      } else {
        const writer = createWriteStream(`upimages/${filePath}`)
        reader.pipe(writer)
      }
      return Success(ctx, { filePath })
    }
    return Error(ctx, '文件不能为空')
  }

  /**
   * @description 添加用户
   * @author Cool
   * @date 2021-11-09 04:03:22
   * @param {Context} ctx
   * @returns {*}
   * @memberof IndexController
   */
  async userAdd(ctx: Context) {
    interface IAdmin {
      id: number
      name: string
      age: number
    }

    const rules: Rules = {
      name: [
        {
          type: 'string',
          required: true,
          message: '姓名不能为空'
        }
      ],
      age: [
        {
          type: 'string',
          required: true,
          message: '年龄不能为空'
        }
      ]
    }
    const { data, error } = await validator<IAdmin>(ctx, rules)
    if (error !== null) {
      return Error(ctx, error)
    }

    const user = await AdminService.getUserByName(data?.name)
    if (user?.id > 0) {
      return Error(ctx, '用户已存在')
    }
    const row = await AdminService.addUser(data)
    if (row.id > 0) {
      return Success(ctx, {}, '用户添加成功')
    }
    return Error(ctx, '用户添加失败')
  }

  /**
   * @description 修改用户数据
   * @author Cool
   * @date 2021-11-09 04:05:26
   * @param {Context} ctx
   * @returns {*}
   * @memberof IndexController
   */
  async updateUser(ctx: Context) {
    const rules: Rules = {
      name: {
        type: 'string',
        required: true,
        message: '姓名不能为空'
      },
      age: {
        type: 'string',
        required: true,
        message: '年龄不能为空'
      }
    }

    interface IAdmin {
      id: number
      name: string
      age: number
    }

    const { data, error } = await validator<IAdmin>(ctx, rules)
    if (error !== null) {
      return Error(ctx, error)
    }
    const user = await AdminService.getUserById(data.id)
    if (user === null) {
      return Error(ctx, '用户不存在')
    }

    const [number] = await AdminService.updateUser(data, data.id)
    if (number > 0) {
      return Success(ctx)
    }
    return Error(ctx)
  }

  /**
   * @description 删除用户数据
   * @author Cool
   * @date 2021-11-09 04:05:49
   * @param {Context} ctx
   * @returns {*}
   * @memberof IndexController
   */
  async deleteUser(ctx: Context) {
    if (isNaN(Number(ctx.query.id))) {
      return Error(ctx, 'id type is not a number')
    }
    const id = Number(ctx.query.id)
    const user = await AdminService.getUserById(id)
    if (user === null) {
      return Error(ctx, '用户不存在')
    }
    const row = await AdminService.deleteUser(id)
    if (row > 0) {
      return Success(ctx)
    }
    return Error(ctx)
  }

  /**
   * @description 用户明细
   * @author Cool
   * @date 2021-11-09 04:06:06
   * @param {Context} ctx
   * @returns {*}
   * @memberof IndexController
   */
  async getUser(ctx: Context) {
    if (isNaN(Number(ctx.query.id))) {
      return Error(ctx, 'id type is not a number')
    }
    const id = Number(ctx.query.id)
    const user = await AdminService.getUserById(id)
    if (user === null) {
      return Error(ctx, '用户不存在')
    }
    return Success(ctx, user)
  }
}

export default new IndexController()
