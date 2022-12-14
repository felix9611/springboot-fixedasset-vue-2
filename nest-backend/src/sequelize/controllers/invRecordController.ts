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
import { InvRecordTableService } from 'src/sequelize/service/invRecordTableService'
import { InvRecord } from 'src/sequelize/models/invrecord'
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard'
import { invrecordList } from 'src/sequelize/interface/index'
import { ApiTags, ApiOperation, ApiBody, ApiSecurity } from '@nestjs/swagger'

@ApiTags('Record for Inv')
@Controller('api/invrecord')
export class InvRecordController {
  constructor(private readonly service: InvRecordTableService) {}

  @Post('list')
  async listData(@Body() invrecord: invrecordList) {
    return await this.service.findAll(invrecord)
  }
}
