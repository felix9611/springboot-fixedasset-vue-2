import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export class Test extends Model {
  @Column(DataType.STRING)
  code: string

  @Column(DataType.STRING)
  testOne: string

  @Column(DataType.BIGINT)
  testTwo: number

  @Column(DataType.JSON)
  testJson: number

  @Column(DataType.INTEGER)
  status: number
}
