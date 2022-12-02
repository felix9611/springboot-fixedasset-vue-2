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
import { CodeTypeTableService } from 'src/sequelize/service/codeTypeTableService'
import { CodeType } from 'src/sequelize/models/codeType'
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard'

@Controller('api/code/type')
export class CodeTypeController {
  constructor(private readonly service: CodeTypeTableService) {}

  @UseGuards(JwtAuthGuardUser)
  @Post('create')
  async createOne(@Body() codeType: CodeType) {
    return await this.service.createOne(codeType)
  }

  @Post('listPage')
  async listPage(@Body() codeType: CodeType) {
    return await this.service.listPage(codeType)
  }

    @UseGuards(JwtAuthGuardUser)
  @Delete('void/:id')
  async voidOne(@Param(':id') id: number) {
    return await this.service.voidOne(id)
  }
}
