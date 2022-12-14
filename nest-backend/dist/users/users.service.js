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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("./users.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lib_1 = require("../libs/lib");
const generator = require("generate-password");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        const { name, password, createdAt } = createUserDto;
        createUserDto.password = (0, lib_1.cryptoString)(password);
        createUserDto.createdAt = createdAt || new Date();
        createUserDto.updatedAt = new Date();
        delete createUserDto.id;
        const isExist = await this.usersRepository.count({
            where: {
                name,
            },
        });
        if (isExist > 0) {
            return {
                statusCode: 202,
                message: '已存在',
            };
        }
        return await this.usersRepository.save(createUserDto);
    }
    async delete(removeUserDto) {
        const { ids } = removeUserDto;
        return this.usersRepository.delete(ids);
    }
    async update(updateUserData) {
        const { id, updateUserDto } = updateUserData;
        updateUserDto.updatedAt = new Date();
        const { name } = updateUserDto;
        const isExist = await this.usersRepository.count({
            where: {
                name,
            },
        });
        if (isExist > 1) {
            return {
                statusCode: 201,
                message: '已存在',
            };
        }
        return await this.usersRepository.update(id, updateUserDto);
    }
    async findAll(query) {
        const { keyword, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        let params = {
            skip,
            take: limit,
        };
        let whereParams = {};
        if (keyword) {
            whereParams = Object.assign(whereParams, {
                name: (0, typeorm_2.Like)(`%${keyword}%`),
            });
        }
        params = Object.assign({
            select: ['id', 'name', 'avatar', 'status', 'createdAt', 'updatedAt', 'status'],
        }, params, {
            where: whereParams,
        }, {
            order: {
                updatedAt: 'DESC',
            },
        });
        const [data, total] = await this.usersRepository.findAndCount(params);
        return {
            total,
            data,
        };
    }
    async findOneByName(username) {
        return this.usersRepository.findOne({
            name: username,
        });
    }
    async findOneById(id) {
        return this.usersRepository.findOne(id);
    }
    async updatePassword(data) {
        const { id, body } = data;
        const user = await this.usersRepository.findOne(id);
        let { oldPassword, password: newPassword } = body;
        oldPassword = (0, lib_1.cryptoString)(oldPassword);
        body.password = (0, lib_1.cryptoString)(newPassword);
        const { password } = user;
        if (password !== oldPassword) {
            return {
                statusCode: 400,
                message: '旧密码不正确。',
            };
        }
        body.updatedAt = new Date();
        delete body.oldPassword;
        delete body.rePassword;
        return await this.usersRepository.update(id, body);
    }
    async resetPassword(params) {
        const { id } = params;
        const password = generator.generate({
            length: 10,
            numbers: true,
            symbols: false,
        });
        const data = {
            password: (0, lib_1.cryptoString)(password),
            updatedAt: new Date(),
        };
        const result = await this.usersRepository.update(id, data);
        return {
            password,
            result,
        };
    }
    async updateAvatar(data) {
        const { id, updateUserAvatar } = data;
        updateUserAvatar.updatedAt = new Date();
        return await this.usersRepository.update(id, Object.assign({}, updateUserAvatar));
    }
    async getCount() {
        return await this.usersRepository.count();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map