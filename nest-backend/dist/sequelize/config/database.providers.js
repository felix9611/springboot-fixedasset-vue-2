"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const models_1 = require("../models");
const ENV = process.env.NODE_ENV;
const dbInfo = {
    host: 'localhost',
    port: 3306,
    username: 'nest_admin',
    password: 'GB2444jc3103',
    database: 'fixedasset_nest_vue'
};
if (ENV === 'prod') {
    dbInfo.host = '10.0.224.4';
    dbInfo.port = 25532 || 3306;
    dbInfo.username = 'root';
    dbInfo.password = '';
}
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    host: dbInfo.host,
    port: dbInfo.port,
    username: dbInfo.username,
    password: dbInfo.password,
    database: dbInfo.database,
});
exports.databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new sequelize_typescript_1.Sequelize({
                dialect: 'mysql',
                host: dbInfo.host,
                port: dbInfo.port,
                username: dbInfo.username,
                password: dbInfo.password,
                database: dbInfo.database,
            });
            sequelize.addModels([
                ...models_1.models
            ]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.providers.js.map