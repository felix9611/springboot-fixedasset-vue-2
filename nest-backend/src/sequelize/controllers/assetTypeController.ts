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
import { ApiTags, ApiOperation, ApiBody, ApiCreatedResponse, ApiParam } from '@nestjs/swagger'
import { AssetTypeCreateDTO, AssetTypeFindDTO } from 'src/sequelize/interface/dto'
import { listAssetType } from 'src/sequelize/interface/list'


@ApiTags('Assets Type')
@Controller('api/asset/type')
export class AssetTypeController {
  constructor(private readonly service: AssetTypeTableService) {}

  @ApiOperation({ summary: 'Create' })
  @ApiBody({ type:AssetTypeCreateDTO  })
  @ApiCreatedResponse({ status: 200, description: 'This record has been successfully created.', type: AssetType })
  @UseGuards(JwtAuthGuardUser)
  @Post('/create')
  async create(@Body() assetType: AssetType) {
    return await this.service.create(assetType)
  }

  @ApiOperation({ summary: 'Batching Create' })
  @ApiBody({ type: AssetTypeCreateDTO, isArray: true })
  @ApiCreatedResponse({ status: 200, description: 'These record has been successfully batch created.', type: AssetType, isArray: true })
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
  @ApiBody({ type: AssetTypeFindDTO })
  @ApiCreatedResponse({ status: 200, description: 'These record has been successfully listing.', type: listAssetType })
  @UseGuards(JwtAuthGuardUser)
  @Post('/listAll')
  async listAllPage(@Body() assetType: AssetType) {
    return this.service.listPage(assetType)
  }

  @ApiOperation({ summary: 'Get one by Id' })
  @ApiParam({ name: 'id', required: true, type: 'number', example: 1 })
  @ApiCreatedResponse({ status: 200, description: 'These record has been successfully get the item by id.', type: AssetType })
  @Get('/get/:id')
  async getOneData(@Param('id') id: number) {
    return await this.service.getOne(id)
  }

  @ApiOperation({ summary: 'Update Type' })
  @ApiCreatedResponse({ status: 200, description: 'These record has been successfully update.', type: AssetType })
  @UseGuards(JwtAuthGuardUser)
  @Post('/update')
  async updateOne(@Body() assetType: AssetType) {
    return await this.service.updateOne(assetType)
  }

  @ApiOperation({ summary: 'Void one by Id' })
  @ApiParam({ name: 'id', required: true, type: 'number', example: 1 })
  @ApiCreatedResponse({ status: 200, description: 'These record has been successfully void.' })
  @UseGuards(JwtAuthGuardUser)
  @Delete('remove/:id')
  async voidOneData(@Param('id') id: number) {
    return await this.service.voidOne(id)
  }

  @ApiOperation({ summary: 'Get All Type as active' })
  @ApiCreatedResponse({ status: 200, description: 'These record has been successfully list all.', type: AssetType, isArray: true })
  @Get('getAll')
  async getAll() {
    return await this.service.getAll()
  }


}
