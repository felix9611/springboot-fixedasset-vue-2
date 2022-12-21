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
exports.DasboardService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
let DasboardService = class DasboardService {
    constructor(assetListRepository) {
        this.assetListRepository = assetListRepository;
    }
    async getAssetCostYearMonthFind(findDef) {
        const { typeId, deptId, buyDate } = findDef;
        let from = '', to = '';
        if (buyDate && buyDate.length > 1) {
            from = buyDate[0];
            to = buyDate[1];
        }
        return await this.assetListRepository.findAll({
            attributes: [
                [sequelize_typescript_1.Sequelize.fn('sum', sequelize_typescript_1.Sequelize.col('cost')), 'costs'],
                [sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')), 'year'],
                [sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')), 'month']
            ],
            where: Object.assign(Object.assign(Object.assign({}, buyDate ? { buyDate: { [sequelize_1.Op.between]: [from, to] } } : {}), deptId ? { deptId } : {}), typeId ? { typeId } : {}),
            group: [
                sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')),
                sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')),
                'buyDate'
            ],
            order: [
                sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')),
                sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')),
            ]
        });
    }
    async getAssetItemsYearMonthFind(findDef) {
        const { typeId, deptId, buyDate } = findDef;
        let from = '', to = '';
        if (buyDate && buyDate.length > 1) {
            from = buyDate[0];
            to = buyDate[1];
        }
        return await this.assetListRepository.findAll({
            attributes: [
                [sequelize_typescript_1.Sequelize.fn('count', sequelize_typescript_1.Sequelize.col('id')), 'count'],
                [sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')), 'year'],
                [sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')), 'month']
            ],
            where: Object.assign(Object.assign(Object.assign({}, buyDate ? { buyDate: { [sequelize_1.Op.between]: [from, to] } } : {}), deptId ? { deptId } : {}), typeId ? { typeId } : {}),
            group: [
                sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')),
                sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate'))
            ],
            order: [
                sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')),
                sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')),
            ]
        });
    }
};
DasboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('assetListRepository')),
    __metadata("design:paramtypes", [Object])
], DasboardService);
exports.DasboardService = DasboardService;
//# sourceMappingURL=service.js.map