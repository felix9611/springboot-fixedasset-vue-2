"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Log4jsLogger_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log4jsLogger = void 0;
const common_1 = require("@nestjs/common");
let Log4jsLogger = Log4jsLogger_1 = class Log4jsLogger {
    constructor(logger) {
        this.logger = logger;
    }
    updateContext(context) {
        if (context && context.length > 0) {
            this.logger.addContext('name', context);
        }
        else {
            this.logger.addContext('name', '');
        }
    }
    verbose(message, context) {
        this.updateContext(context);
        this.logger.trace(message);
    }
    debug(message, context) {
        this.updateContext(context);
        this.logger.debug(message);
    }
    log(message, context) {
        this.updateContext(context);
        this.logger.info(message);
    }
    warn(message, context) {
        this.updateContext(context);
        this.logger.warn(message);
    }
    error(message, trace, context) {
        this.updateContext(context);
        this.logger.error(message, trace);
    }
    static getTimestamp() {
        const localeStringOptions = {
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            day: '2-digit',
            month: '2-digit'
        };
        return new Date(Date.now()).toLocaleString(undefined, localeStringOptions);
    }
    getTimestamp() {
        return Log4jsLogger_1.getTimestamp();
    }
};
Log4jsLogger = Log4jsLogger_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], Log4jsLogger);
exports.Log4jsLogger = Log4jsLogger;
//# sourceMappingURL=log4js.classes.js.map