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
exports.AboutController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_about_dto_1 = require("./dto/create-about.dto");
const about_service_1 = require("./about.service");
const remove_about_dto_1 = require("./dto/remove-about.dto");
const retrieve_about_dto_1 = require("./dto/retrieve-about.dto");
const update_about_dto_1 = require("./dto/update-about.dto");
const find_about_dto_1 = require("./dto/find-about.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const utils_1 = require("../libs/utils");
let AboutController = class AboutController {
    constructor(aboutsService) {
        this.aboutsService = aboutsService;
    }
    async create(createAboutDto) {
        return await this.aboutsService.create(createAboutDto);
    }
    async remove(removeAboutDto, req) {
        (0, utils_1.Log)({ req });
        return await this.aboutsService.delete(removeAboutDto);
    }
    async update(params, updateAboutDto) {
        return await this.aboutsService.update({
            id: params.id,
            updateAboutDto,
        });
    }
    async findAll(query) {
        return await this.aboutsService.findAll(query);
    }
    async findOneById(params) {
        return await this.aboutsService.findOneById(params);
    }
    async getCount() {
        return await this.aboutsService.getCount();
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '增加' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_about_dto_1.CreateAboutDto]),
    __metadata("design:returntype", Promise)
], AboutController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: '删除' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_about_dto_1.RemoveAboutDto, Object]),
    __metadata("design:returntype", Promise)
], AboutController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [retrieve_about_dto_1.RetrieveAboutDto,
        update_about_dto_1.UpdateAboutDto]),
    __metadata("design:returntype", Promise)
], AboutController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '列表' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_about_dto_1.FindAboutDto]),
    __metadata("design:returntype", Promise)
], AboutController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '根据 id 查找' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [retrieve_about_dto_1.RetrieveAboutDto]),
    __metadata("design:returntype", Promise)
], AboutController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Get)('list/count'),
    (0, swagger_1.ApiOperation)({ summary: '用户数量' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AboutController.prototype, "getCount", null);
AboutController = __decorate([
    (0, swagger_1.ApiTags)('关于我们'),
    (0, common_1.Controller)('api/about'),
    __metadata("design:paramtypes", [about_service_1.AboutService])
], AboutController);
exports.AboutController = AboutController;
//# sourceMappingURL=about.controller.js.map