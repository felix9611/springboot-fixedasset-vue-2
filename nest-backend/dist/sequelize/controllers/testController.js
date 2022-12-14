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
exports.TestController = void 0;
const common_1 = require("@nestjs/common");
const testTableService_1 = require("../service/testTableService");
const test_1 = require("../models/test");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let TestController = class TestController {
    constructor(service) {
        this.service = service;
    }
    async create(test) {
        return await this.service.new(test);
    }
    async update(id, test) {
        return await this.service.update(id, test);
    }
    async remove(id) {
        return await this.service.removeOne(id);
    }
    async removeBatch(ids) {
        return await this.service.removeBatch(ids);
    }
    async getOne(id) {
        return await this.service.findOne(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('new'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [test_1.Test]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update by Id' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, test_1.Test]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Void by Id' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Delete)('remove/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Batch for Void' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Delete)('batch/remove'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "removeBatch", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get by Id' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "getOne", null);
TestController = __decorate([
    (0, swagger_1.ApiTags)('Test'),
    (0, common_1.Controller)('api/test'),
    __metadata("design:paramtypes", [testTableService_1.TestTableService])
], TestController);
exports.TestController = TestController;
//# sourceMappingURL=testController.js.map