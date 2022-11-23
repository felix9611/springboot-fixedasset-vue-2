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
import { WriteOff } from 'src/sequelize/models/writeOff'
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard'
import { ImportAsset } from 'src/sequelize/interface/import'
import { AssetFileImport } from 'src/sequelize/interface/index'

@Controller('api/asset/list')
export class AssetListController {
  constructor(private readonly service: AssetListTableService) {}

  @Post('list')
  async list(@Body() assetList: AssetList) {
    return await this.service.listAll(assetList)
  }

  @Post('listAll')
  async listAll(@Body() assetList: AssetList) {
    return await this.service.listPage(assetList)
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.service.getOne(id)
  }

  @Get('code/:assetCode')
  async getOneByCode(@Param('assetCode') assetCode: string) {
    return await this.service.getOneByCode(assetCode)
  }

  @Get('code/:assetCode')
  async findByCode(@Param('assetCode') assetCode: string) {
    return await this.service.findByCode(assetCode)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('create')
  async createOne(@Body() assetList: AssetList) {
    return await this.service.createOne(assetList)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('update')
  async updateOne(@Body() assetList: AssetList) {
    return await this.service.updateOne(assetList)
  }

  @UseGuards(JwtAuthGuardUser)
  @Delete('void/:id')
  async voidOne(@Param('id') id: number) {
    return await this.service.voidOne(id)
  }
  @Post('writeoff/form')
  async writteOffPrcoess(@Body() writeOff: WriteOff) {
    return await this.service.writteOffPrcoess(writeOff)
  }

  @UseGuards(JwtAuthGuardUser)
  @Get('images/:assetId')
  async findFile(@Param('assetId') assetId: number) {
    return await this.service.getPhotoData(assetId)
  }

  @UseGuards(JwtAuthGuardUser)
  @Delete('images/void/:id')
  async voidFile(@Param('id') id: number) {
    return await this.service.voidFile(id)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('images/save')
  async saveImage(@Body() assetFileImport: AssetFileImport) {
    return await this.service.saveImage(assetFileImport)
  }

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
