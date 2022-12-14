"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const product_categories_service_1 = require("./product-categories.service");
const typeorm_1 = require("@nestjs/typeorm");
const product_categories_entity_1 = require("./product-categories.entity");
const product_categories_controller_1 = require("./product-categories.controller");
let ProductCategoriesModule = class ProductCategoriesModule {
};
ProductCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_categories_entity_1.ProductCategories])],
        providers: [product_categories_service_1.ProductCategoriesService],
        exports: [product_categories_service_1.ProductCategoriesService],
        controllers: [product_categories_controller_1.ProductCategoriesController],
    })
], ProductCategoriesModule);
exports.ProductCategoriesModule = ProductCategoriesModule;
//# sourceMappingURL=product-categories.module.js.map