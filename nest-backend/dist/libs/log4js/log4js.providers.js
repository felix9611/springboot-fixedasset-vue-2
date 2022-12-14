"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAsyncLog4jsOptions = exports.createLog4jsLogger = void 0;
const log4js = require("log4js");
const log4js_options_1 = require("./log4js.options");
const log4js_classes_1 = require("./log4js.classes");
const log4js_extentions_1 = require("./log4js.extentions");
const createLog4jsLogger = (name) => ({
    provide: (0, log4js_options_1.getLog4jsLoggerToken)(name),
    inject: [(0, log4js_options_1.getLog4jsOptionsToken)(name)],
    useFactory: async (options) => {
        const config = options.config;
        const logger = log4js.configure(config).getLogger();
        logger.setParseCallStackFunction(log4js_extentions_1.parseNestModuleCallStack);
        return new log4js_classes_1.Log4jsLogger(logger);
    }
});
exports.createLog4jsLogger = createLog4jsLogger;
const createAsyncLog4jsOptions = (options) => {
    if (options.useFactory) {
        return {
            provide: (0, log4js_options_1.getLog4jsOptionsToken)(options.name),
            inject: options.inject,
            useFactory: options.useFactory
        };
    }
    const inject = [(options.useClass || options.useExisting)];
    return {
        provide: (0, log4js_options_1.getLog4jsOptionsToken)(options.name),
        inject: inject,
        useFactory: async (log4jsOptionsFactory) => {
            return log4jsOptionsFactory.createLog4jsOptions();
        }
    };
};
exports.createAsyncLog4jsOptions = createAsyncLog4jsOptions;
//# sourceMappingURL=log4js.providers.js.map