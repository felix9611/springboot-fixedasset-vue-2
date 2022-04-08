import { Injectable, Inject } from '@nestjs/common'
import { SysMenu } from 'src/module/base/model/sysMenu'
import { SysRoleMenu } from 'src/module/base/model/sysRoleMenu'
import { SysUserRole } from '../model/sysUserRole'
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
  InExpression,
} from 'node-jql'
import { queryFindDept } from 'src/module/base/dto/queryFindList'
const arrayToTree = require('array-to-tree') 
import { MyRequest } from 'src/common/request'
import * as jwt from 'jsonwebtoken'
@Injectable()
export class SysMenuTableService {
  constructor(
    @Inject('sysMenuRepository')
    protected readonly sysMenuRepository: typeof SysMenu,
    @Inject('sysRoleMenuRepository')
    protected readonly sysRoleMenuRepository: typeof SysRoleMenu,
    @Inject('sysUserRoleRepository')
    protected readonly sysUserRoleRepository: typeof SysUserRole
  ) {}

  async saveNew(sysMenu: SysMenu) {

  }

  async findRoleWithMenu(request: MyRequest) {

    if (request.headers) {

      const { authorization } = request.headers
      const user: any = await this.verifyToken(authorization, 'secretKey')

      const roleUser = await this.sysUserRoleRepository.findOne({ where: { userId: user.id } })

      const getRoleMenuQuery = new Query({
        $select: [new ResultColumn(new ColumnExpression('sys_role_menu', 'menuId'))],
        $from: [new FromTable('sys_role_menu')],
        $where: [new BinaryExpression(new ColumnExpression('sys_role_menu', 'roleId'), '=', new Value(roleUser.roleId))],
      })

      const allMenu = await this.sysRoleMenuRepository.sequelize.query(getRoleMenuQuery.toString('mysql'), { type: QueryTypes.SELECT })

      const menuIdMap = allMenu.map( (r: any) => r.menuId)

      
      const getMenuMainQuery = new Query({
        $select: [new ResultColumn(new ColumnExpression('sys_menu', '*'))],
        $from: [new FromTable('sys_menu')],
        $where: [
          new AndExpressions([
            new InExpression(new ColumnExpression('sys_menu', 'id'), false, menuIdMap),
            new InExpression(new ColumnExpression('sys_menu', 'type'), true, new Value([2])),
            new BinaryExpression(new ColumnExpression('sys_menu', 'status'), '=', new Value(1))
          ])
        ] 
      })

      const allMenuMain = await this.sysMenuRepository.sequelize.query(getMenuMainQuery.toString('mysql'), { type: QueryTypes.SELECT })

      const test2 = arrayToTree(allMenuMain , {
        parentProperty: 'parentId'
      })

      const authoritys = [...new Set(allMenuMain.map( (x: any) => x.perms))]

      return { nav: test2, authoritys } 
    }
  }

  private verifyToken(token: string, secret: string): Promise<any> {
    return new Promise((resolve) => {
      jwt.verify(token, secret, (error, payload) => {
        if (error) {
          console.log('-----------error start--------------');
          console.log(error);
          console.log('-----------error end--------------');
        } else {
          resolve(payload);
        }
      })
    })
  }
  
}