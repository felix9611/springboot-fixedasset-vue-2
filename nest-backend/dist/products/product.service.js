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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("./product.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ProductsService = class ProductsService {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async create(createProductDto) {
        const { createdAt } = createProductDto;
        createProductDto.createdAt = createdAt || new Date();
        createProductDto.updatedAt = new Date();
        delete createProductDto.id;
        return await this.productsRepository.save(createProductDto);
    }
    async delete(removeProductDto) {
        const { ids } = removeProductDto;
        return this.productsRepository.delete(ids);
    }
    async update(updateProductData) {
        const { id, updateProductDto } = updateProductData;
        updateProductDto.updatedAt = new Date();
        return await this.productsRepository.update(id, updateProductDto);
    }
    async findAll(query) {
        const { keyword, category, page = 1, limit = 10, recommend } = query;
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
                category,
            });
        }
        if (recommend) {
            whereParams = Object.assign(whereParams, {
                recommend: recommend === 'true' ? true : '',
            });
        }
        params = Object.assign(params, {
            where: whereParams,
        }, {
            order: {
                updatedAt: 'DESC',
            },
        });
        const [data, total] = await this.productsRepository.findAndCount(params);
        return {
            total,
            data,
        };
    }
    async findOneById(id) {
        return this.productsRepository
            .createQueryBuilder()
            .where([{ route: id }, { id }])
            .getOne();
    }
    async getCount() {
        return await this.productsRepository.count();
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=product.service.js.map