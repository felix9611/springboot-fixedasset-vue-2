import { DepartmentTabeService } from './departmentTabe'
import { AssetTypeTabeService } from './assetTypeTable'
import { SysUserTabeService } from './SysUserService'
import { CaptcheService } from './CaptchaService'

export const baseServices = [
  DepartmentTabeService,
  AssetTypeTabeService,
  SysUserTabeService,
  CaptcheService
]