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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_product_categories_dto_1 = require("./dto/create-product-categories.dto");
const product_categories_service_1 = require("./product-categories.service");
const remove_product_categories_dto_1 = require("./dto/remove-product-categories.dto");
const retrieve_product_categories_dto_1 = require("./dto/retrieve-product-categories.dto");
const update_product_categories_dto_1 = require("./dto/update-product-categories.dto");
const find_product_categories_dto_1 = require("./dto/find-product-categories.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const utils_1 = require("../libs/utils");
let ProductCategoriesController = class ProductCategoriesController {
    constructor(productCategoriesService) {
        this.productCategoriesService = productCategoriesService;
    }
    async create(createProductCategoriesDto) {
        return await this.productCategoriesService.create(createProductCategoriesDto);
    }
    async remove(removeProductCategoriesDto, req) {
        (0, utils_1.Log)({ req });
        return await this.productCategoriesService.delete(removeProductCategoriesDto);
    }
    async update(params, updateProductCategoriesDto) {
        return await this.productCategoriesService.update({
            id: params.id,
            updateProductCategoriesDto,
        });
    }
    async findAll(query) {
        return await this.productCategoriesService.findAll(query);
    }
    async findOneById(params) {
        return await this.productCategoriesService.findOneById(params.id);
    }
    async getCount() {
        return await this.productCategoriesService.getCount();
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '增加' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_categories_dto_1.CreateProductCategoriesDto]),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: '删除' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_product_categories_dto_1.RemoveProductCategoriesDto, Object]),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [retrieve_product_categories_dto_1.RetrieveProductCategoriesDto,
        update_product_categories_dto_1.UpdateProductCategoriesDto]),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '列表' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_product_categories_dto_1.FindProductCategoriesDto]),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '根据 id 查找' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [retrieve_product_categories_dto_1.RetrieveProductCategoriesDto]),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Get)('list/count'),
    (0, swagger_1.ApiOperation)({ summary: '用户数量' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "getCount", null);
ProductCategoriesController = __decorate([
    (0, swagger_1.ApiTags)('产品分类'),
    (0, common_1.Controller)('api/product-categories'),
    __metadata("design:paramtypes", [product_categories_service_1.ProductCategoriesService])
], ProductCategoriesController);
exports.ProductCategoriesController = ProductCategoriesController;
//# sourceMappingURL=product-categories.controller.js.map