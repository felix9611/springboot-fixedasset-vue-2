import { ApiProperty } from '@nestjs/swagger'
import { AssetType } from 'src/sequelize/models/assetType'
import { Location } from 'src/sequelize/models/location'
import { AssetList } from 'src/sequelize/models/assetList'

export class listAssetType {
  @ApiProperty({
    type: AssetType,
    isArray: true,
    description: 'Listing Data'
  })
  rows: any

  @ApiProperty({
    example: 20,
    description: 'Count all record'
  })
  @ApiProperty()
  count: number
}

export class listLocation {
  @ApiProperty({
    type: Location,
    isArray: true,
    description: 'Listing Data'
  })
  rows: any

  @ApiProperty({
    example: 20,
    description: 'Count all record'
  })
  @ApiProperty()
  count: number
}

export class AssetLists {
  @ApiProperty({
    isArray: true,
    type: AssetList,
    description: 'Listing Data'
  })
  rows: AssetList

  @ApiProperty({
    example: 20,
    description: 'Count all record'
  })
  @ApiProperty()
  count: number
}