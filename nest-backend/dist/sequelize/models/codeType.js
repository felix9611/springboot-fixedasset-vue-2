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
exports.CodeType = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
let CodeType = class CodeType extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The id PK number'
    }),
    __metadata("design:type", Number)
], CodeType.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: 'The type for category'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], CodeType.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'TestD',
        description: 'The value code'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], CodeType.prototype, "valueCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test Da',
        description: 'The value name'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], CodeType.prototype, "valueName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The status in 1 (Active) or 0 (Void)',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], CodeType.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-12-11T01:49:14.286Z',
        description: 'This will auto save',
        required: false
    }),
    __metadata("design:type", Date)
], CodeType.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-12-11T01:49:14.286Z',
        description: 'This will auto save',
        required: false
    }),
    __metadata("design:type", Date)
], CodeType.prototype, "createdAt", void 0);
CodeType = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'code_type' })
], CodeType);
exports.CodeType = CodeType;
//# sourceMappingURL=codeType.js.map