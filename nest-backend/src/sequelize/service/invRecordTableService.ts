
import { Injectable, Inject } from '@nestjs/common'
import { InvRecord } from 'src/sequelize/models/invrecord'
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
  ConditionalExpression,
  OrderBy
} from 'node-jql'
import { Op } from 'sequelize'

@Injectable()
export class InvRecordTableService {
  constructor(
    @Inject('invRecordRepository')
    private invRecordRepository: typeof InvRecord,
  ) {}

  async createOne(invrecord: any){
    return await this.invRecordRepository.create({
      ...invrecord,
      status: 1
    })
  }

  async findAll(invrecord: InvRecord) {

    const { status } = invrecord

    const baseTableName = 'invrecord'

    const query = new Query({
      $from: new FromTable({
        table: baseTableName,
        joinClauses: [
          {
            operator: 'LEFT',
            table: new FromTable({
              table: 'asset_list',
              $as: 'asset'
            }),
            $on: [
              new BinaryExpression(
                new ColumnExpression(baseTableName, 'assetCode'),
                '=',
                new ColumnExpression('asset', 'assetCode')
              ),
            ],
          },
          {
            operator: 'LEFT',
            table: new FromTable({
              table: 'location',
              $as: 'fromLoc'
            }),
            $on: [
              new BinaryExpression(
                new ColumnExpression(baseTableName, 'placeFrom'),
                '=',
                new ColumnExpression('fromLoc', 'id')
              ),
            ],
          },
          {
            operator: 'LEFT',
            table: new FromTable({
              table: 'location',
              $as: 'toLoc'
            }),
            $on: [
              new BinaryExpression(
                new ColumnExpression(baseTableName, 'placeTo'),
                '=',
                new ColumnExpression('toLoc', 'id')
              ),
            ],
          }
        ]
      })
    })

    query.$select = [
      new ResultColumn(new ColumnExpression(baseTableName, 'assetCode'), 'assetCode'),
      new ResultColumn(new ColumnExpression('asset', 'assetName'), 'assetName'),
      new ResultColumn(new ColumnExpression('fromLoc', 'placeName'), 'fromPlaceName'),
    ]

    if (status) {
      query.$where = new BinaryExpression(new ColumnExpression('asset', 'status'), '=', new Value(status))
    }

    query.$order = [new OrderBy(new ColumnExpression(baseTableName, 'createdAt'), 'ASC')]



    return await this.invRecordRepository.sequelize.query(query.toString())

  }
}
