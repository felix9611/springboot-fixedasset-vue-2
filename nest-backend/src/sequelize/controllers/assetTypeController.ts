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
import { AssetTypeTableService } from 'src/sequelize/service/assetTypeTableService'
import { AssetType } from 'src/sequelize/models/assetType'
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard'

@Controller('api/asset/type')
export class AssetTypeController {
  constructor(private readonly service: AssetTypeTableService) {}

  @UseGuards(JwtAuthGuardUser)
  @Post('/create')
  async create(@Body() assetType: AssetType) {
    return await this.service.create(assetType)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('batch/create')
  async batchCreate(@Body() assetTypes: AssetType[]) {
    return assetTypes.forEach(
      async at => {
        return await this.service.create(at)
      }
    )
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('/listAll')
  async listAllPage(@Body() assetType: AssetType) {
    return this.service.listPage(assetType)
  }

  @UseGuards(JwtAuthGuardUser)
  @Get('/get/:id')
  async getOneData(@Param('id') id: number) {
    return await this.service.getOne(id)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('/update')
  async updateOne(@Body() assetType: AssetType) {
    return await this.service.updateOne(assetType)
  }

  @UseGuards(JwtAuthGuardUser)
  @Delete('remove/:id')
  async voidOneData(@Param('id') id: number) {
    return await this.service.voidOne(id)
  }

  @Get('getAll')
  async getAll() {
    return await this.service.getAll()
  }


}
