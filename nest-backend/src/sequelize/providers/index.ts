
import { Test } from 'src/sequelize/models/test'
import { SysMenu } from 'src/sequelize/models/sysMenu'
import { SysRole } from 'src/sequelize/models/sysRole'
import { SysRoleMenu } from 'src/sequelize/models/SysRoleMenu'
import { SysUserRole } from 'src/sequelize/models/SysUserRole'
import { AssetType } from 'src/sequelize/models/assetType'
import { Location } from 'src/sequelize/models/location'
import { Department } from 'src/sequelize/models/department'
import { Vendor } from 'src/sequelize/models/vendor'
import { AssetList } from 'src/sequelize/models/assetList'
import { WriteOff } from 'src/sequelize/models/writeOff'

export const mainProviders = [
  { provide: 'testRepository', useValue: Test },
  { provide: 'sysMenuRepository', useValue: SysMenu },
  { provide: 'sysRoleRepository', useValue: SysRole },
  { provide: 'sysRoleMenuRepository', useValue: SysRoleMenu },
  { provide: 'sysUserRoleRepository', useValue: SysUserRole },
  { provide: 'assetTypeRepository', useValue: AssetType },
  { provide: 'locationRepository', useValue: Location },
  { provide: 'departmentRepository', useValue: Department },
  { provide: 'vendorRepository', useValue: Vendor },
  { provide: 'assetListRepository', useValue: AssetList },
  { provide: 'writeOffRepository', useValue: WriteOff },
]
