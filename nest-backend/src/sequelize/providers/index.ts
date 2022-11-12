
import { Test } from 'src/sequelize/models/test'
import { SysMenu } from 'src/sequelize/models/sysMenu'
import { SysRole } from 'src/sequelize/models/sysRole'
import { SysRoleMenu } from 'src/sequelize/models/SysRoleMenu'
import { SysUserRole } from 'src/sequelize/models/SysUserRole'
import { AssetType } from 'src/sequelize/models/assetType'

export const mainProviders = [
  { provide: 'testRepository', useValue: Test },
  { provide: 'sysMenuRepository', useValue: SysMenu },
  { provide: 'sysRoleRepository', useValue: SysRole },
  { provide: 'sysRoleMenuRepository', useValue: SysRoleMenu },
  { provide: 'sysUserRoleRepository', useValue: SysUserRole },
  { provide: 'assetTypeRepository', useValue: AssetType },
]