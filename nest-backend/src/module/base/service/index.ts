import { DepartmentTabeService } from './departmentTabe'
import { AssetTypeTabeService } from './assetTypeTable'
import { SysUserTabeService } from './SysUserService'
import { CaptcheService } from './CaptchaService'
import { SysRoleTableService } from './sysRoleTable'
import { SysMenuTableService } from './sysMenuTable'
import { SysRoleMenuTableService } from './SysRoleMenuService'

export const baseServices = [
  DepartmentTabeService,
  AssetTypeTabeService,
  SysUserTabeService,
  CaptcheService,
  SysRoleTableService,
  SysMenuTableService,
  SysRoleMenuTableService
]