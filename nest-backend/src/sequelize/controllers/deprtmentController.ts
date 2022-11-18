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
import { DepartmentTableService } from 'src/sequelize/service/departmentTableService'
import { Department } from 'src/sequelize/models/department'
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard'

@Controller('api/department')
export class DepartmentController {
  constructor(private readonly service: DepartmentTableService) {}

  @Get('getAll')
  async getAll() {
    return await this.service.getAll()
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('create')
  async createOne(@Body() department: Department) {
    return await this.service.createOne(department)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('update')
  async updateOne(@Body() department: Department) {
    return await this.service.updateOne(department)
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
  async listAll(@Body() department: Department) {
    return await this.service.listPage(department)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('batch/create')
  async batchCreate(@Body() departments: Department[]) {
    return departments.forEach(async dept => {
      return await this.service.createOne(dept)
    })
  }
}
