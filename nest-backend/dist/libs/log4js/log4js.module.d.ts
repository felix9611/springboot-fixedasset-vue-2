import { DynamicModule } from '@nestjs/common';
import { Log4jsAsyncOptions, Log4jsOptions } from './log4js.options';
export declare class Log4jsModule {
    static forRoot(options?: Log4jsOptions): DynamicModule;
    static forRootAsync(options: Log4jsAsyncOptions): DynamicModule;
}
