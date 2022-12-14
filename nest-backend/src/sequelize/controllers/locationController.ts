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
import { LocationTableService } from 'src/sequelize/service/locationTableService'
import { Location } from 'src/sequelize/models/location'
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard'
import { ApiTags, ApiOperation, ApiBody, ApiSecurity } from '@nestjs/swagger'

@ApiTags('Location')
@Controller('api/location')
export class LocationController {
  constructor(private readonly service: LocationTableService) {}

  @UseGuards(JwtAuthGuardUser)
  @Post('create')
  async createOne(@Body() location: Location) {
    return await this.service.createOne(location)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('update')
  async updateOne(@Body() location: Location) {
    return await this.service.updateOne(location)
  }

  @Get('GetAll')
  async getAll() {
    return await this.service.getAll()
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.service.getOne(id)
  }

  @UseGuards(JwtAuthGuardUser)
  @Delete('void/:id')
  async voidOne(@Param('id') id: number) {
    return await this.service.voidOne(id)
  }

  @Post('listAll')
  async listAll(@Body() location: Location) {
    return await this.service.listPage(location)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('batch/create')
  async batchCreate(@Body() locations: Location[]) {
    return locations.forEach( async loc => {
      return await this.service.createOne(loc)
    })
  }


}
