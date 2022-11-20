
import { Injectable, Inject } from '@nestjs/common'
import { AssetList } from 'src/sequelize/models/assetList'
import { Department } from 'src/sequelize/models/department'
import { AssetType } from 'src/sequelize/models/assetType'
import { Location } from 'src/sequelize/models/location'

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
import { Sequelize, HasOne, HasMany } from 'sequelize-typescript'

@Injectable()
export class AssetListTableService {
  constructor(
    @Inject('assetListRepository')
    private assetListRepository: typeof AssetList,
  ){}

  async listPage(assetList: AssetList) {
    let { assetCode, assetName, placeId, deptId, buyDate, typeId, limit, page } = assetList

    const offset: number = page * limit - limit

    AssetList.belongsTo(AssetType, {
        foreignKey: 'typeId'
    })

    AssetList.belongsTo(Department, {
        foreignKey: 'deptId'
    })

    AssetList.belongsTo(Location, {
        foreignKey: 'placeId'
    })

    const data = this.assetListRepository.findAndCountAll({
      include:[
        {
          model: AssetType,
          required: false
        },
        {
          model: Department,
          required: false
        },
        {
          model: Location,
          required: false
        },
      ],
      where: {
        ... assetCode ? { assetCode: { [Op.like]: `%${assetCode}%` } } : {},
        ... assetName ? { assetName: { [Op.like]: `%${assetName}%` } } : {},
        ... buyDate ? { buyDate: { [Op.between]: buyDate } } : {},
        ... placeId ? { placeId } : {},
        ... deptId ? { deptId } : {},
        ... typeId ? { typeId } : {},
        status: 1
      },
      limit,
      ... (page>1) ? { offset } : { }
    })

    return data
  }

  async getOne(id: number) {
    return await this.assetListRepository.findOne({ where: { id } })
  }

  async findByCode(assetCode: string) {
    return await this.assetListRepository.findOne({ where: { assetCode, status: 1 } })
  }

  async createOne(assetList: AssetList) {
    const code = await this.assetListRepository.max('assetCode', { where: { status: 1 } })
    if (code) {
      const newCode = this.newCodeGen(6, code.toString())
      return await this.assetListRepository.create({ status: 1, assetCode: newCode, ...assetList})
    } else {
      return await this.assetListRepository.create({ status: 1, assetCode: '000001', ...assetList})
    }
  }

  async updateOne(assetList: AssetList) {
    const { id, ..._assetList } = assetList
    return await this.assetListRepository.update(_assetList, { where: { id } })
  }

  async voidOne(id: number) {
    return await this.assetListRepository.update({ status: 0 }, { where: { id } })
  }

  newCodeGen(len: number, code?: string) {
    let intCode = Number(code)
    let str = String(intCode + 1)
    while (str.length < len) str = '0' + str
    return str
  }
}
