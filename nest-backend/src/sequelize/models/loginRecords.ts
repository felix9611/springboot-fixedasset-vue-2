import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'login_record' })
export class LoginRecord extends Model {

  @Column(DataType.STRING)
  username: string

  @Column(DataType.STRING)
  ipAddress: string

  @Column(DataType.STRING)
  ipLocation: string

  @Column(DataType.DATE)
  loginTime: string

  @Column(DataType.STRING)
  loginStatus: string
}
