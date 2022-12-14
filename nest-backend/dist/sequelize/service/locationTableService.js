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
exports.LocationTableService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
let LocationTableService = class LocationTableService {
    constructor(locationRepository) {
        this.locationRepository = locationRepository;
    }
    async createOne(location) {
        return await this.locationRepository.create(Object.assign(Object.assign({}, location), { status: 1 }));
    }
    async getAll() {
        return await this.locationRepository.findAll({ where: { status: 1 } });
    }
    async getOne(id) {
        return await this.locationRepository.findOne({ where: { id } });
    }
    async updateOne(location) {
        const { id } = location, _location = __rest(location, ["id"]);
        return await this.locationRepository.update(Object.assign({}, _location), { where: { id } });
    }
    async voidOne(id) {
        return await this.locationRepository.update({ status: 0 }, { where: { id } });
    }
    async listPage(location) {
        const { placeCode, placeName, page, limit } = location;
        const offset = page * limit - limit;
        const data = this.locationRepository.findAndCountAll(Object.assign({ where: Object.assign(Object.assign(Object.assign({}, placeCode ? { placeCode: { [sequelize_1.Op.like]: `%${placeCode}%` } } : {}), placeName ? { placeName: { [sequelize_1.Op.like]: `%${placeName}%` } } : {}), { status: 1 }), limit }, (page > 1) ? { offset } : {}));
        return data;
    }
    async findInfo(placeCode, placeName) {
        return await this.locationRepository.findOne({ where: { placeCode, placeName, status: 1 } });
    }
};
LocationTableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('locationRepository')),
    __metadata("design:paramtypes", [Object])
], LocationTableService);
exports.LocationTableService = LocationTableService;
//# sourceMappingURL=locationTableService.js.map