import { Injectable, Inject } from '@nestjs/common'
import { Department } from 'src/module/base/model/deparment'
import { QueryTypes } from 'sequelize'
import { 
  Query, 
  FromTable, 
  ColumnExpression, 
  ResultColumn, 
  BinaryExpression, 
  Value, 
  OrderBy, 
  LikeExpression, 
  AndExpressions,
  LimitOffset,
} from 'node-jql'
import { queryFindDept } from 'src/module/base/dto/queryFindList'

@Injectable()
export class DepartmentTabeService{
  constructor(
    @Inject('departmentRepository')
    protected readonly departmentRepository: typeof Department,
  ) {}

  async findAllTwo() {
    const query = new Query({
      $select: [new ResultColumn(new ColumnExpression('department', '*'))],
      $from: [new FromTable('department')],
      $where: [new BinaryExpression(new ColumnExpression('department', 'status'), '=', new Value(1))],
      $order: [new OrderBy({
        expression: new ColumnExpression('department', 'id'),
        order: 'DESC'
      })]
    })

    return this.departmentRepository.sequelize.query(query.toString('mysql'), { type: QueryTypes.SELECT })
  }

  async findAllList(query: queryFindDept) {
    const { page, limit, deptCode, deptName } = query

    const queryFind = new Query({
      $select: [new ResultColumn(new ColumnExpression('department', '*'))],
      $from: [new FromTable('department')],
      $where: [
        new AndExpressions({
          expressions: [
            deptCode? new LikeExpression(new ColumnExpression('department', 'deptCode'), false, `%${deptCode}%`): new Value(1),
            deptName? new LikeExpression(new ColumnExpression('department', 'deptName'), false, `%${deptName}%`): new Value(1),
          ]
        })
      ],
      $order: [new OrderBy({
        expression: new ColumnExpression('department', 'id'),
        order: 'DESC'
      })],
      $limit: new LimitOffset(limit, page)
    })

    return this.departmentRepository.sequelize.query(queryFind.toString('mysql'), { type: QueryTypes.SELECT })
  }

  async save(department: Department) {
    if (department && department.id) {
      const { id, deptCode, deptName, remark, deptOtherName } = department
        return await this.departmentRepository.update({
          deptCode,
          deptName,
          remark,
          deptOtherName
        },
        {
          where: {
            id,
            status: 1
          }
        })
    } else {
      const { deptCode, deptName, remark, deptOtherName } = department
      return await this.departmentRepository.create({
        deptCode,
        deptName,
        remark,
        deptOtherName,
        status: 1
      })
    }
  }

  async voidData(id: number) {
    return await this.departmentRepository.update({ status: 0 }, { where: { id } })
  }

  async getOne(id: number) {
    return await this.departmentRepository.findOne({ where: { id } })
  }


} 