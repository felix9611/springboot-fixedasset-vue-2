
import { Injectable, Inject } from '@nestjs/common'
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
  InExpression
} from 'node-jql'
import { Op } from 'sequelize'

@Injectable()
export class LocationTableService {
  constructor(
    @Inject('locationRepository')
    private locationRepository: typeof Location,
  ) {}

  async createOne(location: Location) {
    return await this.locationRepository.create({ ...location, status: 1 })
  }

  async getAll() {
    return await this.locationRepository.findAll({ where: { status: 1 } })
  }

  async getOne(id: number) {
    return await this.locationRepository.findOne({ where: { id }})
  }

  async updateOne(location: Location) {
    const { id, ..._location } = location
    return await this.locationRepository.update({ ..._location }, { where: {id} })
  }

  async voidOne(id: number) {
    return await this.locationRepository.update({ status: 0 }, { where: {id} })
  }

  async listPage(location: Location) {
    const { placeCode, placeName, page, limit } = location

    const offset: number = page * limit - limit

    const data = this.locationRepository.findAndCountAll({
      where: {
        ... placeCode ? { placeCode: { [Op.like]: `%${placeCode}%` } } : {},
        ... placeName ? { placeName: { [Op.like]: `%${placeName}%` } } : {},
        status: 1
      },
      limit,
      ... (page>1) ? { offset } : { }
    })

    return data
  }

  async findInfo(placeCode?: string, placeName?: string) {
    return await this.locationRepository.findOne({ where: { placeCode, placeName, status: 1 } })
  }
}
