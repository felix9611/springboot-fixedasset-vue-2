import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common'
import { AssetTypeTabeService } from 'src/module/base/service/assetTypeTable'
import { AssetType } from 'src/module/base/model/assetType'
import { queryFindDept } from 'src/module/base/dto/queryFindList'

@Controller('base/asset-type')
export class AssetTypeContoller {
  constructor(
    private assetTypeTabeService: AssetTypeTabeService,
  ) {}
  
  @Post('save')
  async save(@Body() assetType: AssetType) {
    return await this.assetTypeTabeService.save(assetType)
  }
}