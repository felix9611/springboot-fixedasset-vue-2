import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'stocktake' })
export class StockTake extends Model {
  @ApiProperty({
    example: 1,
    description: 'The id PK number'
  })
  id: number

  @Column(DataType.STRING)
  actionName: string

  @Column(DataType.INTEGER)
  actionPlace: number

  @ApiProperty({
    description: 'The end datetime for stock take',
    required: false
  })
  @Column(DataType.DATE)
  finishTime: Date

  @ApiProperty({
    example: 1,
    description: 'This will default 0 (Void) or 1 (Active)'
   })
  @Column(DataType.INTEGER)
  status: number

  @ApiProperty({
    description: 'This will auto save',
    required: false
  })
  updatedAt: Date

  @ApiProperty({
    description: 'This will auto save',
    required: false
  })
  createdAt: Date

  limit: number
  page: number
}
