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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./dto/create-user.dto");
const users_service_1 = require("./users.service");
const remove_user_dto_1 = require("./dto/remove-user.dto");
const retrieve_user_dto_1 = require("./dto/retrieve-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const find_user_dto_1 = require("./dto/find-user.dto");
const update_user_password_dto_1 = require("./dto/update-user-password.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const utils_1 = require("../libs/utils");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getProfile(req) {
        return req.user;
    }
    async create(createUserDto) {
        return await this.usersService.create(createUserDto);
    }
    async remove(removeUserDto, req) {
        (0, utils_1.Log)({ req });
        return await this.usersService.delete(removeUserDto);
    }
    async update(id, updateUserDto) {
        return await this.usersService.update({
            id,
            updateUserDto,
        });
    }
    async findAll(query) {
        return await this.usersService.findAll(query);
    }
    async findAllFE(query) {
        return await this.usersService.findAll(query);
    }
    async findOneById(params) {
        return await this.usersService.findOneById(params.id);
    }
    async updatePassword(params, updataUserPasswordDto) {
        return await this.usersService.updatePassword({
            id: params.id,
            body: updataUserPasswordDto,
        });
    }
    async resetPassword(params) {
        return await this.usersService.resetPassword(params);
    }
    async updateAvatar(id, updateUserAvatar) {
        return await this.usersService.updateAvatar({
            id,
            updateUserAvatar,
        });
    }
    async getCount() {
        return await this.usersService.getCount();
    }
    async getUserInfo(req) {
        console.log('catch here', req.user);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Get User Detail' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create User' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Void User' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_user_dto_1.RemoveUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update User' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('list'),
    (0, swagger_1.ApiOperation)({ summary: 'Listing POST' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_dto_1.FindUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, swagger_1.ApiOperation)({ summary: 'Listing GET' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_dto_1.FindUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAllFE", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Find By Id' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [retrieve_user_dto_1.RetrieveUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOneById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Put)('password/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Password' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [retrieve_user_dto_1.RetrieveUserDto,
        update_user_password_dto_1.UpdataUserPasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Put)('password/reset/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Reset Password' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [retrieve_user_dto_1.RetrieveUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Put)('avatar/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Setting Avatar' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateAvatar", null);
__decorate([
    (0, common_1.Get)('list/count'),
    (0, swagger_1.ApiOperation)({ summary: 'Users Count' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'User Info' }),
    (0, common_1.Get)('userInfo'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserInfo", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map