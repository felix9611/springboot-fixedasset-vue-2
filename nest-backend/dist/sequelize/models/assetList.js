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
exports.AssetList = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
let AssetList = class AssetList extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The Asset id PK number'
    }),
    __metadata("design:type", Number)
], AssetList.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '000001',
        description: 'The Asset code'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], AssetList.prototype, "assetCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ABC',
        description: 'The Asset name'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], AssetList.prototype, "assetName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The Asset type id number'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], AssetList.prototype, "typeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Box',
        description: 'This asset item how to unit term'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], AssetList.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-12-11T01:49:14.286Z',
        description: 'This asset buy at the date and time',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", String)
], AssetList.prototype, "buyDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'This is for test',
        description: 'This asset detail',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], AssetList.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        description: 'This sponsor type number'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], AssetList.prototype, "sponsor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Tom',
        description: 'This sponsor name',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], AssetList.prototype, "sponsorName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '300',
        description: 'This asset buy cost',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], AssetList.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '17516987',
        description: 'This asset Serial Number'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], AssetList.prototype, "serialNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'T00001',
        description: 'Buy Invoice Sheet Number',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], AssetList.prototype, "invoiceNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-12-11T01:49:14.286Z',
        description: 'Buy Invoice Sheet Iussed Date and time',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", String)
], AssetList.prototype, "invoiceDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: 'The asset store on where the place id number'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], AssetList.prototype, "placeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The asset by which the department id number'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], AssetList.prototype, "deptId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'A001',
        description: 'The operation staff UUID',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], AssetList.prototype, "staffId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: 'The asset vendor code',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], AssetList.prototype, "vendorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Testing',
        description: 'The asset other information remark',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], AssetList.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {},
        description: 'The asset other information by json or array',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", Object)
], AssetList.prototype, "flexData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'This will default 0 or 1'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], AssetList.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-12-11T01:49:14.286Z',
        description: 'This will auto save',
        required: false
    }),
    __metadata("design:type", Date)
], AssetList.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-12-11T01:49:14.286Z',
        description: 'This will auto save',
        required: false
    }),
    __metadata("design:type", Date)
], AssetList.prototype, "createdAt", void 0);
AssetList = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'asset_list' })
], AssetList);
exports.AssetList = AssetList;
//# sourceMappingURL=assetList.js.map