import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { Log4jsLogger } from './libs/log4js/'
import * as bodyParser from 'body-parser'
import { NestExpressApplication } from '@nestjs/platform-express'

const ENV = process.env.NODE_ENV;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true })
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    maxAge: 1728000,
    allowedHeaders: '*',
  })

  app.useLogger(app.get(Log4jsLogger))

  if (ENV !== 'prod') {
    const options = new DocumentBuilder()
      .setTitle('API')
      .setDescription('API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document)
  }

  await app.listen(8450)
}
bootstrap()
