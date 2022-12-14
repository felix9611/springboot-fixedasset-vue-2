import { ApiProperty } from '@nestjs/swagger'
export class ImportAsset {
  @ApiProperty({ example: 'ABC', description: 'The Asset name' })
  assetName: string

  @ApiProperty({ example: 'A', description: 'The Asset type code' })
  typeCode: string

  @ApiProperty({ example: 'TypeA', description: 'The Asset type name' })
  typeName: string

  @ApiProperty({ example: 'Box', description: 'This asset item how to unit term' })
  unit: string

  @ApiProperty({ example: '2022-10-28 11:30', description: 'This asset buy at the date and time', required: false })
  buyDate: string

  @ApiProperty({ example: 'This is for test', description: 'This asset detail', required: false })
  description: string

  @ApiProperty({ example: '350', description: 'This asset buy cost', required: false })
  cost: string

  @ApiProperty({ example: '17516987', description: 'This asset Serial Number' })
  serialNum: string

  @ApiProperty({ example: 'AA00001', description: 'Buy Invoice Sheet Number', required: false })
  invoiceNo: string

  @ApiProperty({ example: '2022-10-28 11:30', description: 'Buy Invoice Sheet Iussed Date and time', required: false })
  invoiceDate: string

  @ApiProperty({ example: 'A', description: 'The asset by which the department code' })
  deptCode: string

  @ApiProperty({ example: 'A Department', description: 'The asset by which the department name' })
  deptName: string

  @ApiProperty({ example: 'AB', description: 'The asset store on where the place code' })
  placeCode: string

  @ApiProperty({ example: 'AB Room', description: 'The asset store on where the place name' })
  placeName: string

  @ApiProperty({ example: 'CBA', description: 'The asset vendor code', required: false })
  vendorCode: string

  @ApiProperty({ example: 'CBA Ltd', description: 'The asset vendor name', required: false })
  vendorName: string

  @ApiProperty({ example: 'Testing', description: 'The asset other information remark', required: false })
  remark: string
}
