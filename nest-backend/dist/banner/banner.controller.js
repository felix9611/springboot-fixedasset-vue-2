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
exports.BannerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_banner_dto_1 = require("./dto/create-banner.dto");
const banner_service_1 = require("./banner.service");
const remove_banner_dto_1 = require("./dto/remove-banner.dto");
const retrieve_banner_dto_1 = require("./dto/retrieve-banner.dto");
const update_banner_dto_1 = require("./dto/update-banner.dto");
const find_banner_dto_1 = require("./dto/find-banner.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const utils_1 = require("../libs/utils");
let BannerController = class BannerController {
    constructor(bannersService) {
        this.bannersService = bannersService;
    }
    async create(createBannerDto) {
        return await this.bannersService.create(createBannerDto);
    }
    async remove(removeBannerDto, req) {
        (0, utils_1.Log)({ req });
        return await this.bannersService.delete(removeBannerDto);
    }
    async update(params, updateBannerDto) {
        return await this.bannersService.update({
            id: params.id,
            updateBannerDto,
        });
    }
    async findAll(query) {
        return await this.bannersService.findAll(query);
    }
    async findOneById(params) {
        return await this.bannersService.findOneById(params.id);
    }
    async getCount() {
        return await this.bannersService.getCount();
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '增加' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_banner_dto_1.CreateBannerDto]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: '删除' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_banner_dto_1.RemoveBannerDto, Object]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [retrieve_banner_dto_1.RetrieveBannerDto,
        update_banner_dto_1.UpdateBannerDto]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '列表' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_banner_dto_1.FindBannerDto]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '根据 id 查找' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [retrieve_banner_dto_1.RetrieveBannerDto]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Get)('list/count'),
    (0, swagger_1.ApiOperation)({ summary: '用户数量' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "getCount", null);
BannerController = __decorate([
    (0, swagger_1.ApiTags)('Banner'),
    (0, common_1.Controller)('api/banner'),
    __metadata("design:paramtypes", [banner_service_1.BannerService])
], BannerController);
exports.BannerController = BannerController;
//# sourceMappingURL=banner.controller.js.map