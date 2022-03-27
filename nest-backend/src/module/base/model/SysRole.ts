import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Default } from 'sequelize-typescript'

@Table({ tableName: 'sys_role' })
export class SysRole extends Model {
  @Column(DataType.STRING)
  roleName: string

  @Column(DataType.STRING)
  roleCode: string

  @Column(DataType.TEXT)
  remark: string

  @Column(DataType.INTEGER)
  status: number
}