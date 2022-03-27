import { Controller, Get, Post, Body, Delete, Param, Put, UseGuards } from '@nestjs/common'
import { SysRoleTableService } from 'src/module/base/service/sysRoleTable'
import { SysRole } from 'src/module/base/model/SysRole'
import { queryFindRole } from 'src/module/base/dto/queryFindList'
import { AuthGuard } from 'src/module/auth/guard'
@Controller('base/sysRole')
export class SysRoleContoller {
  constructor(
    private sysRoleTabeService: SysRoleTableService,
  ) {}

  @Post('save')
  async create(@Body() sysRole: SysRole) {
    return await this.sysRoleTabeService.save(sysRole)
  }

  @Delete('void/:id')
  async void(@Param('id') id: number) {
    return await this.sysRoleTabeService.void(id)
  }

  @Post('findList')
  async findList(@Body() find: queryFindRole) {
    return await this.sysRoleTabeService.findList(find)
  }

  @Get('getAll')
  async getAll() {
    return await this.sysRoleTabeService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.sysRoleTabeService.findOne(id)
  }
}