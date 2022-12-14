"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const home_module_1 = require("./home/home.module");
const upload_module_1 = require("./upload/upload.module");
const auth_module_1 = require("./auth/auth.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const log4js_1 = require("./libs/log4js/");
const sequelize_1 = require("./sequelize");
const ENV = process.env.NODE_ENV;
const dbInfo = {
    host: 'localhost',
    port: 3306,
    username: 'nest_admin',
    password: 'GB2444jc3103',
    database: 'fixedasset_nest_vue'
};
if (ENV === 'prod') {
    dbInfo.host = '10.0.224.4';
    dbInfo.port = 25532 || 3306;
    dbInfo.username = 'root';
    dbInfo.password = '';
}
const { host, port, username, password, database } = dbInfo;
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
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
            users_module_1.UsersModule,
            home_module_1.HomeModule,
            upload_module_1.UploadModule,
            auth_module_1.AuthModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            log4js_1.Log4jsModule.forRoot(),
            sequelize_1.SequelizeDatabaseModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map