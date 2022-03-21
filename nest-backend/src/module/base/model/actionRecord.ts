import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Default } from 'sequelize-typescript'

@Table({ tableName: 'action_record' })
export class ActionRecord extends Model {
  @Column(DataType.STRING(200))
  actionCode: string

  @Column(DataType.STRING)
  actionName: string

  @Column(DataType.STRING)
  actionFrom: string

  @Column(DataType.JSON)
  actionData: any

  @Column(DataType.STRING)
  actionSuccess: string
}