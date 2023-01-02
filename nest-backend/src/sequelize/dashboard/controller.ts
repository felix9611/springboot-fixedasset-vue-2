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
import { DasboardService } from 'src/sequelize/dashboard/service'
import { ApiTags, ApiOperation, ApiBody, ApiSecurity, ApiCreatedResponse, ApiParam } from '@nestjs/swagger'

@ApiTags('Dashboard')
@Controller('api/dashboard/cards')
export class DasboardController {
  constructor(private readonly service: DasboardService) {}

  @Post('getAssetCostYearMonthFind')
  async getAssetYearCostFind(@Body() findDef: any) {
    return await this.service.getAssetCostYearMonthFind(findDef)
  }

  @Post('getAssetItemsYearMonthFind')
  async getAssetYearItemsFind(@Body() findDef: any) {
    return await this.service.getAssetItemsYearMonthFind(findDef)
  }

  @Post('getAssetCountsYearMonthByDeptFind')
  async getAssetCountsYearMonthByDeptFind(@Body() findDef: any) {
    return await this.service.getAssetCountsYearMonthByDeptFind(findDef)
  }

  @Post('getAssetCostsYearMonthByDeptFind')
  async getAssetCostsYearMonthByDeptFind(@Body() findDef: any) {
    return await this.service.getAssetCostsYearMonthByDeptFind(findDef)
  }

  @Post('getAssetCostsYearMonthByTypeFind')
  async getAssetCostsYearMonthByTypeFind(@Body() findDef: any) {
    return await this.service.getAssetCostsYearMonthByTypeFind(findDef)
  }

  @Post('getAssetCountYearMonthByTypeFind')
  async getAssetCountYearMonthByTypeFind(@Body() findDef: any) {
    return await this.service.getAssetCountYearMonthByTypeFind(findDef)
  }

  @Post('getAssetCostsYearMonthByPlaceFind')
  async getAssetCostsYearMonthByPlaceFind(@Body() findDef: any) {
    return await this.service.getAssetCostsYearMonthByPlaceFind(findDef)
  }

  @Post('getAssetCountYearMonthByPlaceFind')
  async getAssetCountYearMonthByPlaceFind(@Body() findDef: any) {
    return await this.service.getAssetCountYearMonthByPlaceFind(findDef)
  }
}
