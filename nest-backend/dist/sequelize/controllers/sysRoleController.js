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
exports.SysRoleController = void 0;
const common_1 = require("@nestjs/common");
const sysRoleTableService_1 = require("../service/sysRoleTableService");
const sysRole_1 = require("../models/sysRole");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let SysRoleController = class SysRoleController {
    constructor(service) {
        this.service = service;
    }
    async createRole(sysRole) {
        return await this.service.create(sysRole);
    }
    async updateRole(sysRole) {
        return await this.service.update(sysRole);
    }
    async getAll() {
        return await this.service.getAll();
    }
    async listOnPages(sysRole) {
        return await this.service.findWithList(sysRole);
    }
    async getPagesByRole({ roles }) {
        return await this.service.getPagesByRole(roles);
    }
    async voidOne(id) {
        return await this.service.voidOne(id);
    }
    async infoOne(id) {
        return await this.service.getOne(id);
    }
    async getPagesByUser(req) {
        const { userId } = req.user;
        return await this.service.getPagesByUser(userId);
    }
    async getAllRole({ roles }) {
        return await this.service.getAllRole(roles);
    }
    async menuhandle(roleId) {
        return await this.service.menuhandle(roleId);
    }
    async menuhandleUpdate(roleId, menuIds) {
        return await this.service.menuhandleUpdate(roleId, menuIds);
    }
    async roleshandleUpdate(userId, roleIds) {
        return await this.service.roleshandleUpdate(roleIds, userId);
    }
    async getUserRole(userId) {
        return await this.service.getUserRole(userId);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sysRole_1.SysRole]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "createRole", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sysRole_1.SysRole]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "updateRole", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Get)('/get/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('list'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sysRole_1.SysRole]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "listOnPages", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('pages'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "getPagesByRole", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Delete)('void/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "voidOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Get)('info/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "infoOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Get)('user/pages'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "getPagesByUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('all/roles'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "getAllRole", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Get)('menu/handle/:roleId'),
    __param(0, (0, common_1.Param)('roleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "menuhandle", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('menu/handle/update/:roleId'),
    __param(0, (0, common_1.Param)('roleId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "menuhandleUpdate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)('handle/update/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "roleshandleUpdate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "getUserRole", null);
SysRoleController = __decorate([
    (0, swagger_1.ApiTags)('System Roles'),
    (0, common_1.Controller)('api/sys/role'),
    __metadata("design:paramtypes", [sysRoleTableService_1.SysRoleTableService])
], SysRoleController);
exports.SysRoleController = SysRoleController;
//# sourceMappingURL=sysRoleController.js.map