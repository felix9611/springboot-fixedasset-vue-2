"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = exports.cryptoString = void 0;
const CryptoJS = require("crypto-js");
const crypto_1 = require("./crypto");
const cryptoString = (str) => {
    return CryptoJS.HmacSHA1(str, crypto_1.cryptoConstants.privateKey).toString();
};
exports.cryptoString = cryptoString;
exports.jwtConstants = {
    secret: 'giibee.com',
    adminSecret: 'admin.giibee.com',
};
//# sourceMappingURL=lib.js.map