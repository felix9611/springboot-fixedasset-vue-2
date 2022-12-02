
import { Injectable, Inject } from '@nestjs/common'
import { InvRecord } from 'src/sequelize/models/invrecord'
import { Location } from 'src/sequelize/models/location'
import { AssetList } from 'src/sequelize/models/assetList'
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
import { invrecordList } from 'src/sequelize/interface/index'
import { LocationTableService } from 'src/sequelize/service/locationTableService'

@Injectable()
export class InvRecordTableService {
  constructor(
    @Inject('invRecordRepository')
    private invRecordRepository: typeof InvRecord,
    private locationTableService: LocationTableService,
  ) {}

  async createOne(invrecord: any){
    return await this.invRecordRepository.create({
      ...invrecord,
      status: 1
    })
  }

  async findAll(invrecord: invrecordList) {

    const { createdFrom, createdTo, page, limit } = invrecord

    const locList = await this.locationTableService.getAll()
    let allLocList : any[] = []

    locList.map( loc => {
      allLocList.push(loc['dataValues'])
    })


    InvRecord.belongsTo(AssetList, {
      targetKey: 'assetCode',
      foreignKey: 'assetCode'
    })

    const offset: number = page * limit - limit

    const invRecordListJSON = await this.invRecordRepository.findAndCountAll({
      include:[
        {
          model: AssetList,
          required: false,
          where: { status: 1 }
        },
      ],
      where: {
        ... (createdFrom && createdTo) ? {
          createdAt: {
            [Op.between]: [createdFrom, createdTo]
          }
        } : {}
      },
      limit,
      ... (page>1) ? { offset } : { },
      order: [['assetCode', 'DESC']]
    })

    let newRows: any[] = []

    invRecordListJSON.rows.forEach( x => {
      const mainObject = x['dataValues']

      const { AssetList: assetInform , placeFrom, placeTo, ..._mainObject } = mainObject

      const { assetName } = assetInform['dataValues']

      const fromPlace = allLocList.find( from => from.id === placeFrom )
      const toPlace = allLocList.find( from => from.id === placeTo )


      newRows.push({
        ..._mainObject,
        assetName,
        fromPlace,
        toPlace
      })
    })

    return {
      count: invRecordListJSON.count,
      rows: newRows
    }

  }
}
