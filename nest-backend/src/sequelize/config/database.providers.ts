import { Sequelize } from 'sequelize-typescript'
import { models } from '../models'

const ENV = process.env.NODE_ENV
const dbInfo = {
  host: 'localhost',
  port: 3306,
  username: 'nest_admin',
  password: 'GB2444jc3103',
  database: 'fixedasset_nest_vue'
}
if (ENV === 'prod') {
  dbInfo.host = '10.0.224.4'
  dbInfo.port = 25532 || 3306
  dbInfo.username = 'root'
  dbInfo.password = ''
}

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: dbInfo.host,
        port: dbInfo.port,
        username: dbInfo.username,
        password: dbInfo.password,
        database: dbInfo.database,
      })
      sequelize.addModels([
        ...models
      ])
      await sequelize.sync()
      return sequelize
    },
  },
]