import { Injectable, Inject } from '@nestjs/common'
import { SysMenu } from 'src/module/base/model/sysMenu'
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
export class SysMenuTableService {
  constructor(
    @Inject('sysMenuRepository')
    protected readonly sysMenuRepository: typeof SysMenu,
  ) {}

  async saveNew(sysMenu: SysMenu) {

  }

  
}