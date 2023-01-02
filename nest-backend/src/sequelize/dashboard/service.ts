import { AssetList } from 'src/sequelize/models/assetList'
import { Department } from 'src/sequelize/models/department'
import { AssetType } from 'src/sequelize/models/assetType'
import { Location } from 'src/sequelize/models/location'


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
   const { typeId, deptId, buyDate, placeId } = findDef

   let from = '', to = ''
   if (buyDate) {
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
          ... buyDate ? { buyDate: { [Op.between]: buyDate, [Op.ne]: null } } : { buyDate: { [Op.ne]: null   } },
          ... deptId ? { deptId } : {},
          ... typeId ? { typeId } : {},
          ... placeId ? { placeId } : {},
          status: 1,
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
   const { typeId, deptId, buyDate, placeId } = findDef

   let from = '', to = ''
   if (buyDate) {
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
          ... buyDate ? { buyDate: { [Op.between]: buyDate, [Op.ne]: null } } : { buyDate: { [Op.ne]: null   } },
          ... deptId ? { deptId } : {},
          ... typeId ? { typeId } : {},
          ... placeId ? { placeId } : {},
          status: 1,
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
     const { typeId, deptId, buyDate, placeId } = findDef

     let from = '', to = ''
     if (buyDate) {
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
          ... buyDate ? { buyDate: { [Op.between]: buyDate, [Op.ne]: null } } : { buyDate: { [Op.ne]: null   } },
          ... deptId ? { deptId } : {},
          ... typeId ? { typeId } : {},
          ... placeId ? { placeId } : {},
          status: 1,
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
     const { typeId, deptId, buyDate, placeId } = findDef

     let from = '', to = ''
     if (buyDate) {
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
          ... buyDate ? { buyDate: { [Op.between]: buyDate, [Op.ne]: null } } : { buyDate: { [Op.ne]: null   } },
          ... deptId ? { deptId } : {},
          ... typeId ? { typeId } : {},
          ... placeId ? { placeId } : {},
          status: 1,
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

  async getAssetCostsYearMonthByTypeFind(findDef: findDef) {
     const { typeId, deptId, buyDate, placeId } = findDef

     AssetList.belongsTo(AssetType, {
         foreignKey: 'typeId'
     })

    return await this.assetListRepository.findAll({
      include:[
        {
          attributes: ['typeName'],
          model: AssetType,
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
          ... buyDate ? { buyDate: { [Op.between]: buyDate, [Op.ne]: null } } : { buyDate: { [Op.ne]: null  } },
          ... deptId ? { deptId } : {},
          ... typeId ? { typeId } : {},
          ... placeId ? { placeId } : {},
          status: 1,
      },
      group: [
        Sequelize.fn('year', Sequelize.col('buyDate')),
        Sequelize.fn('MONTH', Sequelize.col('buyDate')),
        'typeId'
      ],
      order: [
        Sequelize.fn('year', Sequelize.col('buyDate')),
        Sequelize.fn('MONTH', Sequelize.col('buyDate')),
      ]

    })
  }

  async getAssetCountYearMonthByTypeFind(findDef: findDef) {
     const { typeId, deptId, buyDate, placeId } = findDef

     AssetList.belongsTo(AssetType, {
         foreignKey: 'typeId'
     })

    return await this.assetListRepository.findAll({
      include:[
        {
          attributes: ['typeName'],
          model: AssetType,
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
          ... buyDate ? { buyDate: { [Op.between]: buyDate, [Op.ne]: null } } : { buyDate: { [Op.ne]: null  } },
          ... deptId ? { deptId } : {},
          ... typeId ? { typeId } : {},
          ... placeId ? { placeId } : {},
          status: 1,
      },
      group: [
        Sequelize.fn('year', Sequelize.col('buyDate')),
        Sequelize.fn('MONTH', Sequelize.col('buyDate')),
        'typeId'
      ],
      order: [
        Sequelize.fn('year', Sequelize.col('buyDate')),
        Sequelize.fn('MONTH', Sequelize.col('buyDate')),
      ]

    })
  }

  async getAssetCostsYearMonthByPlaceFind(findDef: findDef) {
     const { typeId, deptId, buyDate, placeId } = findDef

     AssetList.belongsTo(Location, {
         foreignKey: 'placeId'
     })

    return await this.assetListRepository.findAll({
      include:[
        {
          attributes: ['placeName'],
          model: Location,
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
          ... buyDate ? { buyDate: { [Op.between]: buyDate, [Op.ne]: null } } : { buyDate: { [Op.ne]: null  } },
          ... deptId ? { deptId } : {},
          ... typeId ? { typeId } : {},
          ... placeId ? { placeId } : {},
          status: 1,
      },
      group: [
        Sequelize.fn('year', Sequelize.col('buyDate')),
        Sequelize.fn('MONTH', Sequelize.col('buyDate')),
        'typeId'
      ],
      order: [
        Sequelize.fn('year', Sequelize.col('buyDate')),
        Sequelize.fn('MONTH', Sequelize.col('buyDate')),
      ]

    })
  }

  async getAssetCountYearMonthByPlaceFind(findDef: findDef) {
     const { typeId, deptId, placeId, buyDate } = findDef

     AssetList.belongsTo(Location, {
         foreignKey: 'placeId'
     })

    return await this.assetListRepository.findAll({
      include:[
        {
          attributes: ['placeName'],
          model: Location,
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
          ... buyDate ? { buyDate: { [Op.between]: buyDate, [Op.ne]: null } } : { buyDate: { [Op.ne]: null  } },
          ... deptId ? { deptId } : {},
          ... typeId ? { typeId } : {},
          ... placeId ? { placeId } : {},
          status: 1,
      },
      group: [
        Sequelize.fn('year', Sequelize.col('buyDate')),
        Sequelize.fn('MONTH', Sequelize.col('buyDate')),
        'typeId'
      ],
      order: [
        Sequelize.fn('year', Sequelize.col('buyDate')),
        Sequelize.fn('MONTH', Sequelize.col('buyDate')),
      ]

    })
  }

}
