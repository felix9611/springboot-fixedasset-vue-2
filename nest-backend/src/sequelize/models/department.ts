import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'department' })
export class Department extends Model {
  @Column(DataType.STRING)
  deptCode: string

  @Column(DataType.STRING)
  deptName: string

  @Column(DataType.TEXT)
  remark: string

  @Column(DataType.STRING)
  flexData: any

  @Column(DataType.INTEGER)
  status: number

  limit: number
  page: number
  active: number
}
