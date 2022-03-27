import { Controller, Get, Post, Body, Delete, Param, Put, UseGuards } from '@nestjs/common'
import { SysMenuTableService } from 'src/module/base/service/sysMenuTable'
import { SysRole } from 'src/module/base/model/SysRole'
import { queryFindDept } from 'src/module/base/dto/queryFindList'
import { AuthGuard } from 'src/module/auth/guard'
@Controller('base/department')
export class DepartmentContoller {
  constructor(
    private sysMenuTabeService: SysMenuTableService,
  ) {}

  @Post('save')
  async create() {}
}