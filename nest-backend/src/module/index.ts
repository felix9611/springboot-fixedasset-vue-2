import { Module } from '@nestjs/common'
import { baseProviders } from './base/providers'
import { baseServices } from './base/service'
import { baseControllers } from './base/controller/index'

@Module({
  controllers: [
    ...baseControllers
  ],
  providers: [
    ...baseProviders,
    ...baseServices
  ],
})
export class BaseModule {}