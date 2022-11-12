
import { Injectable, Inject } from '@nestjs/common'
import { Test } from '../models/test'
import { 
  Query,
  FromTable,
  BinaryExpression,
  ColumnExpression,
  Value,
  FunctionExpression,
  ResultColumn
} from 'node-jql'

@Injectable()
export class TestTableService {
  constructor(
    @Inject('testRepository')
    private tesrRepository: typeof Test
  ) {}

  async new(test: Test) {
    const data: any = await this.findMaxIdAndCode()

    const { code } = data[0][0]
    if (code) {
      const newCode = this.newCodeGen(6, code)
      return await this.tesrRepository.create({ status: 1, code: newCode, ...test})
    } else {
      
    }

    // return await this.tesrRepository.create({ status: 1, ...test})
  }

  async removeOne(id: number) {
    return await this.tesrRepository.update({ status: 0 }, { where: { id } })
  }

  async removeBatch(ids: any) {
    return await this.tesrRepository.update({ status: 0 }, { where: { ids } })
  }

  async update(id: number, test: Test) {
    const oriData = await this.tesrRepository.findOne({ where: { id } })
    if ( oriData ) {
      return await this.tesrRepository.update({ ...test }, { where: { id, status: 1 } })
    }
    return await this.new(test)
  }

  async findOne(id: number) {
    return await this.tesrRepository.findOne({ where: { id } })
  }

  async findMaxIdAndCode() {
    const baseTableName = 'tests'
    const query = new Query({
      $select: [
        new ResultColumn(new FunctionExpression('Max', new ColumnExpression(baseTableName, 'code')), 'code')
      ],
      $from: new FromTable({
        table: baseTableName
      }),
      $where: [
        new BinaryExpression(new ColumnExpression(baseTableName, 'status'), '=', new Value(1))
      ]
    })

    return await this.tesrRepository.sequelize.query(query.toString('mysql'))
  }

  newCodeGen(len: number, code?: string) {
    let intCode = Number(code)
    let str = String(intCode + 1)
    while (str.length < len) str = '0' + str
    return str
  }


}