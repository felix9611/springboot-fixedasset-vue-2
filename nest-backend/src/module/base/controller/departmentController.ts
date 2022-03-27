import { Controller, Get, Post, Body, Delete, Param, Put, UseGuards } from '@nestjs/common'
import { DepartmentTabeService } from "../service/departmentTabe"
import { Department } from 'src/module/base/model/deparment'
import { queryFindDept } from 'src/module/base/dto/queryFindList'
import { AuthGuard } from 'src/module/auth/guard'
@Controller('base/department')
export class DepartmentContoller {
  constructor(
    private departmentService: DepartmentTabeService,
  ) {}

  @Get('findAll')
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.departmentService.findAllTwo()
  }

  @Post('save')
  async saveOne(@Body() department: Department) {
    return await this.departmentService.save(department)
  }

  @Delete(':id')
  async voidData(@Param('id') id: number) {
    return await this.departmentService.voidData(id)
  }

  @Post('list')
  async listPage(@Body() department: queryFindDept) {
    return await this.departmentService.findAllList(department)
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.departmentService.getOne(id)
  }
}