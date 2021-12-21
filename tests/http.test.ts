/*
 * @Autor: Cool
 * @Version: 2.0
 * @Date: 2021-11-04 18:09:12
 * @LastEditTime: 2021-11-05 19:20:45
 * @Description:
 * @LastEditors: Cool
 */

import { Server } from 'http'
import run from '../app'
import request from 'supertest'
describe('http test', () => {
  let server: Server
  beforeAll(() => {
    server = run(89)
  })

  it('Get /admin', () => {
    return request(server).get('/admin').expect(200)
  })

  it('Get /login', () => {
    return request(server).get('/admin/login').expect(200)
  })

  afterAll(() => {
    server.close()
  })
})
