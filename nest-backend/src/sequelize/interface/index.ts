import { ApiProperty } from '@nestjs/swagger'
import { ModelCtor } from 'sequelize'
import { AssetList } from 'src/sequelize/models/assetList'

export interface Roles{
  roles: any[]
}

export interface ModelMapping {
  [modelName: string]: ModelCtor<any>
}

export class AssetFileImport {
  @ApiProperty({
    example: 1,
    description: 'The Asset id PK number'
  })
  assetId: number

  @ApiProperty({
    example: [],
    description: 'The Asset image file listing'
  })
  fileList: fileLists[]
}

export class fileLists {
  @ApiProperty({
    example: 'Agedgs656ad5fs6===',
    description: 'The image trans to base64 content'
  })
  dataBase64: string

  @ApiProperty({
    example: 'test.png',
    description: 'The image file name'
  })
  fileName: string
}

export class invrecordList {
  limit: number
  page: number
  createdFrom: string
  createdTo: string
}

export class AssetLists {
  @ApiProperty()
  rows: AssetList[]

  @ApiProperty()
  count: number
}

export class FindAssetListAll {
  @ApiProperty({
    example: 1,
    description: 'The asset status number'
  })
  status: number
}

export class FindAssetList {
  @ApiProperty({
    example: 1,
    description: 'The page of listing'
  })
  page: number

  @ApiProperty({
    example: 10,
    description: 'The page items limit of listing'
  })
  limit: number

  @ApiProperty({
    example: '000001',
    description: 'The Asset code',
    required: false
  })
  assetCode: string

  @ApiProperty({
    example: 'ABC',
    description: 'The Asset name',
    required: false
  })
  assetName: string

  @ApiProperty({
    example: 1,
    description: 'The Asset type id number',
    required: false
  })
  typeId: number

  @ApiProperty({
    example: 1,
    description: 'The asset store on where the place id number',
    required: false
  })
  placeId: number

  @ApiProperty({
    example: 1,
    description: 'The asset by which the department id number',
    required: false
  })
  deptId: number

  @ApiProperty({
    example: '2022-12-10 11:20',
    description: 'This asset buy at the date and time',
    required: false
  })
  buyDate: string
}
