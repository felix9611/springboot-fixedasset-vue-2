
import { Module } from '@nestjs/common'
import { databaseProviders } from './config/database.providers'
import { mainProviders } from './providers'
import { services } from './service'
import { controllers } from './controllers'
import { models } from './models'
import { DasboardService } from './dashboard/service'
import { DasboardController } from './dashboard/controller'


@Module({
  imports: [...models],
  providers: [...databaseProviders, ...mainProviders, ...services, DasboardService],
  controllers: [...controllers, DasboardController],
  exports: [...databaseProviders],
})
export class SequelizeDatabaseModule {}
