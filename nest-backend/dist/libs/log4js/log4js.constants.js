"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG4JS_DEFAULT_CONFIG = exports.LOG4JS_NO_COLOUR_DEFAULT_LAYOUT = exports.LOG4JS_DEFAULT_LAYOUT = exports.LOG4JS_LOGGER = exports.LOG4JS_OPTIONS = void 0;
exports.LOG4JS_OPTIONS = Symbol('NEST_LOG4JS_OPTIONS');
exports.LOG4JS_LOGGER = Symbol('NEST_LOG4JS_LOGGER');
exports.LOG4JS_DEFAULT_LAYOUT = {
    type: 'pattern',
    pattern: '%[%d{yyyy-MM-dd hh:mm:ss:SSS} %-5.5p --- [%15.15x{name}]%] %40.40f{3}  : %m',
    tokens: {
        name: (logEvent) => {
            return (logEvent.context && logEvent.context['name']) || '-';
        }
    }
};
exports.LOG4JS_NO_COLOUR_DEFAULT_LAYOUT = {
    type: 'pattern',
    pattern: '%d{yyyy-MM-dd hh:mm:ss:SSS} %-5.5p --- [%15.15x{name}] %40.40f{3}  : %m',
    tokens: {
        name: (logEvent) => {
            return (logEvent.context && logEvent.context['name']) || '-';
        }
    }
};
exports.LOG4JS_DEFAULT_CONFIG = {
    appenders: {
        stdout: {
            type: 'stdout',
            layout: exports.LOG4JS_DEFAULT_LAYOUT
        },
        file: {
            type: 'file',
            filename: './logs/application.log',
            maxLogSize: 20 * 1024 * 1024,
            backups: 10,
            layout: exports.LOG4JS_NO_COLOUR_DEFAULT_LAYOUT
        }
    },
    categories: {
        default: {
            enableCallStack: true,
            appenders: ['stdout', 'file'],
            level: 'debug'
        }
    }
};
//# sourceMappingURL=log4js.constants.js.map