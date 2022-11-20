
import { Injectable, Inject } from '@nestjs/common'
import { AssetType } from 'src/sequelize/models/assetType'
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
export class AssetTypeTableService {
  constructor(
    @Inject('assetTypeRepository')
    private assetTypeRepository: typeof AssetType,
  ) {}

  async create(assetType: AssetType) {
    const { typeCode } = assetType
    // const  { typeCode: oldTypeCode }  = await this.assetTypeRepository.findOne({ where: { status: 1, typeCode  }  })
    // if (!oldTypeCode) {
      return await this.assetTypeRepository.create({ status: 1, typeCode, ...assetType  })
    // }
  }

  async getOne(id: number) {
    return await this.assetTypeRepository.findOne({ where: { id } })
  }

  async getAll() {
    return await this.assetTypeRepository.findAll({ where: { status: 1 } })
  }

  async updateOne(assetType: AssetType) {
    const { id, ..._assetType } = assetType
    return await this.assetTypeRepository.update({ ..._assetType }, { where: { id } })
  }

  async voidOne(id: number) {
    return await this.assetTypeRepository.update({ status: 0 }, { where: { id } })
  }

  async listPage(assetType: AssetType) {
    let { typeCode, typeName, limit, page } = assetType

    const offset: number = page * limit - limit

    const data = this.assetTypeRepository.findAndCountAll({
      where: {
        ... typeCode ? { typeCode: { [Op.like]: `%${typeCode}%` } } : {},
        ... typeName ? { typeName: { [Op.like]: typeName } } : {},
        status: 1
      },
      limit,
      ... (page>1) ? { offset } : { }
    })

    return data
  }

  async findInfo(typeCode?: string, typeName?: string) {
    return await this.assetTypeRepository.findOne({ where: { typeCode, typeName, status: 1 } })
  }
}
