import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'sys_role' })
export class SysRole extends Model {
  @Column(DataType.STRING)
  code: string

  @Column(DataType.STRING)
  name: string

  @Column(DataType.JSON)
  pages: any

  @Column(DataType.TEXT)
  remark: string

  @Column(DataType.INTEGER)
  status: number

  limit: number
  page: number
  dataValue: any
}