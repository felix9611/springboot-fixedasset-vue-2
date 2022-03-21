import { DepartmentTabeService } from './departmentTabe'
import { AssetTypeTabeService } from './assetTypeTable'
import { SysUserTabeService } from './SysUserService'
import { CaptcheService } from './CaptchaService'
import { SysRoleTabeService } from './sysRoleTable'

export const baseServices = [
  DepartmentTabeService,
  AssetTypeTabeService,
  SysUserTabeService,
  CaptcheService,
  SysRoleTabeService
]