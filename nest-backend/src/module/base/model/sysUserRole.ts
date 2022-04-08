import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Default } from 'sequelize-typescript'

@Table({ tableName: 'sys_user_role' })
export class SysUserRole extends Model<SysUserRole>{
  @Column(DataType.INTEGER)
  userId: number

  @Column(DataType.INTEGER)
  roleId: number
}