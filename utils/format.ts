/*
 * @Autor: Cool
 * @Version: 2.0
 * @Date: 2021-11-08 17:43:50
 * @LastEditTime: 2021-11-08 18:06:24
 * @Description:
 * @LastEditors: Cool
 */

const formatter = (v: number): string => {
  return v < 10 ? `0${v}` : `${v}`
}

const format = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatter).join('')
}

const randomStr = (length: number): string => {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomStr = ''
  for (let index = 0; index < length; index++) {
    randomStr += str.charAt(Math.floor(Math.random() * str.length))
  }
  return randomStr
}

export { format, randomStr }
