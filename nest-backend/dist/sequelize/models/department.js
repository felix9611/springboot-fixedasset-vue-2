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
exports.Department = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
let Department = class Department extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The id PK number'
    }),
    __metadata("design:type", Number)
], Department.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: 'The department code'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Department.prototype, "deptCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: 'The department name'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Department.prototype, "deptName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
        description: 'Remark',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Department.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {},
        description: 'The other information by json or array',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", Object)
], Department.prototype, "flexData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'This will default 0 or 1'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Department.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This will auto save',
        required: false
    }),
    __metadata("design:type", Date)
], Department.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This will auto save',
        required: false
    }),
    __metadata("design:type", Date)
], Department.prototype, "createdAt", void 0);
Department = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'department' })
], Department);
exports.Department = Department;
//# sourceMappingURL=department.js.map