
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
    /*
    const baseTableName = 'asset_type'
    const dbName = 'fixedasset_nest_vue'

    const query = new Query({
      $from: new FromTable({
        table: baseTableName
      }),
      $where: [
        new BinaryExpression(new ColumnExpression(baseTableName, 'status'), '=', new Value(1))
      ]
    })

    query.$select = [
      new ResultColumn(new ColumnExpression(baseTableName, 'id'), 'id'),
      new ResultColumn(new ColumnExpression(baseTableName, 'typeCode'), 'typeCode'),
      new ResultColumn(new ColumnExpression(baseTableName, 'typeName'), 'typeName'),
      new ResultColumn(new ColumnExpression(baseTableName, 'remark'), 'remark'),
      new ResultColumn(new ColumnExpression(baseTableName, 'createdAt'), 'createdAt'),
      new ResultColumn(new ColumnExpression(baseTableName, 'updatedAt'), 'updatedAt'),
      new ResultColumn(new ColumnExpression(baseTableName, 'status'), 'status'),
    ]


    query.$where = new BinaryExpression(new ColumnExpression(baseTableName, 'status'), '=', new Value(1))
    if (typeCode) query.$where = new LikeExpression(new ColumnExpression(baseTableName, 'typeCode'), false, `%${typeCode}%`)
    if (typeName) query.$where = new LikeExpression(new ColumnExpression(baseTableName, 'typeName'), false, `%${typeName}%`)

    const offset: number = page * limit - limit
    if (limit) {
      if (page>1) {
        query.$limit = new LimitOffset(limit, offset)
      } else if (page === 1) {
        query.$limit = new LimitOffset(limit)
      }
    }


    const queryCount = new Query({
      $select: [
        new ResultColumn(new FunctionExpression('count', new ColumnExpression('*')), 'count')
      ],
      $from: new FromTable({
        database: dbName,
        table: baseTableName
      }),
      $where: [

      ]
    })

    queryCount.$where = query.$where

    const dataCount = await this.assetTypeRepository.sequelize.query(queryCount.toString('mysql'))
    const [ total ] = dataCount

    return {
      record: await this.assetTypeRepository.sequelize.query(query.toString('mysql')),
      total: total[0]['count'],
      size: limit,
      current: page
    }*/
  }
}
