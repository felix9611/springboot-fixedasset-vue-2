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
exports.ProductCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const product_categories_entity_1 = require("./product-categories.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ProductCategoriesService = class ProductCategoriesService {
    constructor(productCategoriesRepository) {
        this.productCategoriesRepository = productCategoriesRepository;
    }
    async create(createProductCategoriesDto) {
        const { createdAt } = createProductCategoriesDto;
        createProductCategoriesDto.createdAt = createdAt || new Date();
        createProductCategoriesDto.updatedAt = new Date();
        delete createProductCategoriesDto.id;
        return await this.productCategoriesRepository.save(createProductCategoriesDto);
    }
    async delete(removeProductCategoriesDto) {
        const { ids } = removeProductCategoriesDto;
        return this.productCategoriesRepository.delete(ids);
    }
    async update(updateProductCategoriesData) {
        const { id, updateProductCategoriesDto } = updateProductCategoriesData;
        updateProductCategoriesDto.updatedAt = new Date();
        return await this.productCategoriesRepository.update(id, updateProductCategoriesDto);
    }
    async findAll(query) {
        const { keyword, category, page = 1, limit = 100 } = query;
        const skip = (page - 1) * limit;
        let params = {
            skip,
            take: limit,
        };
        let whereParams = {};
        if (keyword) {
            whereParams = Object.assign(whereParams, {
                name: (0, typeorm_2.Like)(`%${keyword}%`),
            });
        }
        if (category) {
            whereParams = Object.assign(whereParams, {
                category: (0, typeorm_2.In)(category),
            });
        }
        params = Object.assign(params, {
            where: whereParams,
        }, {
            order: {
                updatedAt: 'DESC',
            },
        });
        const [data, total] = await this.productCategoriesRepository.findAndCount(params);
        return {
            total,
            data,
        };
    }
    async findOneById(id) {
        return this.productCategoriesRepository
            .createQueryBuilder()
            .where([{ route: id }, { id }])
            .getOne();
    }
    async getCount() {
        return await this.productCategoriesRepository.count();
    }
};
ProductCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_categories_entity_1.ProductCategories)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductCategoriesService);
exports.ProductCategoriesService = ProductCategoriesService;
//# sourceMappingURL=product-categories.service.js.map