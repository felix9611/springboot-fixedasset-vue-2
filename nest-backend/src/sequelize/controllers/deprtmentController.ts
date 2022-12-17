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
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger'
import { departmentCreateDTO, departmentFindDTO } from 'src/sequelize/interface/dto'

@ApiTags('Department')
@Controller('api/department')
export class DepartmentController {
  constructor(private readonly service: DepartmentTableService) {}

  @ApiOperation({ summary: 'Get All' })
  @Get('getAll')
  async getAll() {
    return await this.service.getAll()
  }

  @ApiOperation({ summary: 'Create' })
  @ApiBody({ type: departmentCreateDTO })
  @UseGuards(JwtAuthGuardUser)
  @Post('create')
  async createOne(@Body() department: Department) {
    return await this.service.createOne(department)
  }

  @ApiOperation({ summary: 'Update' })
  @UseGuards(JwtAuthGuardUser)
  @Post('update')
  async updateOne(@Body() department: Department) {
    return await this.service.updateOne(department)
  }

  @ApiOperation({ summary: 'Get by ID' })
  @ApiParam({ name: 'id', required: true, type: 'number', example: 1 })
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.service.getOne(id)
  }

  @ApiOperation({ summary: 'Void by ID' })
  @ApiParam({ name: 'id', required: true, type: 'number', example: 1 })
  @UseGuards(JwtAuthGuardUser)
  @Delete('void/:id')
  async voidOne(@Param('id') id: number) {
    return await this.service.voidOne(id)
  }

  @ApiOperation({ summary: 'List by Page ' })
  @ApiBody({ type: departmentFindDTO })
  @Post('listAll')
  async listAll(@Body() department: Department) {
    return await this.service.listPage(department)
  }

  @ApiOperation({ summary: 'Batch to create ' })
  @UseGuards(JwtAuthGuardUser)
  @ApiBody({ type: departmentCreateDTO, isArray: true })
  @Post('batch/create')
  async batchCreate(@Body() departments: Department[]) {
    return departments.forEach(async dept => {
      return await this.service.createOne(dept)
    })
  }
}
