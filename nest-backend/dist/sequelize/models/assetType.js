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
exports.AssetType = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
let AssetType = class AssetType extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The id PK number'
    }),
    __metadata("design:type", Number)
], AssetType.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: 'The asset type code',
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], AssetType.prototype, "typeCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Testing',
        description: 'The asset type name',
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], AssetType.prototype, "typeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {},
        description: 'The asset type other name by json',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", Object)
], AssetType.prototype, "typeOtherName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Testing',
        description: 'The asset type other remark',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], AssetType.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The status in 1 (Active) or 0 (Void)',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], AssetType.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-12-11T01:49:14.286Z',
        description: 'This will auto save',
        required: false
    }),
    __metadata("design:type", Date)
], AssetType.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-12-11T01:49:14.286Z',
        description: 'This will auto save',
        required: false
    }),
    __metadata("design:type", Date)
], AssetType.prototype, "updatedAt", void 0);
AssetType = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'asset_type' })
], AssetType);
exports.AssetType = AssetType;
//# sourceMappingURL=assetType.js.map