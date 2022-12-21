import { AssetList } from 'src/sequelize/models/assetList'
import { Department } from 'src/sequelize/models/department'

import { Injectable, Inject } from '@nestjs/common'
import { Sequelize } from 'sequelize-typescript'
import { findDef } from './interface'
import { Op } from 'sequelize'

@Injectable()
export class DasboardService {
  constructor(
    @Inject('assetListRepository')
    private assetListRepository: typeof AssetList,
  ) {}

  async getAssetCostYearMonthFind(findDef: findDef) {
   const { typeId, deptId, buyDate } = findDef

   let from = '', to = ''
   if (buyDate && buyDate.length > 1) {
     from = buyDate[0]
     to = buyDate[1]
   }

    return await this.assetListRepository.findAll({
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('cost')), 'costs'],
        [Sequelize.fn('year', Sequelize.col('buyDate')), 'year'],
        [Sequelize.fn('MONTH', Sequelize.col('buyDate')), 'month']
      ],
      where: {
          ... buyDate ? { buyDate: { [Op.between]: [from, to] } } : {},
          ... deptId ? { deptId } : {},
          ... typeId ? { typeId } : {},
          status: 1
      },
      group: [
        Sequelize.fn('year', Sequelize.col('buyDate')),
        Sequelize.fn('MONTH', Sequelize.col('buyDate')),
        'buyDate'
      ],
      order: [
        Sequelize.fn('year', Sequelize.col('buyDate')),
        Sequelize.fn('MONTH', Sequelize.col('buyDate')),
      ]
    })
  }

  async getAssetItemsYearMonthFind(findDef: findDef) {
   const { typeId, deptId, buyDate } = findDef

   let from = '', to = ''
   if (buyDate && buyDate.length > 1) {
     from = buyDate[0]
     to = buyDate[1]
   }

    return await this.assetListRepository.findAll({
      attributes: [
        [Sequelize.fn('count', Sequelize.col('id')), 'count'],
        [Sequelize.fn('year', Sequelize.col('buyDate')), 'year'],
        [Sequelize.fn('MONTH', Sequelize.col('buyDate')), 'month']
      ],
      where: {
          ... buyDate ? { buyDate: { [Op.between]: [from, to] } } : {},
          ... deptId ? { deptId } : {},
          ... typeId ? { typeId } : {},
          status: 1
      },
      group: [
        Sequelize.fn('year', Sequelize.col('buyDate')),
        Sequelize.fn('MONTH', Sequelize.col('buyDate'))
      ],
      order: [
        Sequelize.fn('year', Sequelize.col('buyDate')),
        Sequelize.fn('MONTH', Sequelize.col('buyDate')),
      ]

    })
  }

  async getAssetCountsYearMonthByDeptFind(findDef: findDef) {
     const { typeId, deptId, buyDate } = findDef

     let from = '', to = ''
     if (buyDate && buyDate.length > 1) {
       from = buyDate[0]
       to = buyDate[1]
     }

     AssetList.belongsTo(Department, {
         foreignKey: 'deptId'
     })

    return await this.assetListRepository.findAll({
      include:[
        {
          attributes: ['deptName'],
          model: Department,
          required: false,
          where: { status: 1 }
        },
      ],
      attributes: [
        [Sequelize.fn('count', Sequelize.col('assetList.id')), 'count'],
        [Sequelize.fn('year', Sequelize.col('buyDate')), 'year'],
        [Sequelize.fn('MONTH', Sequelize.col('buyDate')), 'month'],

      ],
      where: {
          ... buyDate ? { buyDate: { [Op.between]: [from, to] } } : {},
          ... deptId ? { deptId } : {},
          ... typeId ? { typeId } : {},
          status: 1
      },
      group: [
        Sequelize.fn('year', Sequelize.col('buyDate')),
        Sequelize.fn('MONTH', Sequelize.col('buyDate')),
        'deptId'
      ],
      order: [
        Sequelize.fn('year', Sequelize.col('buyDate')),
        Sequelize.fn('MONTH', Sequelize.col('buyDate')),
      ]

    })
  }

    async getAssetCostsYearMonthByDeptFind(findDef: findDef) {
     const { typeId, deptId, buyDate } = findDef

     let from = '', to = ''
     if (buyDate && buyDate.length > 1) {
       from = buyDate[0]
       to = buyDate[1]
     }

     AssetList.belongsTo(Department, {
         foreignKey: 'deptId'
     })

    return await this.assetListRepository.findAll({
      include:[
        {
          attributes: ['deptName'],
          model: Department,
          required: false,
          where: { status: 1 }
        },
      ],
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('cost')), 'costs'],
        [Sequelize.fn('year', Sequelize.col('buyDate')), 'year'],
        [Sequelize.fn('MONTH', Sequelize.col('buyDate')), 'month'],

      ],
      where: {
          ... buyDate ? { buyDate: { [Op.between]: [from, to] } } : {},
          ... deptId ? { deptId } : {},
          ... typeId ? { typeId } : {},
          status: 1
      },
      group: [
        Sequelize.fn('year', Sequelize.col('buyDate')),
        Sequelize.fn('MONTH', Sequelize.col('buyDate')),
        'deptId'
      ],
      order: [
        Sequelize.fn('year', Sequelize.col('buyDate')),
        Sequelize.fn('MONTH', Sequelize.col('buyDate')),
      ]

    })
  }
}
