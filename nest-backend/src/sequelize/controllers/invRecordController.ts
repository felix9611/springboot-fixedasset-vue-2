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

@Controller('api/invrecord')
export class InvRecordController {
  constructor(private readonly service: InvRecordTableService) {}

  @Post('list')
  async listData(@Body() invRecord: InvRecord) {
    return await this.service.findAll(invRecord)
  }
}
