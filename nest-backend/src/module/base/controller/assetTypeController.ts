import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common'
import { AssetTypeTabeService } from 'src/module/base/service/assetTypeTable'
import { AssetType } from 'src/module/base/model/assetType'
import { queryFindAssetType } from 'src/module/base/dto/queryFindList'

@Controller('base/asset-type')
export class AssetTypeContoller {
  constructor(
    private assetTypeTabeService: AssetTypeTabeService,
  ) {}

  @Get('findAll')
  async findAll() {
    return await this.assetTypeTabeService.findAll()
  }
  
  @Post('save')
  async save(@Body() assetType: AssetType) {
    return await this.assetTypeTabeService.save(assetType)
  }

  @Put('update')
  async updateData(@Body() assetType: AssetType) {
    return await this.assetTypeTabeService.save(assetType)
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.assetTypeTabeService.getOne(id)
  }

  @Delete(':id')
  async voidData(@Param('id') id: number) {
    return await this.assetTypeTabeService.voidData(id)
  }

  @Post('list')
  async findAllList(query: queryFindAssetType) {
    return await this.assetTypeTabeService.findAllList(query)
  }
}