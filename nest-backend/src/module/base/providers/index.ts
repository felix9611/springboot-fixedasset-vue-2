import { Department } from 'src/module/base/model/deparment'
import { AssetType } from 'src/module/base/model/assetType'

export const baseProviders = [
  { provide: 'assetTypeRepository', useValue: AssetType },
  { provide: 'departmentRepository', useValue: Department },
]