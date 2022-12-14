import { Configuration } from 'log4js';
import { FactoryProvider, ModuleMetadata, Type } from '@nestjs/common';
export interface Log4jsOptionsFactory {
    createLog4jsOptions(): Log4jsAsyncOptions | Promise<Log4jsOptions>;
}
export interface Log4jsOptions {
    name?: string;
    config?: Configuration;
}
export declare const DEFAULT_LOG4JS_OPTIONS: Log4jsOptions;
export interface Log4jsAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    name?: string;
    inject?: FactoryProvider['inject'];
    useExisting?: Type<Log4jsOptionsFactory>;
    useClass?: Type<Log4jsOptionsFactory>;
    useFactory?: (...args: any[]) => Log4jsOptions | Promise<Log4jsOptions>;
}
export declare const isSymbol: (fn: any) => fn is symbol;
export declare const getLog4jsOptionsToken: (name?: string | symbol) => string | symbol;
export declare const getLog4jsLoggerToken: (name?: string | symbol) => string | symbol;
