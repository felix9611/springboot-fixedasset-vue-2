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
exports.StockTake = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
let StockTake = class StockTake extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The id PK number'
    }),
    __metadata("design:type", Number)
], StockTake.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], StockTake.prototype, "actionName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], StockTake.prototype, "actionPlace", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The end datetime for stock take',
        required: false
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], StockTake.prototype, "finishTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'This will default 0 (Void) or 1 (Active)'
    }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], StockTake.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This will auto save',
        required: false
    }),
    __metadata("design:type", Date)
], StockTake.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This will auto save',
        required: false
    }),
    __metadata("design:type", Date)
], StockTake.prototype, "createdAt", void 0);
StockTake = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'stocktake' })
], StockTake);
exports.StockTake = StockTake;
//# sourceMappingURL=stocktake.js.map