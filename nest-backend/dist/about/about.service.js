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
exports.AboutService = void 0;
const common_1 = require("@nestjs/common");
const about_entity_1 = require("./about.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AboutService = class AboutService {
    constructor(aboutRepository) {
        this.aboutRepository = aboutRepository;
    }
    async create(createAboutDto) {
        const { createdAt } = createAboutDto;
        createAboutDto.createdAt = createdAt || new Date();
        createAboutDto.updatedAt = new Date();
        delete createAboutDto.id;
        return await this.aboutRepository.save(createAboutDto);
    }
    async delete(removeAboutDto) {
        const { ids } = removeAboutDto;
        return this.aboutRepository.delete(ids);
    }
    async update(updateAboutData) {
        const { id, updateAboutDto } = updateAboutData;
        updateAboutDto.updatedAt = new Date();
        return await this.aboutRepository.update(id, updateAboutDto);
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
        const [data, total] = await this.aboutRepository.findAndCount(params);
        return {
            total,
            data,
        };
    }
    async findOneById(params) {
        const { id } = params;
        return this.aboutRepository
            .createQueryBuilder('about')
            .where([{ category: id }, { id }])
            .getOne();
    }
    async getCount() {
        return await this.aboutRepository.count();
    }
};
AboutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(about_entity_1.About)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AboutService);
exports.AboutService = AboutService;
//# sourceMappingURL=about.service.js.map