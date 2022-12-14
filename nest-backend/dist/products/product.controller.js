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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_product_dto_1 = require("./dto/create-product.dto");
const product_service_1 = require("./product.service");
const remove_product_dto_1 = require("./dto/remove-product.dto");
const retrieve_product_dto_1 = require("./dto/retrieve-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const find_product_dto_1 = require("./dto/find-product.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const utils_1 = require("../libs/utils");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(createProductDto) {
        return await this.productsService.create(createProductDto);
    }
    async remove(removeProductDto, req) {
        (0, utils_1.Log)({ req });
        return await this.productsService.delete(removeProductDto);
    }
    async update(params, updateProductDto) {
        return await this.productsService.update({
            id: params.id,
            updateProductDto,
        });
    }
    async findAll(query) {
        return await this.productsService.findAll(query);
    }
    async findOneById(params) {
        return await this.productsService.findOneById(params.id);
    }
    async getCount() {
        return await this.productsService.getCount();
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '增加' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: '删除' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_product_dto_1.RemoveProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [retrieve_product_dto_1.RetrieveProductDto,
        update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '列表' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_product_dto_1.FindProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '根据 id 查找' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [retrieve_product_dto_1.RetrieveProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Get)('list/count'),
    (0, swagger_1.ApiOperation)({ summary: '用户数量' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getCount", null);
ProductsController = __decorate([
    (0, swagger_1.ApiTags)('产品'),
    (0, common_1.Controller)('api/products'),
    __metadata("design:paramtypes", [product_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=product.controller.js.map