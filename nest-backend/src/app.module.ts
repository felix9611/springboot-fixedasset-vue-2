import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './databaseModule'
import { BaseModule } from './module'
import { JwtModule } from '@nestjs/jwt'
// import { PassportModule } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'
@Module({
  imports: [
    DatabaseModule, 
    BaseModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
