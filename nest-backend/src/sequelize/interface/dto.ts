
import { ApiProperty } from '@nestjs/swagger'

export class LocationCreatedDto {
  @ApiProperty({
    example: 'MY',
    description: 'The Location Code'
  })
  placeCode: string

  @ApiProperty({
    example: 'My Room',
    description: 'The Location Name'
  })
  placeName: string

  @ApiProperty({
    example: '',
    description: 'Remark',
    required: false
  })
  remark: string
}

export class CodeTypeCreatedDto {
  @ApiProperty({
    example: 'Test',
    description: 'The type for category'
  })
  type: string

  @ApiProperty({
    example: 'TestD',
    description: 'The value code'
  })
  valueCode: string

  @ApiProperty({
    example: 'Test Da',
    description: 'The value name'
  })
  valueName: string
}

export class CodeTypeFindDto {
  @ApiProperty({
    example: 'Test',
    description: 'The type for category',
    required: false
  })
  type: string

  @ApiProperty({
    example: 'TestD',
    description: 'The value code',
    required: false
  })
  valueCode: string

  @ApiProperty({
    example: 'Test Da',
    description: 'The value name',
    required: false
  })
  valueName: string

  @ApiProperty({
    example: 10,
    description: 'The page of listing'
  })
  limit: number

  @ApiProperty({
    example: 1,
    description: 'The page items limit of listing'
  })
  page: number
}

export class CodeTypeFindByTypeDto {
  @ApiProperty({
    example: 'Test',
    description: 'The type for category',
    required: false
  })
  type: string
}

export class AssetTypeCreateDTO {
  @ApiProperty({
    example: 'Test',
    description: 'The asset type code',
  })
  typeCode: string

  @ApiProperty({
    example: 'Testing',
    description: 'The asset type name',
  })
  typeName: string

  @ApiProperty({
    example: {},
    description: 'The asset type other name by json',
    required: false
  })
  typeOtherName: any

  @ApiProperty({
    example: 'Testing',
    description: 'The asset type other remark',
    required: false
  })
  remark: string
}

export class AssetTypeFindDTO {
  @ApiProperty({
    example: 'Test',
    description: 'The asset type code',
  })
  typeCode: string

  @ApiProperty({
    example: 'Testing',
    description: 'The asset type name',
  })
  typeName: string

  @ApiProperty({
    example: 10,
    description: 'The page of listing'
  })
  limit: number

  @ApiProperty({
    example: 1,
    description: 'The page items limit of listing'
  })
  page: number
}

export class VendorFindDTO {
  @ApiProperty({
    example: 'Test',
    description: "Vendor's  Code"
  })
  vendorCode: string

  @ApiProperty({
    example: 'Test LTD',
    description: "Vendor's  Name"
  })
  vendorName: string

  @ApiProperty({
    example: 10,
    description: 'The page of listing'
  })
  limit: number

  @ApiProperty({
    example: 1,
    description: 'The page items limit of listing'
  })
  page: number
}

export class vendorCreateDTO {
  @ApiProperty({
    example: 'Test',
    description: "Vendor's  Code"
  })
  vendorCode: string

  @ApiProperty({
    example: 'Test LTD',
    description: "Vendor's  Name"
  })
  vendorName: string

  @ApiProperty({
    example: 'TEST',
    description: "Vendor's Other Name",
    required: false
  })
  vendorOtherName: any

  @ApiProperty({
    example: 'TEST',
    description: "Vendor's Type"
  })
  type: string

  @ApiProperty({
    example: 'aa@abc.com',
    description: "Vendor's Contact Email Addres"
  })
  email: string

  @ApiProperty({
    example: '67891258',
    description: "Vendor's Contact Phone Number"
  })
  phone: string

  @ApiProperty({
    example: '',
    description: 'Fax Number',
    required: false
  })
  fax: string

  @ApiProperty({
    example: 'Kowloon, HK',
    description: "Vendor's Address"
  })
  address: string

  @ApiProperty({
    example: '',
    description: "Vendor's Contact Person"
  })
  contactPerson: string

  @ApiProperty({
    example: '',
    description: 'Remark',
    required: false
  })
  remark: string

  @ApiProperty({
    example: {},
    description: 'Addon Data',
    required: false
  })
  flexData: any
}

export class departmentCreateDTO {
  @ApiProperty({
    example: 'Test',
    description: 'The department code'
  })
  deptCode: string

  @ApiProperty({
    example: 'Test',
    description: 'The department name'
  })
  deptName: string

  @ApiProperty({
    example: '',
    description: 'Remark',
    required: false
  })
  remark: string

}

export class departmentFindDTO {
  @ApiProperty({
    example: 'Test',
    description: 'The department code'
  })
  deptCode: string

  @ApiProperty({
    example: 'Test',
    description: 'The department name'
  })
  deptName: string

  @ApiProperty({
    example: 10,
    description: 'The page of listing'
  })
  limit: number

  @ApiProperty({
    example: 1,
    description: 'The page items limit of listing'
  })
  page: number
}

export class AssetListCreateDTO {
  @ApiProperty({
    example: 'ABC',
    description: 'The Asset name'
  })
  assetName: string

  @ApiProperty({
    example: 1,
    description: 'The Asset type id number'
  })
  typeId: number

  @ApiProperty({
    example: 'Box',
    description: 'This asset item how to unit term'
  })
  unit: string

  @ApiProperty({
    example: '2022-12-11T01:49:14.286Z',
    description: 'This asset buy at the date and time',
    required: false
  })
  buyDate: string

  @ApiProperty({
    example: 'This is for test',
    description: 'This asset detail',
    required: false
  })
  description: string

  @ApiProperty({
    example: 0,
    description: 'This sponsor type number'
  })
  sponsor: number

  @ApiProperty({
    example: 'Tom',
    description: 'This sponsor name',
    required: false
  })
  sponsorName: string

  @ApiProperty({
    example: '300',
    description: 'This asset buy cost',
    required: false
  })
  cost: string

  @ApiProperty({
    example: '17516987',
    description: 'This asset Serial Number'
  })
  serialNumber: string

  @ApiProperty({
    example: 'T00001',
    description: 'Buy Invoice Sheet Number',
    required: false
  })
  invoiceNo: string

  @ApiProperty({
    example: '2022-12-11T01:49:14.286Z',
    description: 'Buy Invoice Sheet Iussed Date and time',
    required: false
  })
  invoiceDate: string

  @ApiProperty({
    example: 5,
    description: 'The asset store on where the place id number'
  })
  placeId: number

  @ApiProperty({
    example: 1,
    description: 'The asset by which the department id number'
  })
  deptId: number

  @ApiProperty({
    example: 'A001',
    description: 'The operation staff UUID',
    required: false
   })
  staffId: String

  @ApiProperty({
    example: 2,
    description: 'The asset vendor code',
    required: false
  })
  vendorId: number

  @ApiProperty({
    example: 'Testing',
    description: 'The asset other information remark',
    required: false
  })
  remark: string

  @ApiProperty({
    example: {},
    description: 'The asset other information by json or array',
    required: false
  })
  flexData: any
}
