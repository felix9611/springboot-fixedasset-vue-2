import { Controller, Get, Post, Body, Delete, Param, Put, UseGuards, Req } from '@nestjs/common'
import { SysMenuTableService } from 'src/module/base/service/sysMenuTable'
import { SysRole } from 'src/module/base/model/SysRole'
import { queryFindDept } from 'src/module/base/dto/queryFindList'
import { AuthGuard } from 'src/module/auth/guard'
import { MyRequest } from 'src/common/request'
@Controller('sys/menu')
export class SysMenuContoller {
  constructor(
    private sysMenuTabeService: SysMenuTableService,
  ) {}

  @Post('save')
  async create() {}

  @Get('nav')
  @UseGuards(AuthGuard)
  async getMenuItemWithRole(@Req() request: MyRequest) {
    return await this.sysMenuTabeService.findRoleWithMenu(request)
  }
}