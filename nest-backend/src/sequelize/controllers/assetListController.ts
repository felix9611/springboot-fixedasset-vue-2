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
import { AssetFileImport, AssetLists, FindAssetList, FindAssetListAll } from 'src/sequelize/interface/index'
import { ApiTags, ApiOperation, ApiBody, ApiSecurity } from '@nestjs/swagger'

@ApiTags('Assets')
@Controller('api/asset/list')
export class AssetListController {
  constructor(private readonly service: AssetListTableService) {}

  @ApiOperation({ summary: 'List Asset' })
  @ApiBody({ type: FindAssetListAll })
  @Post('list')
  async list(@Body() assetList: AssetList): Promise<AssetLists> {
    return await this.service.listAll(assetList)
  }

  @ApiOperation({ summary: 'Listing with page' })
  @ApiBody({ type: FindAssetList })
  @Post('listAll')
  async listAll(@Body() assetList: AssetList) {
    return await this.service.listPage(assetList)
  }

  @ApiOperation({ summary: 'Get one by id' })
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<AssetList> {
    return await this.service.getOne(id)
  }

  @ApiOperation({ summary: 'Get one by asset code' })
  @Get('code/:assetCode')
  async findByCode(@Param('assetCode') assetCode: string): Promise<AssetList> {
    return await this.service.findByCode(assetCode)
  }

  @ApiOperation({ summary: 'Create Asset' })
  @UseGuards(JwtAuthGuardUser)
  @Post('create')
  async createOne(@Body() assetList: AssetList): Promise<AssetList> {
    return await this.service.createOne(assetList)
  }

  @ApiOperation({ summary: 'Update Asset' })
  @UseGuards(JwtAuthGuardUser)
  @Post('update')
  async updateOne(@Body() assetList: AssetList) {
    return await this.service.updateOne(assetList)
  }

  @ApiOperation({ summary: 'Find Asset' })
  @UseGuards(JwtAuthGuardUser)
  @Post('findAsset')
  async findAsset(@Body() assetList: AssetList): Promise<AssetList> {
    return await this.service.findAsset(assetList)
  }

  @ApiOperation({ summary: 'Void Asset by id' })
  @UseGuards(JwtAuthGuardUser)
  @Delete('void/:id')
  async voidOne(@Param('id') id: number) {
    return await this.service.voidOne(id)
  }

  @ApiOperation({ summary: 'Write Off Asset' })
  @Post('writeoff/form')
  async writteOffPrcoess(@Body() writeOff: WriteOff) {
    return await this.service.writteOffPrcoess(writeOff)
  }

  @ApiOperation({ summary: 'Get Asset Image as one asset' })
  @UseGuards(JwtAuthGuardUser)
  @Get('images/:assetId')
  async findFile(@Param('assetId') assetId: number) {
    return await this.service.getPhotoData(assetId)
  }

  @ApiOperation({ summary: 'Void asset images' })
  @UseGuards(JwtAuthGuardUser)
  @Delete('images/void/:id')
  async voidFile(@Param('id') id: number) {
    return await this.service.voidFile(id)
  }

  @ApiOperation({ summary: 'Save Asset Image for one asset' })
  @ApiBody({ type: AssetFileImport })
  @UseGuards(JwtAuthGuardUser)
  @Post('images/save')
  async saveImage(@Body() assetFileImport: AssetFileImport) {
    return await this.service.saveImage(assetFileImport)
  }

  @ApiOperation({ summary: 'Import List of asset' })
  @ApiBody({ type: [ImportAsset] })
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
