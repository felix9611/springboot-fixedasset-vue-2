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
exports.AssetTypeController = void 0;
const common_1 = require("@nestjs/common");
const assetTypeTableService_1 = require("../service/assetTypeTableService");
const assetType_1 = require("../models/assetType");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../interface/dto");
let AssetTypeController = class AssetTypeController {
    constructor(service) {
        this.service = service;
    }
    async create(assetType) {
        return await this.service.create(assetType);
    }
    async batchCreate(assetTypes) {
        return assetTypes.forEach(async (at) => {
            return await this.service.create(at);
        });
    }
    async listAllPage(assetType) {
        return this.service.listPage(assetType);
    }
    async getOneData(id) {
        return await this.service.getOne(id);
    }
    async updateOne(assetType) {
        return await this.service.updateOne(assetType);
    }
    async voidOneData(id) {
        return await this.service.voidOne(id);
    }
    async getAll() {
        return await this.service.getAll();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Type' }),
    (0, swagger_1.ApiBody)({ type: dto_1.AssetTypeCreateDTO }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assetType_1.AssetType]),
    __metadata("design:returntype", Promise)
], AssetTypeController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Batching Create Type' }),
    (0, swagger_1.ApiBody)({ type: [dto_1.AssetTypeCreateDTO] }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('batch/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AssetTypeController.prototype, "batchCreate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'List Type by page' }),
    (0, swagger_1.ApiBody)({ type: dto_1.AssetTypeFindDTO }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('/listAll'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assetType_1.AssetType]),
    __metadata("design:returntype", Promise)
], AssetTypeController.prototype, "listAllPage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get one by Id' }),
    (0, common_1.Get)('/get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssetTypeController.prototype, "getOneData", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update Type' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assetType_1.AssetType]),
    __metadata("design:returntype", Promise)
], AssetTypeController.prototype, "updateOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Void one by Id' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Delete)('remove/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssetTypeController.prototype, "voidOneData", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Type as active' }),
    (0, common_1.Get)('getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssetTypeController.prototype, "getAll", null);
AssetTypeController = __decorate([
    (0, swagger_1.ApiTags)('Assets Type'),
    (0, common_1.Controller)('api/asset/type'),
    __metadata("design:paramtypes", [assetTypeTableService_1.AssetTypeTableService])
], AssetTypeController);
exports.AssetTypeController = AssetTypeController;
//# sourceMappingURL=AssetTypeController.js.map