/*
 * @Autor: Cool
 * @Version: 2.0
 * @Date: 2021-11-05 14:44:49
 * @LastEditTime: 2021-11-09 11:46:00
 * @Description:
 * @LastEditors: Cool
 */

import { Column, Model, Table } from 'sequelize-typescript'

@Table
export default class Admin extends Model {
  @Column
  name!: string
  @Column
  age!: number
}
