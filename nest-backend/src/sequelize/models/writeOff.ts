import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'write_off' })
export class WriteOff extends Model {
  @ApiProperty({
    example: 1,
    description: 'The Asset id PK number'
  })
  @Column(DataType.INTEGER)
  assetId: number

  @ApiProperty({
    example: 1,
    description: 'The Asset last place on the place id PK number'
  })
  @Column(DataType.STRING)
  lastPlaceId: number

  @ApiProperty({
    example: 'Finish Testing',
    description: 'The Asset write off reason'
  })
  @Column(DataType.STRING)
  reason: string

  @ApiProperty({
    description: 'The Asset write off date stamp'
  })
  @Column(DataType.DATE)
  lastDay: Date

  limit: number
  page: number
}
