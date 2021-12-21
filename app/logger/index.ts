/*
 * @Autor: Cool
 * @Version: 2.0
 * @Date: 2021-11-05 09:31:11
 * @LastEditTime: 2021-11-05 16:16:40
 * @Description: 日志
 * @LastEditors: Cool
 */
import { configure, getLogger } from 'log4js'
import config from '../config'

configure(config.log)

export const accessLogger = getLogger('access')

export const dbLogger = getLogger('db')

export default getLogger()
