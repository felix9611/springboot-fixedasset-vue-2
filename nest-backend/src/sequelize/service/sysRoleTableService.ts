
import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { SysRole } from 'src/sequelize/models/sysRole'
import { SysMenu } from 'src/sequelize/models/sysMenu'
import { SysRoleMenu } from 'src/sequelize/models/SysRoleMenu'
import { SysMenuTableService } from './sysMenuTableService'
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
import { SysUserRole } from 'src/sequelize/models/SysUserRole'
import { Op } from 'sequelize'


@Injectable()
export class SysRoleTableService {
  constructor(
    @Inject('sysRoleRepository')
    private sysRoleRepository: typeof SysRole,
    @Inject('sysMenuRepository')
    private sysMeunRepository: typeof SysMenu,
    @Inject('sysUserRoleRepository')
    private sysUserRoleRepository: typeof SysUserRole,
    @Inject('sysRoleMenuRepository')
    private sysRoleMenuRepository: typeof SysRoleMenu
  ) {}

  async create(sysRole: SysRole) {
    const code = await this.sysRoleRepository.findOne({ where: { code: sysRole.code } })

    if (!code) {
      return await this.sysRoleRepository.create({ status: 1, ...sysRole })
    }
    throw new Error('The code has exist')
  }

  async update(sysRole: SysRole) {
    const { id, ..._sysRole } = sysRole
    return await this.sysRoleRepository.update({ status: 1, ..._sysRole }, { where: { id } })
  }

  async getOne(id: number) {
    return await this.sysRoleRepository.findOne({ where: { id } })
  }

  async getAll() {
    return await this.sysRoleRepository.findAll({ where: { status: 1 } })
  }

  async getAllRole(roles: any) {
    return await this.sysRoleRepository.findAll({ where: { id: roles } })
  }

  async voidOne(id: number) {
    return await this.sysRoleRepository.update({ status: 0 }, { where: { id } })
  }

  async getUserRole(userId: string) {
    return await this.sysUserRoleRepository.findAll({ where: { userId }})
  }

  async menuhandle(roleId: number) {
    const menu = await this.sysRoleMenuRepository.findAll({ where: { roleId }})
    let role = await this.sysRoleRepository.findOne({ where: { id: roleId } })
    const menuIds = menu.map(x => x.menuId)
    const newRole = role.toJSON()
    const roleOne = { ...newRole, menuIds }
    return roleOne
  }

  async roleshandleUpdate(roleIds: any, userId: string) {
    await this.sysUserRoleRepository.destroy({ where: { userId } })

    return roleIds.map( async x => {
      await this.sysUserRoleRepository.create({ roleId: x, userId })
    })
  }

  async menuhandleUpdate(roleId: number, menuIds: any) {
    await this.sysRoleMenuRepository.destroy({ where: { roleId } })

    return menuIds.map( async x => {
      await this.sysRoleMenuRepository.create({ status: 1, menuId: x, roleId })
    })
  }

  async findWithList(sysRole: SysRole) {
    const { status, code, name, page, limit } = sysRole

    const offset: number = page * limit - limit

    const data = this.sysRoleRepository.findAndCountAll({
      where: {
        ... name ? { typeCode: { [Op.like]: name } } : {},
        ... code ? { typeName: { [Op.like]: code } } : {},
        status: 1
      },
      limit,
      ... (page>1) ? { offset } : { }
    })

    return data

    /* const baseTableName = 'sys_role'
    const dbName = 'fixedasset_nest_vue'

    const query = new Query({
      $from: new FromTable({
        database: dbName,
        table: baseTableName
      })
    })

    query.$select = [
      new ResultColumn(new ColumnExpression(baseTableName, 'id'), 'id'),
      new ResultColumn(new ColumnExpression(baseTableName, 'name'), 'name'),
      new ResultColumn(new ColumnExpression(baseTableName, 'code'), 'code'),
      new ResultColumn(new ColumnExpression(baseTableName, 'remark'), 'remark'),
      new ResultColumn(new ColumnExpression(baseTableName, 'createdAt'), 'createdAt'),
      new ResultColumn(new ColumnExpression(baseTableName, 'updatedAt'), 'updatedAt'),
      new ResultColumn(new ColumnExpression(baseTableName, 'status'), 'status'),
    ]

    // if (status)
    query.$where = new BinaryExpression(new ColumnExpression(baseTableName, 'status'), '=', new Value(1))
    if (name) query.$where = new LikeExpression(new ColumnExpression(baseTableName, 'name'), false, `%${name}%`)
    if (code) query.$where = new LikeExpression(new ColumnExpression(baseTableName, 'code'), false, `%${code}%`)
    const offset: number = page * limit - limit
    if (limit) {
      if (page>1) {
        query.$limit = new LimitOffset(limit, offset)
      } else if (page === 1) {
        query.$limit = new LimitOffset(limit)
      }
    }

    const queryCount = new Query({
      $select: [
        new ResultColumn(new FunctionExpression('count', new ColumnExpression('*')), 'count')
      ],
      $from: new FromTable({
        database: dbName,
        table: baseTableName
      }),
    })

    queryCount.$where = query.$where


    const dataCount = await this.sysRoleRepository.sequelize.query(queryCount.toString('mysql'))
    const [ total ] = dataCount

    return {
      record: await this.sysRoleRepository.sequelize.query(query.toString('mysql')),
      total: total[0]['count'],
      size: limit,
      current: page
    } */

  }

  async getPagesByRole(roles: any) {
    const roleArray = await this.sysRoleRepository.findAll({ where: { id: roles } })
    let pages = roleArray.map( x => x.pages)
    console.log('Getting Pages...', pages)
    return await this.sysMeunRepository.findAll({ where: { id: pages } })
  }

  async getPagesByUser(userId: String) {
    const rolesUser = await this.sysUserRoleRepository.findAll({ where: { userId, status: 1 } })
    console.log(rolesUser, 'rolesUser')
    const roleId = rolesUser.map( x => x.roleId )
    const roles = await this.sysRoleMenuRepository.findAll({ where: { roleId } })

    let pageIds: any[] = []

    roles.map( x => { pageIds.push(x.menuId) })


    const main = await this.sysMeunRepository.findAll({where: { id: pageIds, status: 1, type: [0, 1], parentId: 0 }})
    const pages = await this.sysMeunRepository.findAll({where: { id: pageIds, status: 1}})

    const authoritys = pages.map( x => x.perms)

    const nav = this.makeTree(main, pages)
    return {
      nav,
      authoritys
    }
  }

  makeTree(mains: any, pages: any) {
    return mains.map( xa => {
      const testArray = pages.filter(u => xa.id === u.parentId && u.type > 0)
      return {
        ...xa.dataValues,
        children: testArray
      }
    } )
  }


}
