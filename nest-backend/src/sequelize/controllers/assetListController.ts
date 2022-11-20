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

@Controller('api/asset/list')
export class AssetListController {
  constructor(private readonly service: AssetListTableService) {}

  @Post('listAll')
  async listAll(@Body() assetList: AssetList) {
    return await this.service.listPage(assetList)
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.service.getOne(id)
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

  @UseGuards(JwtAuthGuardUser)
  @Post('writeoff/form')
  async writteOffPrcoess(@Body() writeOff: WriteOff) {
    return await this.service.writteOffPrcoess(writeOff)
  }
}
