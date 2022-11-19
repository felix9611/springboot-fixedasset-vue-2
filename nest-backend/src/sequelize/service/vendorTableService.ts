
import { Injectable, Inject } from '@nestjs/common'
import { Vendor } from 'src/sequelize/models/vendor'
import { Op } from 'sequelize'

@Injectable()
export class VendorTableService {
  constructor(
    @Inject('vendorRepository')
    private vendorRepository: typeof Vendor
  ) {}

  async createOne(vendor: Vendor) {
    let { vendorCode, ..._vendor } = vendor
    const count = await this.vendorRepository.count({ where: { vendorCode } })

    if ( count > 1 ) {
      throw new Error('Vendor code is exist')
    }

    return await this.vendorRepository.create({ status: 1, vendorCode, ..._vendor })
  }

  async updateOne(vendor: Vendor) {
    let { vendorCode, id, ..._vendor } = vendor
    const count = await this.vendorRepository.count({ where: { vendorCode } })

    if ( count > 1 ) {
      throw new Error('Vendor code is exist')
    }

    return await this.vendorRepository.update({ vendorCode, ..._vendor }, { where: { id } })
  }

  async getAll() {
    return await this.vendorRepository.findAll({ where: { status: 1 } })
  }

  async getOne(id: number) {
    return await this.vendorRepository.findOne({ where: { id } })
  }

  async voidOne(id: number) {
    return await this.vendorRepository.update({ status: 0 },{ where: { id } })
  }

  async listPage(vendor: Vendor) {
    let { vendorCode, vendorName, limit, page } = vendor

    const offset: number = page * limit - limit

    const data = this.vendorRepository.findAndCountAll({
      where: {
        ... vendorCode ? { vendorCode: { [Op.like]: `%${vendorCode}%` } } : {},
        ... vendorName ? { vendorName: { [Op.like]: `%${vendorName}` } } : {},
        status: 1
      },
      limit,
      ... (page>1) ? { offset } : { }
    })

    return data
  }
}
