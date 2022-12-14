"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseHosts = void 0;
const baseHosts = {
    development: {
        baseHost: 'http://localhost:3000/',
        uploadPath: 'public/',
        domain: 'www.giibee.com',
    },
    production: {
        baseHost: 'http://app.api',
        uploadPath: 'public/',
        domain: 'www.giibee.com',
    },
};
exports.baseHosts = baseHosts;
//# sourceMappingURL=config.js.map