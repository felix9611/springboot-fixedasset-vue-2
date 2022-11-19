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
import { VendorTableService } from 'src/sequelize/service/vendorTableService'
import { Vendor } from 'src/sequelize/models/vendor'
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard'

@Controller('api/vendor')
export class VendorController {
  constructor(private readonly service: VendorTableService) {}

  @Get('getAll')
  async getAll() {
    return await this.service.getAll()
  }

  @Post('listAll')
  async listAll(@Body() vendor: Vendor) {
    return await this.service.listPage(vendor)
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.service.getOne(id)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('create')
  async createOne(@Body() vendor: Vendor) {
    return await this.service.createOne(vendor)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('update')
  async updateOne(@Body() vendor: Vendor) {
    return await this.service.updateOne(vendor)
  }

  @UseGuards(JwtAuthGuardUser)
  @Delete('void/:id')
  async voidOne(@Param('id') id: number) {
    return await this.service.voidOne(id)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('batch/create')
  async batchCreate(@Body() vendors: Vendor[]) {
    return vendors.forEach( async vendor => {
      return await this.service.createOne(vendor)
    })
  }
}
