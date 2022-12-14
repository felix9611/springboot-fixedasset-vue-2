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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeTypeTableService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
let CodeTypeTableService = class CodeTypeTableService {
    constructor(codeTypeRepository) {
        this.codeTypeRepository = codeTypeRepository;
    }
    async createOne(codeType) {
        return await this.codeTypeRepository.create(Object.assign(Object.assign({}, codeType), { status: 1 }));
    }
    async updateOne(codeType) {
        const { id } = codeType, _codeType = __rest(codeType, ["id"]);
        return await this.codeTypeRepository.update(Object.assign({}, _codeType), { where: { id } });
    }
    async listPage(codeType) {
        const { valueCode, limit, page } = codeType;
        const offset = page * limit - limit;
        return this.codeTypeRepository.findAndCountAll(Object.assign({ where: Object.assign(Object.assign({}, valueCode ? { deptCode: { [sequelize_1.Op.like]: `%${valueCode}%` } } : {}), { status: 1 }), limit }, (page > 1) ? { offset } : {}));
    }
    async voidOne(id) {
        return await this.codeTypeRepository.update({ status: 0 }, { where: { id } });
    }
    async getOne(id) {
        return await this.codeTypeRepository.findOne({ where: { id } });
    }
    async getAll() {
        return await this.codeTypeRepository.findAll({ where: { status: 1 } });
    }
    async findByType(codeType) {
        const { type } = codeType;
        return await this.codeTypeRepository.findAll({ where: { type } });
    }
};
CodeTypeTableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('codeTypeRepository')),
    __metadata("design:paramtypes", [Object])
], CodeTypeTableService);
exports.CodeTypeTableService = CodeTypeTableService;
//# sourceMappingURL=codeTypeTableService.js.map