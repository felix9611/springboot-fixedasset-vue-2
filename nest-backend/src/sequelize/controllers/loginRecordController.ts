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
import { LoginRecordTableService } from 'src/sequelize/service/loginRecordTableService'
import { LoginRecord } from 'src/sequelize/models/loginRecords'
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard'
import { ApiTags, ApiOperation, ApiBody, ApiSecurity } from '@nestjs/swagger'

@ApiTags('Auth Login Record')
@Controller('api/auth/record')
export class LoginRecordController {
  constructor(private readonly service: LoginRecordTableService) {}

  @ApiOperation({ summary: 'Create Login Record', description: 'This for create by the user when login, cannot API to create when not login' })
  @UseGuards(JwtAuthGuardUser)
  @Post('create')
  async createOne(@Body() loginRecord: LoginRecord) {
    return await this.service.createOne(loginRecord)
  }

  @ApiOperation({ summary: 'Get All' })
  @UseGuards(JwtAuthGuardUser)
  @Post('all/:username')
  async findAle(@Param('username') username: string) {
    return await this.service.getRecords(username)
  }
}
