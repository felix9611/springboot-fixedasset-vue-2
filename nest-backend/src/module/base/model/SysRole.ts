import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Default } from 'sequelize-typescript'

@Table({ tableName: 'sys_role' })
export class SysRole extends Model<SysRole> {
  @Column(DataType.STRING)
  name: string

  @Column(DataType.STRING)
  code: string

  @Column(DataType.TEXT)
  remark: string

  @Column(DataType.INTEGER)
  status: number
}