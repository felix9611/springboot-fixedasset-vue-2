import { Injectable, Inject } from '@nestjs/common'
import { SysRoleMenu } from 'src/module/base/model/sysRoleMenu'
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
export class SysRoleMenuTableService {
  constructor(
    @Inject('sysRoleMenuRepository')
    protected readonly sysRoleMenuRepository: typeof SysRoleMenu
  ) {}
}