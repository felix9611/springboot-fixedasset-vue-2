import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'code_type' })
export class CodeType extends Model {

  @Column(DataType.STRING)
  type: string

  @Column(DataType.STRING)
  valueCode: string

  @Column(DataType.STRING)
  valueName: string

  @Column(DataType.INTEGER)
  status: number

  limit: number
  page: number
}
