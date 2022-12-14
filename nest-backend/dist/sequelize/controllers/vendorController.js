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
exports.VendorController = void 0;
const common_1 = require("@nestjs/common");
const vendorTableService_1 = require("../service/vendorTableService");
const vendor_1 = require("../models/vendor");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../interface/dto");
let VendorController = class VendorController {
    constructor(service) {
        this.service = service;
    }
    async getAll() {
        return await this.service.getAll();
    }
    async listAll(vendor) {
        return await this.service.listPage(vendor);
    }
    async getOne(id) {
        return await this.service.getOne(id);
    }
    async createOne(vendor) {
        return await this.service.createOne(vendor);
    }
    async updateOne(vendor) {
        return await this.service.updateOne(vendor);
    }
    async voidOne(id) {
        return await this.service.voidOne(id);
    }
    async batchCreate(vendors) {
        return vendors.forEach(async (vendor) => {
            return await this.service.createOne(vendor);
        });
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All' }),
    (0, common_1.Get)('getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Void by ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.VendorFindDTO }),
    (0, common_1.Post)('listAll'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_1.Vendor]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "listAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get by ID' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "getOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create' }),
    (0, swagger_1.ApiBody)({ type: dto_1.vendorCreateDTO }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_1.Vendor]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "createOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_1.Vendor]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "updateOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Void by ID' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Delete)('void/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "voidOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Batch Create' }),
    (0, swagger_1.ApiBody)({ type: [dto_1.vendorCreateDTO] }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('batch/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "batchCreate", null);
VendorController = __decorate([
    (0, swagger_1.ApiTags)('Vendor'),
    (0, common_1.Controller)('api/vendor'),
    __metadata("design:paramtypes", [vendorTableService_1.VendorTableService])
], VendorController);
exports.VendorController = VendorController;
//# sourceMappingURL=vendorController.js.map