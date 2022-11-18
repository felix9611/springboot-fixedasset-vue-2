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
import { SysRoleTableService } from 'src/sequelize/service/sysRoleTableService'
import { SysRole } from 'src/sequelize/models/sysRole'
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard'
import { Roles } from 'src/sequelize/interface'

@Controller('api/sys/role')
export class SysRoleController {
  constructor(private readonly service: SysRoleTableService) {}

  @UseGuards(JwtAuthGuardUser)
  @Post('create')
  async createRole(@Body() sysRole: SysRole) {
    return await this.service.create(sysRole)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('update')
  async updateRole(@Body() sysRole: SysRole) {
    return await this.service.update(sysRole)
  }

  @UseGuards(JwtAuthGuardUser)
  @Get('/get/all')
  async getAll() {
    return await this.service.getAll()
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('list')
  async listOnPages(@Body() sysRole: SysRole) {
    return await this.service.findWithList(sysRole)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('pages')
  async getPagesByRole(@Body() { roles }: Roles) {
    return await this.service.getPagesByRole(roles)
  }

  @UseGuards(JwtAuthGuardUser)
  @Delete('void/:id')
  async voidOne(@Param('id') id: number) {
    return await this.service.voidOne(id)
  }

  @UseGuards(JwtAuthGuardUser)
  @Get('info/:id')
  async infoOne(@Param('id') id: number) {
    return await this.service.getOne(id)
  }

  @UseGuards(JwtAuthGuardUser)
  @Get('user/pages')
  async getPagesByUser(@Request() req: any) {
    const { userId } = req.user
    return await this.service.getPagesByUser(userId)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('all/roles')
  async getAllRole(@Body() { roles }: Roles) {
    return await this.service.getAllRole(roles)
  }

  @UseGuards(JwtAuthGuardUser)
  @Get('menu/handle/:roleId')
  async menuhandle(@Param('roleId') roleId: number) {
    return await this.service.menuhandle(roleId)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('menu/handle/update/:roleId')
  async menuhandleUpdate(@Param('roleId') roleId: number, @Body() menuIds: any) {
    return await this.service.menuhandleUpdate(roleId, menuIds)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('handle/update/:userId')
  async roleshandleUpdate(@Param('userId') userId: string, @Body() roleIds: any) {
    return await this.service.roleshandleUpdate(roleIds, userId)
  }

  @UseGuards(JwtAuthGuardUser)
  @Get('user/:userId')
  async getUserRole(@Param('userId') userId: string) {
    return await this.service.getUserRole(userId)
  }

}