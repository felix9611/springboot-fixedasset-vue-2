import { Configuration } from 'log4js';
export declare const LOG4JS_OPTIONS: unique symbol;
export declare const LOG4JS_LOGGER: unique symbol;
export declare const LOG4JS_DEFAULT_LAYOUT: {
    type: string;
    pattern: string;
    tokens: {
        name: (logEvent: any) => any;
    };
};
export declare const LOG4JS_NO_COLOUR_DEFAULT_LAYOUT: {
    type: string;
    pattern: string;
    tokens: {
        name: (logEvent: any) => any;
    };
};
export declare const LOG4JS_DEFAULT_CONFIG: Configuration;
