import { Injectable, Inject } from '@nestjs/common'
import { SysRole } from 'src/module/base/model/sysRole'
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
import { hashPw, comparePw } from 'src/common/password'
import { JwtService } from '@nestjs/jwt'
import { queryFindRole } from 'src/module/base/dto/queryFindList'

@Injectable()
export class SysRoleTableService{
  constructor(
    @Inject('sysRoleRepository')
    protected readonly sysRoleRepository: typeof SysRole
  ) {}

  async save(data: SysRole) {
    if (data && data.id) {
      const { roleCode, roleName, remark, id } = data 
      return await this.sysRoleRepository.update(
        {
          roleName,
          roleCode,
          remark
        }
        ,{
        where: {
          id,
          status: 1
        }
      })
    } else {
      const { roleCode, roleName, remark } = data
      return await this.sysRoleRepository.create({ roleCode, roleName, remark , status: 1})
    }
  }

  async void(id: number) {
    return await this.sysRoleRepository.update({ status: 0 }, { where: { id }})
  }

  async findList(query: queryFindRole) {
    const { name, page, limit } = query
    const queryFind = new Query({
      $select: [new ResultColumn(new ColumnExpression('sys_role', '*'))],
      $from: [new FromTable('sys_role')],
      $where: [
        new AndExpressions({
          expressions: [
            name? new LikeExpression(new ColumnExpression('sys_role', 'name'), false, `%${name}%`): new Value(1),
            new BinaryExpression(new ColumnExpression('sys_role', 'status'), '=', new Value(1))
          ]
        })
      ],
      $order: [new OrderBy({
        expression: new ColumnExpression('sys_role', 'id'),
        order: 'DESC'
      })],
      $limit: new LimitOffset(limit, page)
    })
    return this.sysRoleRepository.sequelize.query(queryFind.toString('mysql'), { type: QueryTypes.SELECT })
  }

  async findAll() {
    const query = new Query({
      $select: [new ResultColumn(new ColumnExpression('sys_role', '*'))],
      $from: [new FromTable('sys_role')],
      $where: [new BinaryExpression(new ColumnExpression('sys_role', 'status'), '=', new Value(1))],
      $order: [new OrderBy({
        expression: new ColumnExpression('sys_role', 'id'),
        order: 'DESC'
      })]
    })

    return this.sysRoleRepository.sequelize.query(query.toString('mysql'), { type: QueryTypes.SELECT })
  }
  async findOne(id: number) {
    return this.sysRoleRepository.findOne({ where: { id }})
  }
  
}