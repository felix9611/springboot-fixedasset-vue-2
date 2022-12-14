
import { ApiProperty } from '@nestjs/swagger'

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
