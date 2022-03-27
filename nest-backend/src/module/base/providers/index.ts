import { Department } from 'src/module/base/model/deparment'
import { AssetType } from 'src/module/base/model/assetType'
import { SysUser } from 'src/module/base/model/sysUser'
import { SysRole } from 'src/module/base/model/SysRole'
import { SysMenu } from 'src/module/base/model/sysMenu'
import { SysRoleMenu } from 'src/module/base/model/sysRoleMenu'
import { SysUserRole } from 'src/module/base/model/sysUserRole'
import { ActionRecord } from 'src/module/base/model/actionRecord'

export const baseProviders = [
  { provide: 'assetTypeRepository', useValue: AssetType },
  { provide: 'departmentRepository', useValue: Department },
  { provide: 'sysUserRepository', useValue: SysUser },
  { provide: 'sysRoleRepository', useValue: SysRole },
  { provide: 'sysMenuRepository', useValue: SysMenu },
  { provide: 'sysRoleMenuRepository', useValue: SysRoleMenu },
  { provide: 'sysUserRoleRepository', useValue: SysUserRole },
  { provide: 'actionRecordRepository', useValue: ActionRecord },
]