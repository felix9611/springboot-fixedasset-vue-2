import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'vendor' })
export class Vendor extends Model {
  @ApiProperty({
    example: 1,
    description: 'The id PK number'
  })
  id: number
  
  @ApiProperty({
    example: 'Test',
    description: "Vendor's  Code"
  })
  @Column(DataType.STRING)
  vendorCode: string

  @ApiProperty({
    example: 'Test LTD',
    description: "Vendor's  Name"
  })
  @Column(DataType.STRING)
  vendorName: string

  @ApiProperty({
    example: 'TEST',
    description: "Vendor's Other Name",
    required: false
  })
  @Column(DataType.STRING)
  vendorOtherName: any

  @ApiProperty({
    example: 'TEST',
    description: "Vendor's Type"
  })
  @Column(DataType.STRING)
  type: string

  @ApiProperty({
    example: 'aa@abc.com',
    description: "Vendor's Contact Email Addres"
  })
  @Column(DataType.STRING)
  email: string

  @ApiProperty({
    example: '67891258',
    description: "Vendor's Contact Phone Number"
  })
  @Column(DataType.STRING)
  phone: string

  @ApiProperty({
    example: '',
    description: 'Fax Number',
    required: false
  })
  @Column(DataType.STRING)
  fax: string

  @ApiProperty({
    example: 'Kowloon, HK',
    description: "Vendor's Address"
  })
  @Column(DataType.STRING)
  address: string

  @ApiProperty({
    example: '',
    description: "Vendor's Contact Person"
  })
  @Column(DataType.STRING)
  contactPerson: string

  @ApiProperty({
    example: '',
    description: 'Remark',
    required: false
  })
  @Column(DataType.TEXT)
  remark: string

  @ApiProperty({
    example: {},
    description: 'Addon Data',
    required: false
  })
  @Column(DataType.STRING)
  flexData: any

  @ApiProperty({
    example: 1,
    description: 'This will default 0 (Void) or 1 (Active)',
    required: false
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
  active: number
}
