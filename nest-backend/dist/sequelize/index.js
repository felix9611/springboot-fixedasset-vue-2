"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeDatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const database_providers_1 = require("./config/database.providers");
const providers_1 = require("./providers");
const service_1 = require("./service");
const controllers_1 = require("./controllers");
const models_1 = require("./models");
const service_2 = require("./dashboard/service");
const controller_1 = require("./dashboard/controller");
let SequelizeDatabaseModule = class SequelizeDatabaseModule {
};
SequelizeDatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [...models_1.models],
        providers: [...database_providers_1.databaseProviders, ...providers_1.mainProviders, ...service_1.services, service_2.DasboardService],
        controllers: [...controllers_1.controllers, controller_1.DasboardController],
        exports: [...database_providers_1.databaseProviders],
    })
], SequelizeDatabaseModule);
exports.SequelizeDatabaseModule = SequelizeDatabaseModule;
//# sourceMappingURL=index.js.map