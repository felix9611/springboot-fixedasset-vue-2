import { Department } from 'src/module/base/model/deparment'
import { AssetType } from 'src/module/base/model/assetType'
import { SysUser } from 'src/module/base/model/sysUser'

export const baseProviders = [
  { provide: 'assetTypeRepository', useValue: AssetType },
  { provide: 'departmentRepository', useValue: Department },
  { provide: 'sysUserRepository', useValue: SysUser },
]