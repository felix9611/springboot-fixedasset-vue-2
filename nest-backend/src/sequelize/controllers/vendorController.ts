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
import { ApiTags, ApiOperation, ApiBody, ApiSecurity } from '@nestjs/swagger'
import { vendorCreateDTO, VendorFindDTO } from 'src/sequelize/interface/dto'

@ApiTags('Vendor')
@Controller('api/vendor')
export class VendorController {
  constructor(private readonly service: VendorTableService) {}

  @ApiOperation({ summary: 'Get All' })
  @Get('getAll')
  async getAll() {
    return await this.service.getAll()
  }

  @ApiOperation({ summary: 'Void by ID' })
  @ApiBody({ type: VendorFindDTO })
  @Post('listAll')
  async listAll(@Body() vendor: Vendor) {
    return await this.service.listPage(vendor)
  }

  @ApiOperation({ summary: 'Get by ID' })
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.service.getOne(id)
  }

  @ApiOperation({ summary: 'Create' })
  @ApiBody({ type: vendorCreateDTO })
  @UseGuards(JwtAuthGuardUser)
  @Post('create')
  async createOne(@Body() vendor: Vendor) {
    return await this.service.createOne(vendor)
  }

  @ApiOperation({ summary: 'Update' })
  @UseGuards(JwtAuthGuardUser)
  @Post('update')
  async updateOne(@Body() vendor: Vendor) {
    return await this.service.updateOne(vendor)
  }

  @ApiOperation({ summary: 'Void by ID' })
  @UseGuards(JwtAuthGuardUser)
  @Delete('void/:id')
  async voidOne(@Param('id') id: number) {
    return await this.service.voidOne(id)
  }

  @ApiOperation({ summary: 'Batch Create' })
  @ApiBody({ type: [vendorCreateDTO] })
  @UseGuards(JwtAuthGuardUser)
  @Post('batch/create')
  async batchCreate(@Body() vendors: Vendor[]) {
    return vendors.forEach( async vendor => {
      return await this.service.createOne(vendor)
    })
  }
}
