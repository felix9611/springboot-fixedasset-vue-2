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
exports.AssetListFiles = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
let AssetListFiles = class AssetListFiles extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The id PK number'
    }),
    __metadata("design:type", Number)
], AssetListFiles.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: 'The id of asset PK',
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], AssetListFiles.prototype, "assetId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test.png',
        description: 'The file name',
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], AssetListFiles.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Agedgs656ad5fs6===',
        description: 'base64 Content',
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], AssetListFiles.prototype, "base64", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The status in 1 (Active) or 0 (Void)',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], AssetListFiles.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-12-11T01:49:14.286Z',
        description: 'This will auto save',
        required: false
    }),
    __metadata("design:type", Date)
], AssetListFiles.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-12-11T01:49:14.286Z',
        description: 'This will auto save',
        required: false
    }),
    __metadata("design:type", Date)
], AssetListFiles.prototype, "updatedAt", void 0);
AssetListFiles = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'asset_list_file' })
], AssetListFiles);
exports.AssetListFiles = AssetListFiles;
//# sourceMappingURL=assetListFiles.js.map