
import { Injectable, Inject } from '@nestjs/common'
import { CodeType } from 'src/sequelize/models/codeType'
import {
  Query,
  FromTable,
  BinaryExpression,
  ColumnExpression,
  Value,
  FunctionExpression,
  ResultColumn,
  LikeExpression,
  LimitOffset,
  InExpression,
  ConditionalExpression
} from 'node-jql'
import { Op } from 'sequelize'

@Injectable()
export class CodeTypeTableService {
  constructor(
    @Inject('codeTypeRepository')
    private codeTypeRepository: typeof CodeType,
  ) {}

  async createOne(codeType: CodeType) {
    return await this.codeTypeRepository.create({
      ...codeType,
      status: 1
    })
  }

  async updateOne(codeType: CodeType) {
    const { id, ..._codeType } = codeType

    return await this.codeTypeRepository.update({ ..._codeType }, { where: { id } })
  }

  async listPage(codeType: CodeType) {
    const { valueCode, limit, page } = codeType

    const offset: number = page * limit - limit

    return this.codeTypeRepository.findAndCountAll({
      where: {
        ... valueCode ? { deptCode: { [Op.like]: `%${valueCode}%` } } : {},
        status: 1
      },
      limit,
      ... (page>1) ? { offset } : { }
    })
  }

  async voidOne(id: number) {
    return await this.codeTypeRepository.update({ status: 0 }, { where: { id } })
  }

  async getOne(id: number) {
    return await this.codeTypeRepository.findOne({ where: { id } })
  }

  async getAll() {
    return await this.codeTypeRepository.findAll({ where: { status: 1 } })
  }

  async findByType(codeType: CodeType) {
    const { type } = codeType
    return await this.codeTypeRepository.findAll({ where: { type } })
  }
}
