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
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiCreatedResponse } from '@nestjs/swagger'
import { listLocation } from 'src/sequelize/interface/list'
import { LocationCreatedDto } from 'src/sequelize/interface/dto'
import { FindLocation } from 'src/sequelize/interface/index'

@ApiTags('Location')
@Controller('api/location')
export class LocationController {
  constructor(private readonly service: LocationTableService) {}

  @ApiOperation({ summary: 'Create' })
  @ApiBody({ type: LocationCreatedDto, description: 'Create' })
  @ApiCreatedResponse({ status: 200, description: 'This record has been successfully created.', type: Location })
  @UseGuards(JwtAuthGuardUser)
  @Post('create')
  async createOne(@Body() location: Location) {
    return await this.service.createOne(location)
  }

  @ApiOperation({ summary: 'Update' })
  @ApiCreatedResponse({ status: 200, description: 'This record has been successfully updated.', type: Location })
  @UseGuards(JwtAuthGuardUser)
  @Post('update')
  async updateOne(@Body() location: Location) {
    return await this.service.updateOne(location)
  }

  @ApiOperation({ summary: 'Get All Location' })
  @ApiCreatedResponse({ status: 200, description: 'This record has been successfully get all.', type: Location, isArray: true })
  @Get('GetAll')
  async getAll() {
    return await this.service.getAll()
  }

  @ApiOperation({ summary: 'Get by ID' })
  @ApiCreatedResponse({ status: 200, description: 'This record has been successfully get one.', type: Location })
  @ApiParam({ name: 'id', required: true, type: 'number', example: 1 })
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.service.getOne(id)
  }

  @ApiOperation({ summary: 'Void by ID' })
  @ApiParam({ name: 'id', required: true, type: 'number', example: 1 })
  @ApiCreatedResponse({ status: 200, description: 'This record has been successfully void.' })
  @UseGuards(JwtAuthGuardUser)
  @Delete('void/:id')
  async voidOne(@Param('id') id: number) {
    return await this.service.voidOne(id)
  }

  @ApiOperation({ summary: 'Listing By Page' })
  @ApiBody({ type: FindLocation, description: 'Find Defind' })
  @ApiCreatedResponse({ status: 200, description: 'This record has been successfully updated.', type: listLocation })
  @Post('listAll')
  async listAll(@Body() location: Location) {
    return await this.service.listPage(location)
  }

  @ApiOperation({ summary: 'Batching Create' })
  @ApiBody({ type: LocationCreatedDto, isArray: true, description: 'Batching to create' })
  @ApiCreatedResponse({ status: 200, description: 'This record has been successfully get all.', type: Location, isArray: true })
  @UseGuards(JwtAuthGuardUser)
  @Post('batch/create')
  async batchCreate(@Body() locations: Location[]) {
    return locations.forEach( async loc => {
      return await this.service.createOne(loc)
    })
  }


}
