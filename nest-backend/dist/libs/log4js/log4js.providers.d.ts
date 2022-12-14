import { FactoryProvider } from '@nestjs/common';
import { Log4jsAsyncOptions, Log4jsOptions } from './log4js.options';
import { Log4jsLogger } from './log4js.classes';
export declare type Log4jsLoggerFactoryProvider = FactoryProvider<Log4jsLogger | Promise<Log4jsLogger>>;
export declare type Log4jsOptionsFactoryProvider = FactoryProvider<Log4jsOptions | Promise<Log4jsOptions>>;
export declare const createLog4jsLogger: (name: string) => Log4jsLoggerFactoryProvider;
export declare const createAsyncLog4jsOptions: (options: Log4jsAsyncOptions) => Log4jsOptionsFactoryProvider;
