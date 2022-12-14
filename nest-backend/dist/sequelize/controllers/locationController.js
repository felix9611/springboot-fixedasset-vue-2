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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const locationTableService_1 = require("../service/locationTableService");
const location_1 = require("../models/location");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let LocationController = class LocationController {
    constructor(service) {
        this.service = service;
    }
    async createOne(location) {
        return await this.service.createOne(location);
    }
    async updateOne(location) {
        return await this.service.updateOne(location);
    }
    async getAll() {
        return await this.service.getAll();
    }
    async getOne(id) {
        return await this.service.getOne(id);
    }
    async voidOne(id) {
        return await this.service.voidOne(id);
    }
    async listAll(location) {
        return await this.service.listPage(location);
    }
    async batchCreate(locations) {
        return locations.forEach(async (loc) => {
            return await this.service.createOne(loc);
        });
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_1.Location]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "createOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_1.Location]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Get)('GetAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Delete)('void/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "voidOne", null);
__decorate([
    (0, common_1.Post)('listAll'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_1.Location]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "listAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('batch/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "batchCreate", null);
LocationController = __decorate([
    (0, swagger_1.ApiTags)('Location'),
    (0, common_1.Controller)('api/location'),
    __metadata("design:paramtypes", [locationTableService_1.LocationTableService])
], LocationController);
exports.LocationController = LocationController;
//# sourceMappingURL=locationController.js.map