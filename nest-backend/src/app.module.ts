import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './databaseModule'
import { BaseModule } from './module'
import { Sequelize } from 'sequelize'

@Module({
  imports: [DatabaseModule, BaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
