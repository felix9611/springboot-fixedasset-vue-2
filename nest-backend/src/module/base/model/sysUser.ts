import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Default } from 'sequelize-typescript'

@Table({ tableName: 'sys_user' })
export class SysUser extends Model<SysUser> {
  @Column(DataType.STRING)
  username: string

  @Column(DataType.STRING)
  password: string

  @Column(DataType.STRING)
  avatar: string

  @Column(DataType.BLOB)
  avatarBase64: string

  @Column(DataType.STRING)
  email: string

  @Column(DataType.STRING)
  city: string

  @Column(DataType.INTEGER)
  deptId: number

  @Column(DataType.DATE)
  lastLogin: string

  @Column(DataType.INTEGER)
  status: number
}