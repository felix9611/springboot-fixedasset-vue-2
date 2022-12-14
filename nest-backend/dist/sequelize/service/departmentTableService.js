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
exports.DepartmentTableService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
let DepartmentTableService = class DepartmentTableService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    async getOne(id) {
        return await this.departmentRepository.findOne({ where: { id } });
    }
    async getAll() {
        return await this.departmentRepository.findAll({ where: { status: 1 } });
    }
    async createOne(department) {
        let { deptCode } = department, _department = __rest(department, ["deptCode"]);
        const count = await this.departmentRepository.count({ where: { deptCode } });
        if (count === 0) {
            return await this.departmentRepository.create(Object.assign({ status: 1, deptCode }, _department));
        }
        else if (count > 1) {
            throw new Error('The department code has exist');
        }
    }
    async updateOne(department) {
        let { deptCode, id } = department, _department = __rest(department, ["deptCode", "id"]);
        return await this.departmentRepository.update(Object.assign({ deptCode }, _department), { where: { id } });
    }
    async voidOne(id) {
        return await this.departmentRepository.update({ status: 0 }, { where: { id } });
    }
    async listPage(department) {
        const { deptCode, deptName, page, limit } = department;
        const offset = page * limit - limit;
        const data = this.departmentRepository.findAndCountAll(Object.assign({ where: Object.assign(Object.assign(Object.assign({}, deptCode ? { deptCode: { [sequelize_1.Op.like]: `%${deptCode}%` } } : {}), deptName ? { deptName: { [sequelize_1.Op.like]: `%${deptName}%` } } : {}), { status: 1 }), limit }, (page > 1) ? { offset } : {}));
        return data;
    }
    async findInfo(deptCode, deptName) {
        return await this.departmentRepository.findOne({ where: { deptCode, deptName, status: 1 } });
    }
};
DepartmentTableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('departmentRepository')),
    __metadata("design:paramtypes", [Object])
], DepartmentTableService);
exports.DepartmentTableService = DepartmentTableService;
//# sourceMappingURL=departmentTableService.js.map