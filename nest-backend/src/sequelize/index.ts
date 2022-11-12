
import { Module } from '@nestjs/common'
import { databaseProviders } from './config/database.providers'
import { mainProviders } from './providers'
import { services } from './service'
import { controllers } from './controllers'
import { models } from './models'

@Module({
  imports: [...models],
  providers: [...databaseProviders, ...mainProviders, ...services],
  controllers: [...controllers],
  exports: [...databaseProviders],
})
export class SequelizeDatabaseModule {}