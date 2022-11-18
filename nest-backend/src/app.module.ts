import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module'
import { AboutModule } from './about/about.module'
import { HomeModule } from './home/home.module'
import { UploadModule } from './upload/upload.module'
import { AuthModule } from './auth/auth.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { Log4jsModule } from './libs/log4js/'

import { SequelizeDatabaseModule } from './sequelize'

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
const { host, port, username, password, database } = dbInfo

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host,
      port,
      username,
      password,
      database,
      entities: [],
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    // ProductsModule,
    // ProductCategoriesModule,
    AboutModule,
    HomeModule,
    // BannerModule,
    UploadModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    Log4jsModule.forRoot(),
    SequelizeDatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
