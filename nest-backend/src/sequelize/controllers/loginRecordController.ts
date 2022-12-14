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

  @UseGuards(JwtAuthGuardUser)
  @Post('create')
  async createOne(@Body() loginRecord: LoginRecord) {
    return await this.service.createOne(loginRecord)
  }

  @UseGuards(JwtAuthGuardUser)
  @Post('all/:username')
  async findAle(@Param('username') username: string) {
    return await this.service.getRecords(username)
  }
}
