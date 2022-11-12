import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'sys_user_role' })
export class SysUserRole extends Model{
  @Column(DataType.STRING)
  userId: string

  @Column(DataType.INTEGER)
  roleId: string
}