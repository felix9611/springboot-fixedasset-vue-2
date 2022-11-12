
import { Injectable, Inject } from '@nestjs/common'
import { SysMenu } from 'src/sequelize/models/sysMenu'
import { SysRoleMenu } from 'src/sequelize/models/SysRoleMenu'
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

@Injectable()
export class SysMenuTableService {
  constructor(
    @Inject('sysMenuRepository')
    private sysMenuRepository: typeof SysMenu,
    @Inject('sysRoleMenuRepository')
    private sysRoleMenuRepository: typeof SysRoleMenu
  ) {}

  async getOne(id: number) {
    return await this.sysMenuRepository.findOne({ where: { id } })
  }

  async getAll() {
    return await this.sysMenuRepository.findAll({ where: { status: 1 } })
  }

  async createOne(sysMenu: SysMenu) {
    const { path } = await this.sysMenuRepository.findOne({ where: { path: sysMenu.path } })

    if (!path) {
      return await this.sysMenuRepository.create({ status: 1, ...sysMenu })
    }
    throw new Error('The Path has exist')
  }

  async updateOne(sysMenu: SysMenu) {
    return await this.sysMenuRepository.update({ ...sysMenu }, { where: { id: sysMenu.id } })
  }

  async findMenusByRoles(roleId: number) {
    const  menuId = await this.sysRoleMenuRepository.findAll({ where: { roleId } })
    return await this.sysMenuRepository.findAll({ where: { id: menuId } })
  }


  async findWithList(sysMenu: SysMenu) {
    const baseTableName = 'sys_menu'

    const query = new Query({
      $from: new FromTable({
        table: baseTableName
      })
    })

    const { name, path, type, parentId, limit, active } = sysMenu

    query.$select = [
      new ResultColumn(new ColumnExpression(baseTableName, 'parentId'), 'parentId'),
      new ResultColumn(new ColumnExpression(baseTableName, 'path'), 'path'), 
      new ResultColumn(new ColumnExpression(baseTableName, 'perms'), 'perms'), 
      new ResultColumn(new ColumnExpression(baseTableName, 'component'), 'component'), 
      new ResultColumn(new ColumnExpression(baseTableName, 'type'), 'type'), 
      new ResultColumn(new ColumnExpression(baseTableName, 'icon'), 'icon'),
      new ResultColumn(new ColumnExpression(baseTableName, 'orderNum'), 'orderNum'),
    ]
    if (active) query.$where = new InExpression(new ColumnExpression(baseTableName, 'status'), false, new Value(active))
    if (name) query.$where = new LikeExpression(new ColumnExpression(baseTableName, 'name'), false, `%${name}%`)
    if (limit) query.$limit = new LimitOffset(limit)

    const arrayList = await this.sysMenuRepository.sequelize.query(query.toString('mysql'))
    return arrayList[0]
  }


  async getAllPage() {
    const main = await this.sysMenuRepository.findAll({where: {  status: 1, type: [0, 1], parentId: 0 }})
    const pages = await this.sysMenuRepository.findAll({where: {  status: 1}})

    return this.makeTree(main, pages)
  }

  makeTree(mains: any, pages: any) {
    return mains.map( xa => {
      const testArray = pages.filter(u => xa.id === u.parentId)
      return {
        ...xa.dataValues,
        children: testArray
      }
    } )
  }

}