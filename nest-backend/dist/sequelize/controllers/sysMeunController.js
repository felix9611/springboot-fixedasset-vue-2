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
exports.SysMenuController = void 0;
const common_1 = require("@nestjs/common");
const sysMenuTableService_1 = require("../service/sysMenuTableService");
const sysMenu_1 = require("../models/sysMenu");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let SysMenuController = class SysMenuController {
    constructor(service) {
        this.service = service;
    }
    async create(sysMenu) {
        return await this.service.createOne(sysMenu);
    }
    async getOne(id) {
        return await this.service.getOne(id);
    }
    async voidOne(id) {
        return await this.service.voidOne(id);
    }
    async getAll() {
        return await this.service.getAllPage();
    }
    async update(sysMenu) {
        return await this.service.updateOne(sysMenu);
    }
    async listAll(sysMenu) {
        return await this.service.findWithList(sysMenu);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sysMenu_1.SysMenu]),
    __metadata("design:returntype", Promise)
], SysMenuController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SysMenuController.prototype, "getOne", null);
__decorate([
    (0, common_1.Delete)('void/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SysMenuController.prototype, "voidOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Get)('get/All'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SysMenuController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sysMenu_1.SysMenu]),
    __metadata("design:returntype", Promise)
], SysMenuController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('list'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sysMenu_1.SysMenu]),
    __metadata("design:returntype", Promise)
], SysMenuController.prototype, "listAll", null);
SysMenuController = __decorate([
    (0, common_1.Controller)('api/sys/menu'),
    __metadata("design:paramtypes", [sysMenuTableService_1.SysMenuTableService])
], SysMenuController);
exports.SysMenuController = SysMenuController;
//# sourceMappingURL=sysMeunController.js.map