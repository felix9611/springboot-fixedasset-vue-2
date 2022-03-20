import { Module } from '@nestjs/common'
import { baseProviders } from './base/providers'
import { baseServices } from './base/service'
import { baseControllers } from './base/controller/index'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '6hours' }
    })
  ],
  controllers: [
    ...baseControllers
  ],
  providers: [
    ...baseProviders,
    ...baseServices
  ],
  exports: [JwtModule]
})
export class BaseModule {}