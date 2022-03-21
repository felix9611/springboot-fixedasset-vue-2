import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Default } from 'sequelize-typescript'

@Table({ tableName: 'department' })
export class Department extends Model {
  @Column(DataType.STRING(100))
  deptCode: string

  @Column(DataType.STRING)
  deptName: string

  @Column(DataType.JSON)
  deptOtherName: any

  @Column(DataType.TEXT)
  remark: string

  @Column(DataType.INTEGER)
  status: number
}
