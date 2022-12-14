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
exports.Vendor = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
let Vendor = class Vendor extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The id PK number'
    }),
    __metadata("design:type", Number)
], Vendor.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: "Vendor's  Code"
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Vendor.prototype, "vendorCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test LTD',
        description: "Vendor's  Name"
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Vendor.prototype, "vendorName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'TEST',
        description: "Vendor's Other Name",
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", Object)
], Vendor.prototype, "vendorOtherName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'TEST',
        description: "Vendor's Type"
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Vendor.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'aa@abc.com',
        description: "Vendor's Contact Email Addres"
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Vendor.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '67891258',
        description: "Vendor's Contact Phone Number"
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Vendor.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
        description: 'Fax Number',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Vendor.prototype, "fax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Kowloon, HK',
        description: "Vendor's Address"
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Vendor.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
        description: "Vendor's Contact Person"
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Vendor.prototype, "contactPerson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
        description: 'Remark',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Vendor.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {},
        description: 'Addon Data',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", Object)
], Vendor.prototype, "flexData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'This will default 0 (Void) or 1 (Active)',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Vendor.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This will auto save',
        required: false
    }),
    __metadata("design:type", Date)
], Vendor.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This will auto save',
        required: false
    }),
    __metadata("design:type", Date)
], Vendor.prototype, "createdAt", void 0);
Vendor = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'vendor' })
], Vendor);
exports.Vendor = Vendor;
//# sourceMappingURL=vendor.js.map