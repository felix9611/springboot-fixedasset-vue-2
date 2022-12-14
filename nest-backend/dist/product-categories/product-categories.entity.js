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
exports.ProductCategories = void 0;
const typeorm_1 = require("typeorm");
let ProductCategories = class ProductCategories {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Number)
], ProductCategories.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductCategories.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProductCategories.prototype, "route", void 0);
__decorate([
    (0, typeorm_1.Column)('mediumtext', { nullable: true }),
    __metadata("design:type", String)
], ProductCategories.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], ProductCategories.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        select: false,
    }),
    __metadata("design:type", Date)
], ProductCategories.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ProductCategories.prototype, "updatedAt", void 0);
ProductCategories = __decorate([
    (0, typeorm_1.Entity)('product-categories')
], ProductCategories);
exports.ProductCategories = ProductCategories;
//# sourceMappingURL=product-categories.entity.js.map