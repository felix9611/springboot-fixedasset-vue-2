import { ModelCtor } from 'sequelize'

export interface Roles{
  roles: any[]
}

export interface ModelMapping {
  [modelName: string]: ModelCtor<any>
}
