import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'login_record' })
export class LoginRecord extends Model {
  @ApiProperty({
    example: 1,
    description: 'The id PK number'
  })
  id: number

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
