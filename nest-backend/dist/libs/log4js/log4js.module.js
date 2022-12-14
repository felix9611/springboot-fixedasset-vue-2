"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Log4jsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log4jsModule = void 0;
const common_1 = require("@nestjs/common");
const log4js_options_1 = require("./log4js.options");
const log4js_providers_1 = require("./log4js.providers");
const log4js_classes_1 = require("./log4js.classes");
let Log4jsModule = Log4jsModule_1 = class Log4jsModule {
    static forRoot(options = log4js_options_1.DEFAULT_LOG4JS_OPTIONS) {
        return {
            module: Log4jsModule_1,
            providers: [
                {
                    provide: (0, log4js_options_1.getLog4jsOptionsToken)(options.name),
                    useValue: options
                },
                (0, log4js_providers_1.createLog4jsLogger)(options.name),
                {
                    provide: log4js_classes_1.Log4jsLogger,
                    useExisting: (0, log4js_options_1.getLog4jsLoggerToken)(options.name)
                }
            ],
            exports: [
                (0, log4js_options_1.getLog4jsLoggerToken)(options.name),
                {
                    provide: log4js_classes_1.Log4jsLogger,
                    useExisting: (0, log4js_options_1.getLog4jsLoggerToken)(options.name)
                }
            ]
        };
    }
    static forRootAsync(options) {
        return {
            module: Log4jsModule_1,
            imports: options.imports,
            providers: [
                (0, log4js_providers_1.createAsyncLog4jsOptions)(options),
                (0, log4js_providers_1.createLog4jsLogger)(options.name),
                {
                    provide: log4js_classes_1.Log4jsLogger,
                    useExisting: (0, log4js_options_1.getLog4jsLoggerToken)(options.name)
                }
            ],
            exports: [
                (0, log4js_options_1.getLog4jsLoggerToken)(options.name),
                {
                    provide: log4js_classes_1.Log4jsLogger,
                    useExisting: (0, log4js_options_1.getLog4jsLoggerToken)(options.name)
                }
            ]
        };
    }
};
Log4jsModule = Log4jsModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], Log4jsModule);
exports.Log4jsModule = Log4jsModule;
//# sourceMappingURL=log4js.module.js.map