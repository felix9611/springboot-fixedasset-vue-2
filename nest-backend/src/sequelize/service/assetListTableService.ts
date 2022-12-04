
import { Injectable, Inject } from '@nestjs/common'
import { AssetList } from 'src/sequelize/models/assetList'
import { Department } from 'src/sequelize/models/department'
import { AssetType } from 'src/sequelize/models/assetType'
import { Location } from 'src/sequelize/models/location'
import { WriteOff } from 'src/sequelize/models/writeOff'
import { AssetListFiles } from 'src/sequelize/models/assetListFiles'
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
const moment = require('moment')

import { VendorTableService } from 'src/sequelize/service/vendorTableService'
import { DepartmentTableService } from 'src/sequelize/service/departmentTableService'
import { AssetTypeTableService } from 'src/sequelize/service/assetTypeTableService'
import { LocationTableService } from 'src/sequelize/service/locationTableService'
import { InvRecordTableService } from 'src/sequelize/service/invRecordTableService'
import { ImportAsset } from 'src/sequelize/interface/import'
import { AssetFileImport } from 'src/sequelize/interface/index'

@Injectable()
export class AssetListTableService {
  constructor(
    @Inject('assetListRepository')
    private assetListRepository: typeof AssetList,
    @Inject('writeOffRepository')
    private writeOffRepository: typeof WriteOff,
    @Inject('assetListFilesRepository')
    private assetListFilesRepository: typeof AssetListFiles,
    private vendorTableService: VendorTableService,
    private departmentTableService: DepartmentTableService,
    private assetTypeTableService: AssetTypeTableService,
    private locationTableService: LocationTableService,
    private invRecordTableService: InvRecordTableService
  ){}

  async saveImage(assetFileImport: AssetFileImport) {
    let { assetId, fileList } = assetFileImport
    return fileList.forEach( async fl => {
      const { fileName, dataBase64 } = fl
      return await this.assetListFilesRepository.create({
        assetId,
        fileName,
        base64: dataBase64,
        status: 1
      })

    } )
  }

  async getPhotoData(assetId: number) {
    return await this.assetListFilesRepository.findAll({
      where: {
        status: 1,
        assetId
      }
    })
  }

  async voidFile(id: number) {
    return await this.assetListFilesRepository.update({ status: 0 }, { where: { id } })
  }

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

    const data = await this.assetListRepository.findAndCountAll({
      include:[
        {
          model: AssetType,
          required: false,
          where: { status: 1 }
        },
        {
          model: Department,
          required: false,
          where: { status: 1 }
        },
        {
          model: Location,
          required: false,
          where: { status: 1 }
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
      ... (page>1) ? { offset } : { },
      order: [['assetCode', 'DESC']]
    })

    return data
  }

  async listAll(assetList: AssetList) {
    let { status } = assetList

    AssetList.belongsTo(AssetType, {
        foreignKey: 'typeId'
    })

    AssetList.belongsTo(Department, {
        foreignKey: 'deptId'
    })

    AssetList.belongsTo(Location, {
        foreignKey: 'placeId'
    })

    AssetList.belongsTo(WriteOff, {
        targetKey: 'assetId',
        foreignKey: 'id'
    })

    const data = this.assetListRepository.findAndCountAll({
      include:[
        {
          model: AssetType,
          required: false,
          where: { status: 1 }
        },
        {
          model: Department,
          required: false,
          where: { status: 1 }
        },
        {
          model: Location,
          required: false,
          where: { status: 1 }
        },
        {
          model: WriteOff,
          required: false,
          // where: { status: 1 }
        },
      ],
      where: {
        status
      },
      order: [['assetCode', 'DESC']]
    })

    return data
  }

  async getOne(id: number) {
    return await this.assetListRepository.findOne({ where: { id } })
  }

  async getOneByCode(assetCode: string) {
    return await this.assetListRepository.findOne({ where: { assetCode } })
  }

  async findByCode(assetCode: string) {
    return await this.assetListRepository.findOne({ where: { assetCode, status: 1 } })
  }

  async createOne(assetList: AssetList) {
    const code = await this.assetListRepository.max('assetCode', { where: { status: 1 } })
    if (code) {
      const newCode = this.newCodeGen(6, code.toString())
      await this.invRecordTableService.createOne({ assetCode: newCode, placeTo: assetList.placeId, placeFrom: 0 })
      return await this.assetListRepository.create({ status: 1, assetCode: newCode, ...assetList})
    } else {
      await this.invRecordTableService.createOne({ assetCode: '000001', placeTo: assetList.placeId, placeFrom: 0 })
      return await this.assetListRepository.create({ status: 1, assetCode: '000001', ...assetList})
    }
  }

  async updateOne(assetList: AssetList) {
    const { id, ..._assetList } = assetList
    const asset = await this.getOne(id)
    const { placeId: oldPlaceId } = asset.toJSON()
    if ( _assetList.placeId !== oldPlaceId) {
      await this.invRecordTableService.createOne({assetCode: _assetList.assetCode, placeTo: assetList.placeId, placeFrom: oldPlaceId  })
    }
    return await this.assetListRepository.update(_assetList, { where: { id } })
  }

  async writteOffPrcoess(writeOff: WriteOff) {
    return await this.writeOffRepository.create({ ...writeOff , lastDay: moment().format() })
  }

  async voidOne(id: number) {
    return await this.assetListRepository.update({ status: 0 }, { where: { id } })
  }

  async importAsset(asset: ImportAsset) {
    const {
      assetName,
      typeCode,
      typeName,
      unit,
      buyDate,
      description,
      cost,
      serialNum,
      invoiceNo,
      invoiceDate,
      deptCode,
      deptName,
      placeCode,
      placeName,
      vendorCode,
      vendorName,
      remark
    } = asset

    let data: any = {
      assetName,
      unit,
      buyDate,
      description,
      cost,
      serialNumber: serialNum,
      invoiceNo,
      invoiceDate,
      remark
    }
    if ( typeName || typeCode ) {
      const { id } = await this.assetTypeTableService.findInfo(typeCode, typeName)
      data.typeId = id
    }

    if ( placeCode || placeName ) {
      const { id } = await this.locationTableService.findInfo(placeCode, placeName)
      data.placeId = id
    }

    if ( deptCode || deptName ) {
      const { id } = await this.departmentTableService.findInfo(deptCode, deptName)
      data.deptId = id
    }

    if ( vendorCode || vendorName ) {
      const { id } = await this.vendorTableService.findInfo(vendorCode, vendorName)
      data.deptId = id
    }

    return this.createOne(data)
  }

  async findAsset(assetList: AssetList) {
    const { placeId, assetCode } = assetList
    return await this.assetListRepository.findOne({ where: { placeId, assetCode, status: 1 } })
  }

  newCodeGen(len: number, code?: string) {
    let intCode = Number(code)
    let str = String(intCode + 1)
    while (str.length < len) str = '0' + str
    return str
  }
}
