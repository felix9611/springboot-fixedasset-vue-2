"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const log4js_1 = require("./libs/log4js/");
const bodyParser = require("body-parser");
const index_1 = require("./interface/index");
const ENV = process.env.NODE_ENV;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true, rawBody: true });
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        maxAge: 1728000,
        allowedHeaders: '*',
    });
    app.use(bodyParser.json({ limit: '5000mb' }));
    app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));
    app.useLogger(app.get(log4js_1.Log4jsLogger));
    const customOptions = {
        explorer: true,
        customSiteTitle: 'Nestjs Version Fixed Asset API Docs',
        customfavIcon: index_1.iconImg
    };
    const options = new swagger_1.DocumentBuilder()
        .setTitle('API')
        .setDescription('API Document')
        .setVersion('1.0')
        .addServer('http://localhost:8450')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document, customOptions);
    await app.listen(8450);
}
bootstrap();
//# sourceMappingURL=main.js.map