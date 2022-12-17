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
import { SysMenuTableService } from 'src/sequelize/service/sysMenuTableService'
import { SysMenu } from 'src/sequelize/models/sysMenu'
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard'
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger'

@ApiTags('System Menu')
@Controller('api/sys/menu')
export class SysMenuController {
  constructor(private readonly service: SysMenuTableService) {}

  @Post('create')
  @UseGuards(JwtAuthGuardUser)
  async create(@Body() sysMenu: SysMenu) {
    return await this.service.createOne(sysMenu)
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, type: 'number', example: 1 })
  async getOne(@Param('id') id: number) {
    return await this.service.getOne(id)
  }

  @Delete('void/:id')
  @UseGuards(JwtAuthGuardUser)
  @ApiParam({ name: 'id', required: true, type: 'number', example: 1 })
  async voidOne(@Param('id') id: number) {
    return await this.service.voidOne(id)
  }

  @Get('get/All')
  async getAll() {
    return await this.service.getAllPage()
  }

  @Post('/update')
  @UseGuards(JwtAuthGuardUser)
  async update(@Body() sysMenu: SysMenu) {
    return await this.service.updateOne(sysMenu)
  }

  @Post('list')
  async listAll(@Body() sysMenu: SysMenu) {
    return await this.service.findWithList(sysMenu)
  }


}
