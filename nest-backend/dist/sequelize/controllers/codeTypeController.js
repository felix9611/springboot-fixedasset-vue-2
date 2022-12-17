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
exports.CodeTypeController = void 0;
const common_1 = require("@nestjs/common");
const codeTypeTableService_1 = require("../service/codeTypeTableService");
const codeType_1 = require("../models/codeType");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../interface/dto");
let CodeTypeController = class CodeTypeController {
    constructor(service) {
        this.service = service;
    }
    async createOne(codeType) {
        return await this.service.createOne(codeType);
    }
    async updateOne(codeType) {
        return await this.service.updateOne(codeType);
    }
    async listPage(codeType) {
        return await this.service.listPage(codeType);
    }
    async voidOne(id) {
        return await this.service.voidOne(id);
    }
    async getOne(id) {
        return await this.service.getOne(id);
    }
    async findByType(codeType) {
        return await this.service.findByType(codeType);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CodeTypeCreatedDto }),
    (0, swagger_1.ApiCreatedResponse)({ status: 200, description: 'This record has been successfully created.', type: codeType_1.CodeType }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [codeType_1.CodeType]),
    __metadata("design:returntype", Promise)
], CodeTypeController.prototype, "createOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update' }),
    (0, swagger_1.ApiCreatedResponse)({ status: 200, description: 'This record has been successfully updated.', type: codeType_1.CodeType }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [codeType_1.CodeType]),
    __metadata("design:returntype", Promise)
], CodeTypeController.prototype, "updateOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Page Listing' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CodeTypeFindDto }),
    (0, common_1.Post)('listPage'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [codeType_1.CodeType]),
    __metadata("design:returntype", Promise)
], CodeTypeController.prototype, "listPage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Void by Id' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, type: 'number', example: 1 }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Delete)('void/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CodeTypeController.prototype, "voidOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get by Id' }),
    (0, swagger_1.ApiCreatedResponse)({ status: 200, description: 'This record has been successfully get one.', type: codeType_1.CodeType }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, type: 'number', example: 1 }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CodeTypeController.prototype, "getOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find by the type' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CodeTypeFindByTypeDto }),
    (0, common_1.Post)('findByType'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [codeType_1.CodeType]),
    __metadata("design:returntype", Promise)
], CodeTypeController.prototype, "findByType", null);
CodeTypeController = __decorate([
    (0, swagger_1.ApiTags)('Code Type'),
    (0, common_1.Controller)('api/code/type'),
    __metadata("design:paramtypes", [codeTypeTableService_1.CodeTypeTableService])
], CodeTypeController);
exports.CodeTypeController = CodeTypeController;
//# sourceMappingURL=codeTypeController.js.map