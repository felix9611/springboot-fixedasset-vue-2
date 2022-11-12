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
import { TestTableService } from '../service/testTableService'
import { Test } from '../models/test'
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard'

@Controller('api/test')
export class TestController {
  constructor(private readonly service: TestTableService) {}

  @UseGuards(JwtAuthGuardUser)
  @Post('new')
  async create(@Body() test: Test) {
    return await this.service.new(test)
  }

  @UseGuards(JwtAuthGuardUser)
  @Put('update/:id')
  async update(@Param() id: number, @Body() test: Test) {
    return await this.service.update(id, test)
  }

  @UseGuards(JwtAuthGuardUser)
  @Delete('remove/:id')
  async remove(@Param() id: number) {
    return await this.service.removeOne(id)
  }

  @UseGuards(JwtAuthGuardUser)
  @Delete('batch/remove')
  async removeBatch(@Body() ids: any) {
    return await this.service.removeBatch(ids)
  }

  @UseGuards(JwtAuthGuardUser)
  @Get('/:id')
  async getOne(@Param() id: number) {
    return await this.service.findOne(id)
  }

}