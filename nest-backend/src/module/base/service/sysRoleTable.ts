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
export class SysRoleTabeService{
  constructor(
    @Inject('sysRoleRepository')
    protected readonly sysUserRepository: typeof SysRole
  ) {}

  async save(sysRole: SysRole) {
    const { name, code, remark, id } = sysRole
    if (id) {
      return await this.sysUserRepository.update({
        name,
        code,
        remark,
      },{
        where: {
          id,
          status: 1
        }
      })
    } else {
      return await this.sysUserRepository.create({
        name,
        code,
        remark,
        status: 1
      })
    }
  }

  async findList(query: queryFindRole) {
    const { name, page, limit } = query
    const queryFind = new Query({
      $select: [new ResultColumn(new ColumnExpression('sys_role', '*'))],
      $from: [new FromTable('sys_role')],
      $where: [
        new AndExpressions({
          expressions: [
            name? new LikeExpression(new ColumnExpression('sys_role', 'name'), false, `%${name}%`): new Value(1)
          ]
        })
      ],
      $order: [new OrderBy({
        expression: new ColumnExpression('sys_role', 'id'),
        order: 'DESC'
      })],
      $limit: new LimitOffset(limit, page)
    })
    return this.sysUserRepository.sequelize.query(queryFind.toString('mysql'), { type: QueryTypes.SELECT })
  }
  
}