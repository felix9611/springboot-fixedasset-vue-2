import { LoggerService } from '@nestjs/common';
import { Logger } from 'log4js';
export declare class Log4jsLogger implements LoggerService {
    private readonly logger;
    constructor(logger: Logger);
    updateContext(context?: string): void;
    verbose(message: any, context?: string): void;
    debug(message: any, context?: string): void;
    log(message: any, context?: string): void;
    warn(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
    static getTimestamp(): string;
    getTimestamp(): string;
}
