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
import { CodeTypeTableService } from 'src/sequelize/service/codeTypeTableService'
import { CodeType } from 'src/sequelize/models/codeType'
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard'
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiCreatedResponse } from '@nestjs/swagger'
import { CodeTypeCreatedDto, CodeTypeFindDto, CodeTypeFindByTypeDto } from 'src/sequelize/interface/dto'

@ApiTags('Code Type')
@Controller('api/code/type')
export class CodeTypeController {
  constructor(private readonly service: CodeTypeTableService) {}

  @ApiOperation({ summary: 'Create' })
  @ApiBody({ type: CodeTypeCreatedDto })
  @ApiCreatedResponse({ status: 200, description: 'This record has been successfully created.', type: CodeType })
  @UseGuards(JwtAuthGuardUser)
  @Post('create')
  async createOne(@Body() codeType: CodeType) {
    return await this.service.createOne(codeType)
  }

  @ApiOperation({ summary: 'Update' })
  @ApiCreatedResponse({ status: 200, description: 'This record has been successfully updated.', type: CodeType })
  @UseGuards(JwtAuthGuardUser)
  @Post('update')
  async updateOne(@Body() codeType: CodeType) {
    return await this.service.updateOne(codeType)
  }

  @ApiOperation({ summary: 'Page Listing' })
  @ApiBody({ type: CodeTypeFindDto })
  @Post('listPage')
  async listPage(@Body() codeType: CodeType) {
    return await this.service.listPage(codeType)
  }

  @ApiOperation({ summary: 'Void by Id' })
  @ApiParam({ name: 'id', required: true, type: 'number', example: 1 })
  @UseGuards(JwtAuthGuardUser)
  @Delete('void/:id')
  async voidOne(@Param('id') id: number) {
    return await this.service.voidOne(id)
  }

  @ApiOperation({ summary: 'Get by Id' })
  @ApiCreatedResponse({ status: 200, description: 'This record has been successfully get one.', type: CodeType })
  @ApiParam({ name: 'id', required: true, type: 'number', example: 1 })
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.service.getOne(id)
  }

  @ApiOperation({ summary: 'Find by the type' })
  @ApiBody({ type: CodeTypeFindByTypeDto })
  @Post('findByType')
  async findByType(@Body() codeType: CodeType) {
    return await this.service.findByType(codeType)
  }
}
