import { ModelCtor } from 'sequelize'

export interface Roles{
  roles: any[]
}

export interface ModelMapping {
  [modelName: string]: ModelCtor<any>
}

export class AssetFileImport {
  assetId: number
  fileList: fileLists[]
}

export class fileLists {
  dataBase64: string
  fileName: string
}

export class invrecordList {
  limit: number
  page: number
  createdFrom: string
  createdTo: string
}
