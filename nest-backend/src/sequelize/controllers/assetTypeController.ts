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
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('Assets Type')
@Controller('api/asset/type')
export class AssetTypeController {
  constructor(private readonly service: AssetTypeTableService) {}

  @ApiOperation({ summary: 'Create Type' })
  @UseGuards(JwtAuthGuardUser)
  @Post('/create')
  async create(@Body() assetType: AssetType) {
    return await this.service.create(assetType)
  }

  @ApiOperation({ summary: 'Batching Create Type' })
  @UseGuards(JwtAuthGuardUser)
  @Post('batch/create')
  async batchCreate(@Body() assetTypes: AssetType[]) {
    return assetTypes.forEach(
      async at => {
        return await this.service.create(at)
      }
    )
  }

  @ApiOperation({ summary: 'List Type by page' })
  @UseGuards(JwtAuthGuardUser)
  @Post('/listAll')
  async listAllPage(@Body() assetType: AssetType) {
    return this.service.listPage(assetType)
  }

  @ApiOperation({ summary: 'Get one by Id' })
  @Get('/get/:id')
  async getOneData(@Param('id') id: number) {
    return await this.service.getOne(id)
  }

  @ApiOperation({ summary: 'Update Type' })
  @UseGuards(JwtAuthGuardUser)
  @Post('/update')
  async updateOne(@Body() assetType: AssetType) {
    return await this.service.updateOne(assetType)
  }

  @ApiOperation({ summary: 'Void one by Id' })
  @UseGuards(JwtAuthGuardUser)
  @Delete('remove/:id')
  async voidOneData(@Param('id') id: number) {
    return await this.service.voidOne(id)
  }

  @ApiOperation({ summary: 'Get All Type as active' })
  @Get('getAll')
  async getAll() {
    return await this.service.getAll()
  }


}
