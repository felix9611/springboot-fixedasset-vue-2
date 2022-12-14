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
exports.AssetListController = void 0;
const common_1 = require("@nestjs/common");
const assetListTableService_1 = require("../service/assetListTableService");
const assetList_1 = require("../models/assetList");
const writeOff_1 = require("../models/writeOff");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const import_1 = require("../interface/import");
const index_1 = require("../interface/index");
const swagger_1 = require("@nestjs/swagger");
let AssetListController = class AssetListController {
    constructor(service) {
        this.service = service;
    }
    async list(assetList) {
        return await this.service.listAll(assetList);
    }
    async listAll(assetList) {
        return await this.service.listPage(assetList);
    }
    async getOne(id) {
        return await this.service.getOne(id);
    }
    async findByCode(assetCode) {
        return await this.service.findByCode(assetCode);
    }
    async createOne(assetList) {
        return await this.service.createOne(assetList);
    }
    async updateOne(assetList) {
        return await this.service.updateOne(assetList);
    }
    async findAsset(assetList) {
        return await this.service.findAsset(assetList);
    }
    async voidOne(id) {
        return await this.service.voidOne(id);
    }
    async writteOffPrcoess(writeOff) {
        return await this.service.writteOffPrcoess(writeOff);
    }
    async findFile(assetId) {
        return await this.service.getPhotoData(assetId);
    }
    async voidFile(id) {
        return await this.service.voidFile(id);
    }
    async saveImage(assetFileImport) {
        return await this.service.saveImage(assetFileImport);
    }
    async importData(importDatas) {
        return importDatas.forEach((asset, i) => {
            setTimeout(async () => { return await this.service.importAsset(asset); }, 2500 * i);
        });
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'List Asset' }),
    (0, swagger_1.ApiBody)({ type: index_1.FindAssetListAll }),
    (0, common_1.Post)('list'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assetList_1.AssetList]),
    __metadata("design:returntype", Promise)
], AssetListController.prototype, "list", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listing with page' }),
    (0, swagger_1.ApiBody)({ type: index_1.FindAssetList }),
    (0, common_1.Post)('listAll'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assetList_1.AssetList]),
    __metadata("design:returntype", Promise)
], AssetListController.prototype, "listAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get one by id' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssetListController.prototype, "getOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get one by asset code' }),
    (0, common_1.Get)('code/:assetCode'),
    __param(0, (0, common_1.Param)('assetCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssetListController.prototype, "findByCode", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Asset' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assetList_1.AssetList]),
    __metadata("design:returntype", Promise)
], AssetListController.prototype, "createOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update Asset' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assetList_1.AssetList]),
    __metadata("design:returntype", Promise)
], AssetListController.prototype, "updateOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Asset' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('findAsset'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assetList_1.AssetList]),
    __metadata("design:returntype", Promise)
], AssetListController.prototype, "findAsset", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Void Asset by id' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Delete)('void/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssetListController.prototype, "voidOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Write Off Asset' }),
    (0, common_1.Post)('writeoff/form'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [writeOff_1.WriteOff]),
    __metadata("design:returntype", Promise)
], AssetListController.prototype, "writteOffPrcoess", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Asset Image as one asset' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Get)('images/:assetId'),
    __param(0, (0, common_1.Param)('assetId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssetListController.prototype, "findFile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Void asset images' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Delete)('images/void/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssetListController.prototype, "voidFile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Save Asset Image for one asset' }),
    (0, swagger_1.ApiBody)({ type: index_1.AssetFileImport }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('images/save'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_1.AssetFileImport]),
    __metadata("design:returntype", Promise)
], AssetListController.prototype, "saveImage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Import List of asset' }),
    (0, swagger_1.ApiBody)({ type: [import_1.ImportAsset] }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('import'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AssetListController.prototype, "importData", null);
AssetListController = __decorate([
    (0, swagger_1.ApiTags)('Assets'),
    (0, common_1.Controller)('api/asset/list'),
    __metadata("design:paramtypes", [assetListTableService_1.AssetListTableService])
], AssetListController);
exports.AssetListController = AssetListController;
//# sourceMappingURL=assetListController.js.map