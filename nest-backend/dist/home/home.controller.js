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
exports.HomeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_home_dto_1 = require("./dto/create-home.dto");
const home_service_1 = require("./home.service");
const remove_home_dto_1 = require("./dto/remove-home.dto");
const retrieve_home_dto_1 = require("./dto/retrieve-home.dto");
const update_home_dto_1 = require("./dto/update-home.dto");
const find_home_dto_1 = require("./dto/find-home.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const utils_1 = require("../libs/utils");
let HomeController = class HomeController {
    constructor(homesService) {
        this.homesService = homesService;
    }
    async create(createHomeDto) {
        return await this.homesService.create(createHomeDto);
    }
    async remove(removeHomeDto, req) {
        (0, utils_1.Log)({ req });
        return await this.homesService.delete(removeHomeDto);
    }
    async update(params, updateHomeDto) {
        return await this.homesService.update({
            id: params.id,
            updateHomeDto,
        });
    }
    async findAll(query) {
        return await this.homesService.findAll(query);
    }
    async findOneById(params) {
        return await this.homesService.findOneById(params.id);
    }
    async getCount() {
        return await this.homesService.getCount();
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_home_dto_1.CreateHomeDto]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Remove' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_home_dto_1.RemoveHomeDto, Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [retrieve_home_dto_1.RetrieveHomeDto,
        update_home_dto_1.UpdateHomeDto]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_home_dto_1.FindHomeDto]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Find By ID' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [retrieve_home_dto_1.RetrieveHomeDto]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Get)('list/count'),
    (0, swagger_1.ApiOperation)({ summary: 'Count' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getCount", null);
HomeController = __decorate([
    (0, swagger_1.ApiTags)('Home'),
    (0, common_1.Controller)('api/home'),
    __metadata("design:paramtypes", [home_service_1.HomeService])
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map