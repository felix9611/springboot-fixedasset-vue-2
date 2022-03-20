import { Department } from 'src/module/base/model/deparment'
import { AssetType } from 'src/module/base/model/assetType'
import { SysUser } from 'src/module/base/model/sysUser'
import { SysRole } from 'src/module/base/model/SysRole'
import { SysMenu } from 'src/module/base/model/sysMenu'

export const baseProviders = [
  { provide: 'assetTypeRepository', useValue: AssetType },
  { provide: 'departmentRepository', useValue: Department },
  { provide: 'sysUserRepository', useValue: SysUser },
  { provide: 'sysRoleRepository', useValue: SysRole },
  { provide: 'sysMenuRepository', useValue: SysMenu },
]