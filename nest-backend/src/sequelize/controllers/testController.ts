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
import { ApiTags, ApiOperation, ApiBody, ApiSecurity } from '@nestjs/swagger'

@ApiTags('Test')
@Controller('api/test')
export class TestController {
  constructor(private readonly service: TestTableService) {}

  @ApiOperation({ summary: 'Create' })
  @UseGuards(JwtAuthGuardUser)
  @Post('new')
  async create(@Body() test: Test) {
    return await this.service.new(test)
  }

  @ApiOperation({ summary: 'Update by Id' })
  @UseGuards(JwtAuthGuardUser)
  @Put('update/:id')
  async update(@Param() id: number, @Body() test: Test) {
    return await this.service.update(id, test)
  }

  @ApiOperation({ summary: 'Void by Id' })
  @UseGuards(JwtAuthGuardUser)
  @Delete('remove/:id')
  async remove(@Param() id: number) {
    return await this.service.removeOne(id)
  }

  @ApiOperation({ summary: 'Batch for Void' })
  @UseGuards(JwtAuthGuardUser)
  @Delete('batch/remove')
  async removeBatch(@Body() ids: any) {
    return await this.service.removeBatch(ids)
  }

  @ApiOperation({ summary: 'Get by Id' })
  @UseGuards(JwtAuthGuardUser)
  @Get('/:id')
  async getOne(@Param() id: number) {
    return await this.service.findOne(id)
  }

}
