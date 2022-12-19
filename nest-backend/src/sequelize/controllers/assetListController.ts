import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Delete,
  Put,
  Param,
  Query,
} from '@nestjs/common'
import { AssetListTableService } from 'src/sequelize/service/assetListTableService'
import { AssetList } from 'src/sequelize/models/assetList'
import { AssetListFiles } from 'src/sequelize/models/assetListFiles'
import { WriteOff } from 'src/sequelize/models/writeOff'
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard'
import { ImportAsset } from 'src/sequelize/interface/import'
import { AssetFileImport, FindAssetList, FindAssetListAll } from 'src/sequelize/interface/index'
import {  AssetLists, } from 'src/sequelize/interface/list'
import { AssetListCreateDTO } from 'src/sequelize/interface/dto'
import { ApiTags, ApiOperation, ApiBody, ApiSecurity, ApiCreatedResponse, ApiParam } from '@nestjs/swagger'

@ApiTags('Assets')
@Controller('api/asset/list')
export class AssetListController {
  constructor(private readonly service: AssetListTableService) {}

  @ApiOperation({ summary: 'List Asset' })
  @ApiBody({ type: FindAssetListAll })
  @ApiCreatedResponse({ status: 200, type: AssetLists, description: 'Listing all' })
  @Post('list')
  async list(@Body() assetList: AssetList) {
    return await this.service.listAll(assetList)
  }

  @ApiOperation({ summary: 'Listing with page' })
  @ApiBody({ type: FindAssetList })
  @ApiCreatedResponse({ status: 200, type: AssetLists, description: 'Listing by Page' })
  @Post('listAll')
  async listAll(@Body() assetList: AssetList) {
    return await this.service.listPage(assetList)
  }

  @ApiOperation({ summary: 'Get one by id' })
  @ApiParam({ name: 'id', required: true, type: 'number', example: 1 })
  @ApiCreatedResponse({ status: 200, description: 'These record has been successfully get one.', type: AssetList })
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<AssetList> {
    return await this.service.getOne(id)
  }

  @ApiOperation({ summary: 'Get one by asset code' })
  @ApiParam({ name: 'assetCode', required: true, type: 'string', example: '000001' })
  @ApiCreatedResponse({ status: 200, description: 'These record has been successfully get one.', type: AssetList })
  @Get('code/:assetCode')
  async findByCode(@Param('assetCode') assetCode: string): Promise<AssetList> {
    return await this.service.findByCode(assetCode)
  }

  @ApiOperation({ summary: 'Create Asset' })
  @ApiBody({ type: AssetListCreateDTO })
  @ApiCreatedResponse({ status: 200, description: 'These record has been successfully created.', type: AssetList })
  @UseGuards(JwtAuthGuardUser)
  @Post('create')
  async createOne(@Body() assetList: AssetList): Promise<AssetList> {
    return await this.service.createOne(assetList)
  }

  @ApiOperation({ summary: 'Update Asset' })
  @ApiCreatedResponse({ status: 200, description: 'This record has been successfully updated.', type: AssetList })
  @UseGuards(JwtAuthGuardUser)
  @Post('update')
  async updateOne(@Body() assetList: AssetList) {
    return await this.service.updateOne(assetList)
  }

  @ApiOperation({ summary: 'Find Asset' })
  @ApiCreatedResponse({ status: 200, description: 'This record has been successfully updated.', type: AssetList })
  @UseGuards(JwtAuthGuardUser)
  @Post('findAsset')
  async findAsset(@Body() assetList: AssetList): Promise<AssetList> {
    return await this.service.findAsset(assetList)
  }

  @ApiOperation({ summary: 'Void Asset by id' })
  @ApiCreatedResponse({ status: 200, description: 'This record has been successfully void.' })
  @ApiParam({ name: 'id', required: true, type: 'number', example: 1 })
  @UseGuards(JwtAuthGuardUser)
  @Delete('void/:id')
  async voidOne(@Param('id') id: number) {
    return await this.service.voidOne(id)
  }

  @ApiOperation({ summary: 'Write Off Asset' })
  @ApiCreatedResponse({ status: 200, description: 'These record has been successfully save and write off.', type: WriteOff })
  @Post('writeoff/form')
  async writteOffPrcoess(@Body() writeOff: WriteOff) {
    return await this.service.writteOffPrcoess(writeOff)
  }

  @ApiOperation({ summary: 'Get Asset Image as one asset' })
  @ApiParam({ name: 'assetId', required: true, type: 'number', example: 1 })
  @ApiCreatedResponse({ status: 200, description: 'These record has been successfully get.', type: AssetListFiles, isArray: true })
  @Get('images/:assetId')
  async findFile(@Param('assetId') assetId: number) {
    return await this.service.getPhotoData(assetId)
  }

  @ApiOperation({ summary: 'Void asset images' })
  @ApiParam({ name: 'id', required: true, type: 'number', example: 1 })
  @ApiCreatedResponse({ status: 200, description: 'This record has been successfully void.' })
  @UseGuards(JwtAuthGuardUser)
  @Delete('images/void/:id')
  async voidFile(@Param('id') id: number) {
    return await this.service.voidFile(id)
  }

  @ApiOperation({ summary: 'Save Asset Image for one asset' })
  @ApiBody({ type: AssetFileImport })
  @ApiCreatedResponse({ status: 200, description: 'These record has been successfully save.', type: AssetListFiles, isArray: true })
  @UseGuards(JwtAuthGuardUser)
  @Post('images/save')
  async saveImage(@Body() assetFileImport: AssetFileImport) {
    return await this.service.saveImage(assetFileImport)
  }

  @ApiOperation({ summary: 'Import List of asset' })
  @ApiBody({ type: ImportAsset, isArray: true })
  @ApiCreatedResponse({ status: 200, description: 'These record has been successfully save.', type: AssetList, isArray: true })
  @UseGuards(JwtAuthGuardUser)
  @Post('import')
  async importData(@Body() importDatas: ImportAsset[]) {
    return importDatas.forEach(
      (asset: ImportAsset, i: number) => {
        setTimeout(async () => { return await this.service.importAsset(asset) }, 2500 * i)
      }
    )
  }

}
