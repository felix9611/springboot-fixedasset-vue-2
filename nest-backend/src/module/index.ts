import { Module } from '@nestjs/common'
import { baseProviders } from './base/providers'
import { services } from './base/service'
import { controllers } from './base/controller/index'
import { SequelizeModule } from '@nestjs/sequelize'
import { Sequelize } from 'sequelize'

@Module({
  controllers: [
    ...controllers
  ],
  providers: [
    ...baseProviders,
    ...services
  ],
})
export class BaseModule {}