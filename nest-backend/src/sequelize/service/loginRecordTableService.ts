
import { Injectable, Inject } from '@nestjs/common'
import { LoginRecord } from 'src/sequelize/models/loginRecords'
const moment = require('moment')

@Injectable()
export class LoginRecordTableService {
  constructor(
    @Inject('loginRecordRepository')
    private loginRecordRepository: typeof LoginRecord,
  ) {}

  async createOne(loginRecord: LoginRecord) {
    return await this.loginRecordRepository.create({
      ...loginRecord,
      loginTime: moment().format()
    })
  }

  async getRecords(username: string) {
    return await this.loginRecordRepository.findAll({ where: { username }, limit: 10, order: [['loginTime', 'ASC']] })
  }
}
