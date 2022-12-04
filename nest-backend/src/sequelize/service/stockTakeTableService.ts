
import { Injectable, Inject } from '@nestjs/common'
import { StockTake } from 'src/sequelize/models/stocktake'
import { Location } from 'src/sequelize/models/location'
import { AssetList } from 'src/sequelize/models/assetList'
import { StockTakeItem } from 'src/sequelize/models/stockTakeItem'
import { Op } from 'sequelize'
const moment = require('moment')

@Injectable()
export class StockTakeTableService {
  constructor(
    @Inject('stockTakeRepository')
    private stockTakeRepository: typeof StockTake,
    @Inject('stockTakeItemRepository')
    private stockTakeItemRepository: typeof StockTakeItem,
  ) {}

  async voidOne(id: number) {
    return await this.stockTakeRepository.update({ status: 0 }, { where: { id } })
  }

  async finishOne(id: number) {
    return await this.stockTakeRepository.update({ status: 2, finishTime: moment().format('DD-MM-YYYY HH:MM') }, { where: { id } })
  }

  async itemStockTakeAction(stockTakeItem: StockTakeItem) {
    return await this.stockTakeItemRepository.create({
      ...stockTakeItem,
      checkTime: moment().format('DD-MM-YYYY HH:MM')
    })
  }

  async createOne(stocktake: StockTake) {
    return await this.stockTakeRepository.create({
      ...stocktake,
      status: 1
    })
  }

  async itemListAll(stockTakeItem: StockTakeItem) {
    const { stocktakeId, limit, page } = stockTakeItem
    const offset: number = page * limit - limit

    StockTakeItem.belongsTo(Location, {
      targetKey: 'id',
      foreignKey: 'placeId'
    })

    StockTakeItem.belongsTo(AssetList, {
      targetKey: 'id',
      foreignKey: 'assetId'
    })

    return await this.stockTakeItemRepository.findAndCountAll({
      include:[
        {
          model: Location,
          required: false,
          where: { status: 1 }
        },
        {
          model: AssetList,
          required: false,
          where: { status: 1 }
        },
      ],
      where: {
        stocktakeId
      },
      limit,
      ... (page>1) ? { offset } : { },
      order: [['assetCode', 'DESC']]
    })
  }

  async listAll(stocktake: StockTake) {
    const { actionName, limit, page } = stocktake
    const offset: number = page * limit - limit

    StockTake.belongsTo(Location, {
      targetKey: 'id',
      foreignKey: 'actionPlace'
    })

    return await this.stockTakeRepository.findAndCountAll({
      include:[
        {
          model: Location,
          required: false,
          where: { status: 1 }
        },
      ],
      where: {
        ...actionName ? { actionName: { [Op.like]: `%${actionName}%` } } : {},
      },
      limit,
      ... (page>1) ? { offset } : { },
      order: [['actionName', 'DESC']]
    })
  }

  async getOne(id: number) {
    return await this.stockTakeRepository.findOne({ where: { id }})
  }
}
