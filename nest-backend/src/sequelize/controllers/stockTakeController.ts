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
import { StockTakeTableService } from 'src/sequelize/service/stockTakeTableService'
import { StockTake } from 'src/sequelize/models/stocktake'
import { StockTakeItem } from 'src/sequelize/models/stockTakeItem'
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard'
import { ApiTags, ApiOperation, ApiBody, ApiSecurity } from '@nestjs/swagger'

@ApiTags('Stock Take')
@Controller('api/stocktake')
export class StockTakeController {
  constructor(private readonly service: StockTakeTableService) {}

  @Post('create')
  @UseGuards(JwtAuthGuardUser)
  async createOne(@Body() stocktake: StockTake) {
    return await this.service.createOne(stocktake)
  }

  @Post('item')
  @UseGuards(JwtAuthGuardUser)
  async itemStockTake(@Body() stocktakeItem: StockTakeItem) {
    return await this.service.itemStockTakeAction(stocktakeItem)
  }

  @Post('item/listAll')
  @UseGuards(JwtAuthGuardUser)
  async itemListAll(@Body() stockTakeItem: StockTakeItem) {
    return await this.service.itemListAll(stockTakeItem)
  }

  @Post('listAll')
  @UseGuards(JwtAuthGuardUser)
  async listAll(@Body() stocktake: StockTake) {
    return await this.service.listAll(stocktake)
  }

  @Get(':id')
  async getOne(@Param('id') id: number){
    return await this.service.getOne(id)
  }

  @Delete('void/:id')
  async voidOne(@Param('id') id: number) {
    return await this.service.voidOne(id)
  }

  @Post('finish/:id')
  async finishOne(@Param('id') id: number) {
    return await this.service.finishOne(id)
  }

}
