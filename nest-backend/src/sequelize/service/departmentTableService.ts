
import { Injectable, Inject } from '@nestjs/common'
import { Department } from 'src/sequelize/models/department'
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
export class DepartmentTableService {
  constructor(
    @Inject('departmentRepository')
    private departmentRepository: typeof Department,
  ) {}

  async getOne(id: number) {
    return await this.departmentRepository.findOne({ where: { id }})
  }

  async getAll() {
    return await this.departmentRepository.findAll({ where: { status: 1 }})
  }

  async createOne(department: Department) {
    let { deptCode, ..._department } = department
    const count = await this.departmentRepository.count({ where: { deptCode } })
    if (count === 0) {
      return await this.departmentRepository.create({ status: 1, deptCode, ..._department })
    } else if (count > 1) {
      throw new Error('The department code has exist')
    }
  }

  async updateOne(department: Department) {
    let { deptCode, id, ..._department } = department
    return await this.departmentRepository.update({ deptCode, ..._department }, { where: { id } })
  }

  async voidOne(id: number) {
    return await this.departmentRepository.update({ status: 0 }, { where: { id } })
  }

  async listPage(department: Department) {
    const { deptCode, deptName, page, limit } = department

    const offset: number = page * limit - limit

    const data = this.departmentRepository.findAndCountAll({
      where: {
        ... deptCode ? { deptCode: { [Op.like]: `%${deptCode}%` } } : {},
        ... deptName ? { deptName: { [Op.like]: `%${deptName}%` } } : {},
        status: 1
      },
      limit,
      ... (page>1) ? { offset } : { }
    })

    return data
  }

  async findInfo(deptCode?: string, deptName?: string) {
    return await this.departmentRepository.findOne({ where: { deptCode, deptName, status: 1 } })
  }

}
