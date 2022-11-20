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
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard'

@Controller('api/asset/list')
export class AssetListController {
  constructor(private readonly service: AssetListTableService) {}

  @Post('listAll')
  async listAll(@Body() assetList: AssetList) {
    return await this.service.listPage(assetList)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('create')
  async createOne(@Body() assetList: AssetList) {
    return await this.service.createOne(assetList)
  }
}
