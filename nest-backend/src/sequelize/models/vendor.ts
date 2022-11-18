import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'vendor' })
export class Vendor extends Model {
  @Column(DataType.STRING)
  vendorCode: string

  @Column(DataType.STRING)
  vendorName: string

  @Column(DataType.STRING)
  vendorOtherName: any

  @Column(DataType.STRING)
  type: string

  @Column(DataType.STRING)
  email: string

  @Column(DataType.STRING)
  phone: string

  @Column(DataType.STRING)
  fax: string

  @Column(DataType.STRING)
  address: string

  @Column(DataType.STRING)
  contactPerson: string

  @Column(DataType.TEXT)
  remark: string

  @Column(DataType.STRING)
  flexData: any

  @Column(DataType.INTEGER)
  status: number

  limit: number
  page: number
  active: number
}
