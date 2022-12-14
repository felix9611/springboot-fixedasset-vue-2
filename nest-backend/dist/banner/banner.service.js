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
exports.BannerService = void 0;
const common_1 = require("@nestjs/common");
const banner_entity_1 = require("./banner.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let BannerService = class BannerService {
    constructor(bannerRepository) {
        this.bannerRepository = bannerRepository;
    }
    async create(createBannerDto) {
        const { createdAt } = createBannerDto;
        createBannerDto.createdAt = createdAt || new Date();
        createBannerDto.updatedAt = new Date();
        delete createBannerDto.id;
        return await this.bannerRepository.save(createBannerDto);
    }
    async delete(removeBannerDto) {
        const { ids } = removeBannerDto;
        return this.bannerRepository.delete(ids);
    }
    async update(updateBannerData) {
        const { id, updateBannerDto } = updateBannerData;
        updateBannerDto.updatedAt = new Date();
        return await this.bannerRepository.update(id, updateBannerDto);
    }
    async findAll(query) {
        const { keyword, category, page = 1, limit = 10 } = query;
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
        const [data, total] = await this.bannerRepository.findAndCount(params);
        return {
            total,
            data,
        };
    }
    async findOneById(id) {
        return this.bannerRepository.findOne(id);
    }
    async getCount() {
        return await this.bannerRepository.count();
    }
};
BannerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(banner_entity_1.Banner)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BannerService);
exports.BannerService = BannerService;
//# sourceMappingURL=banner.service.js.map