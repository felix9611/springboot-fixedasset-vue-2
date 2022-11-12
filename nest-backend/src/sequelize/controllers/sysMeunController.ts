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

@Controller('api/sys/menu')
export class SysMenuController {
  constructor(private readonly service: SysMenuTableService) {}

  @Post('create')
  async create(@Body() sysMenu: SysMenu) {
    return await this.service.createOne(sysMenu)
  }


  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.service.getOne(id)
  }

  @Delete('void/:id')
  async voidOne(@Param('id') id: number) {
    return await this.service.getOne(id)
  }

  @UseGuards(JwtAuthGuardUser)
  @Get('get/All')
  async getAll() {
    return await this.service.getAllPage()
  }

  @Put('/update') 
  async update(@Body() sysMenu: SysMenu) {
    return await this.service.updateOne(sysMenu)
  }

  @Post('list')
  async listAll(@Body() sysMenu: SysMenu) {
    return await this.service.findWithList(sysMenu)
  }
  

}