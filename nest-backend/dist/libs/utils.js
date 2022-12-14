"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const common_1 = require("@nestjs/common");
const jwt_decode_1 = require("jwt-decode");
const Log = (params = {}) => {
    const req = params['req'];
    const user = params['user'];
    const logger = new common_1.Logger();
    const decoded = user ? user : (0, jwt_decode_1.default)(req.headers.authorization);
    const usernameStr = user ? 'name' : 'username';
    const userIdStr = user ? 'id' : 'userId';
    const username = decoded[usernameStr];
    const userId = decoded[userIdStr];
    const name = `${req.method}:${req.url}`;
    logger.warn(`${username}/${userId}`, name);
    logger.warn(req.headers['user-agent'], name);
    logger.warn(req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress, name);
};
exports.Log = Log;
//# sourceMappingURL=utils.js.map