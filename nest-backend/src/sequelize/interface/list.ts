import { ApiProperty } from '@nestjs/swagger'
import { AssetType } from 'src/sequelize/models/assetType'
import { Location } from 'src/sequelize/models/location'

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
