"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysRole = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
let SysRole = class SysRole extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The id PK number'
    }),
    __metadata("design:type", Number)
], SysRole.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'A',
        description: 'The role code'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], SysRole.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'A',
        description: 'The role page'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], SysRole.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [2, 3, 5],
        description: 'The role page of menu PK ids'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Object)
], SysRole.prototype, "pages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
        description: 'The role remark',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], SysRole.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'This will default 0 or 1'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], SysRole.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This will auto save',
        required: false
    }),
    __metadata("design:type", Date)
], SysRole.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This will auto save',
        required: false
    }),
    __metadata("design:type", Date)
], SysRole.prototype, "createdAt", void 0);
SysRole = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'sys_role' })
], SysRole);
exports.SysRole = SysRole;
//# sourceMappingURL=sysRole.js.map