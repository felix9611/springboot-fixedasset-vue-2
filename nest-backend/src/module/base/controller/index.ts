import { DepartmentContoller } from './departmentController'
import { AssetTypeContoller } from './assetTypeController'
import { captcheContoller } from './captcharController'
import { AuthContoller } from './authController'
import { SysRoleContoller } from './sysRoleController'
import { SysMenuContoller } from './sysMenuController'

export const baseControllers = [
  AssetTypeContoller,
  DepartmentContoller,
  captcheContoller,
  AuthContoller,
  SysRoleContoller,
  SysMenuContoller
]