"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLog4jsLoggerToken = exports.getLog4jsOptionsToken = exports.isSymbol = exports.DEFAULT_LOG4JS_OPTIONS = void 0;
const log4js_constants_1 = require("./log4js.constants");
exports.DEFAULT_LOG4JS_OPTIONS = {
    config: log4js_constants_1.LOG4JS_DEFAULT_CONFIG
};
const isSymbol = (fn) => typeof fn === 'symbol';
exports.isSymbol = isSymbol;
const getLog4jsOptionsToken = (name = log4js_constants_1.LOG4JS_OPTIONS) => {
    if (name === log4js_constants_1.LOG4JS_OPTIONS) {
        return log4js_constants_1.LOG4JS_OPTIONS;
    }
    if (!(0, exports.isSymbol)(name)) {
        return `${name}_LOG4JS_OPTIONS`;
    }
};
exports.getLog4jsOptionsToken = getLog4jsOptionsToken;
const getLog4jsLoggerToken = (name = log4js_constants_1.LOG4JS_LOGGER) => {
    if (name === log4js_constants_1.LOG4JS_LOGGER) {
        return log4js_constants_1.LOG4JS_LOGGER;
    }
    if (!(0, exports.isSymbol)(name)) {
        return `${name}_LOG4JS_LOGGER`;
    }
};
exports.getLog4jsLoggerToken = getLog4jsLoggerToken;
//# sourceMappingURL=log4js.options.js.map