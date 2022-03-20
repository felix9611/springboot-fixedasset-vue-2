import { Sequelize } from 'sequelize-typescript'
import { models } from 'src/module/base/model/index'
import { log } from './helper'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'nest_admin',
        password: 'GB2444jc3103',
        database: 'fixedasset_nest_vue_3',
        logging: (...args: any[]) => log(args, 'Main', 'cyan')
      })
      const modelArea = [...models]
      sequelize.addModels(modelArea)
      await sequelize.sync()
      return sequelize
    },
  },
]
