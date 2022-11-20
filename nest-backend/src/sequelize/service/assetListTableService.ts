
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
import { Sequelize, HasOne } from 'sequelize-typescript'

@Injectable()
export class AssetListTableService {
  constructor(
    @Inject('assetListRepository')
    private assetListRepository: typeof AssetList,
  ){}

  async listPage(assetList: AssetList) {
    let { assetCode, assetName, placeId, deptId, buyDate, typeId, limit, page } = assetList

    const offset: number = page * limit - limit

    const data = this.assetListRepository.findAndCountAll({
      include:[
        /* {
           model: Department,
           as:'dept',
           required: false,
           attributes: { exclude: ['createdAt', 'updatedAt', 'id',  'remark'] }
        },
        {
           model: AssetType,
           as:'type',
           required: false,
           attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'remark'] }
        },
        {
           model: Location,
           as:'place',
           required: false,
           attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'remark'] }
        } */
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

  async createOne(assetList: AssetList) {
    const data: any = await this.findMaxIdAndCode()

    const { code } = data[0][0]
    if (code) {
      const newCode = this.newCodeGen(6, code)
      return await this.assetListRepository.create({ status: 1, assetCod: newCode, ...assetList})
    } else {
      return await this.assetListRepository.create({ status: 1, assetCode: '000001', ...assetList})
    }
  }

  async findMaxIdAndCode() {
    const baseTableName = 'asset_list'
    const query = new Query({
      $select: [
        new ResultColumn(new FunctionExpression('Max', new ColumnExpression(baseTableName, 'assetCode')), 'assetCode')
      ],
      $from: new FromTable({
        table: baseTableName
      }),
      $where: [
        new BinaryExpression(new ColumnExpression(baseTableName, 'status'), '=', new Value(1))
      ]
    })

    return await this.assetListRepository.sequelize.query(query.toString('mysql'))
  }

  newCodeGen(len: number, code?: string) {
    let intCode = Number(code)
    let str = String(intCode + 1)
    while (str.length < len) str = '0' + str
    return str
  }
}
