import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { Log4jsLogger } from './libs/log4js/'
import * as bodyParser from 'body-parser'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ExpressSwaggerCustomOptions, iconImg } from 'src/interface/index'

const ENV = process.env.NODE_ENV;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true, rawBody: true })
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    maxAge: 1728000,
    allowedHeaders: '*',
  })

  app.use(bodyParser.json({limit: '1000mb'}))
  app.use(bodyParser.urlencoded({limit: '1000mb', extended: true }))

  app.useLogger(app.get(Log4jsLogger))

  const customOptions: ExpressSwaggerCustomOptions = {
    explorer: true,
    customSiteTitle: 'Nestjs Version Fixed Asset API Docs',
    customfavIcon: iconImg
}

  // if (ENV !== 'prod') {
  const options = new DocumentBuilder()
      .setTitle('API')
      .setDescription('API Document')
      .setVersion('1.0')
      .addServer('http://localhost:8450')
      .addBearerAuth()
      .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-doc', app, document, customOptions)
  // }

  await app.listen(8450)
}
bootstrap()
