import { DepartmentTabeService } from './departmentTabe'
import { AssetTypeTabeService } from './assetTypeTable'
import { SysUserTabeService } from './SysUserService'
import { CaptcheService } from './CaptchaService'
import { SysRoleTableService } from './sysRoleTable'
import { SysMenuTableService } from './sysMenuTable'

export const baseServices = [
  DepartmentTabeService,
  AssetTypeTabeService,
  SysUserTabeService,
  CaptcheService,
  SysRoleTableService,
  SysMenuTableService
]