/*
 * @Autor: Cool
 * @Version: 2.0
 * @Date: 2021-11-04 17:43:15
 * @LastEditTime: 2021-11-09 09:37:50
 * @Description:
 * @LastEditors: Cool
 */

import dotenv from 'dotenv'
dotenv.config()
import db from './db'
db()
import Koa from 'koa'
import koaBody from 'koa-body'
import KoaStatic from 'koa-static'
import router from './routes'
import { Server } from 'http'
import accessMiddleware from './middleware/accessMiddleware'
import path from 'path'

const app = new Koa()

app
  .use(
    koaBody({
      multipart: true,
      formidable: {
        maxFileSize: 200 * 1024 * 1024
      }
    })
  )
  .use(KoaStatic(path.join(__dirname, '..', 'upimages')))
  .use(accessMiddleware)
  .use(router.routes())

const run = (port: number | string | undefined): Server => {
  return app.listen(port)
}

export default run
