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
const assetList_1 = require("../models/assetList");
const department_1 = require("../models/department");
const assetType_1 = require("../models/assetType");
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
        if (buyDate) {
            from = buyDate[0];
            to = buyDate[1];
        }
        return await this.assetListRepository.findAll({
            attributes: [
                [sequelize_typescript_1.Sequelize.fn('sum', sequelize_typescript_1.Sequelize.col('cost')), 'costs'],
                [sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')), 'year'],
                [sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')), 'month']
            ],
            where: Object.assign(Object.assign(Object.assign(Object.assign({}, buyDate ? { buyDate: { [sequelize_1.Op.between]: buyDate, [sequelize_1.Op.ne]: null } } : { buyDate: { [sequelize_1.Op.ne]: null } }), deptId ? { deptId } : {}), typeId ? { typeId } : {}), { status: 1 }),
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
        if (buyDate) {
            from = buyDate[0];
            to = buyDate[1];
        }
        return await this.assetListRepository.findAll({
            attributes: [
                [sequelize_typescript_1.Sequelize.fn('count', sequelize_typescript_1.Sequelize.col('id')), 'count'],
                [sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')), 'year'],
                [sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')), 'month']
            ],
            where: Object.assign(Object.assign(Object.assign(Object.assign({}, buyDate ? { buyDate: { [sequelize_1.Op.between]: buyDate, [sequelize_1.Op.ne]: null } } : { buyDate: { [sequelize_1.Op.ne]: null } }), deptId ? { deptId } : {}), typeId ? { typeId } : {}), { status: 1 }),
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
    async getAssetCountsYearMonthByDeptFind(findDef) {
        const { typeId, deptId, buyDate } = findDef;
        let from = '', to = '';
        if (buyDate) {
            from = buyDate[0];
            to = buyDate[1];
        }
        assetList_1.AssetList.belongsTo(department_1.Department, {
            foreignKey: 'deptId'
        });
        return await this.assetListRepository.findAll({
            include: [
                {
                    attributes: ['deptName'],
                    model: department_1.Department,
                    required: false,
                    where: { status: 1 }
                },
            ],
            attributes: [
                [sequelize_typescript_1.Sequelize.fn('count', sequelize_typescript_1.Sequelize.col('assetList.id')), 'count'],
                [sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')), 'year'],
                [sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')), 'month'],
            ],
            where: Object.assign(Object.assign(Object.assign(Object.assign({}, buyDate ? { buyDate: { [sequelize_1.Op.between]: buyDate, [sequelize_1.Op.ne]: null } } : { buyDate: { [sequelize_1.Op.ne]: null } }), deptId ? { deptId } : {}), typeId ? { typeId } : {}), { status: 1 }),
            group: [
                sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')),
                sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')),
                'deptId'
            ],
            order: [
                sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')),
                sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')),
            ]
        });
    }
    async getAssetCostsYearMonthByDeptFind(findDef) {
        const { typeId, deptId, buyDate } = findDef;
        let from = '', to = '';
        if (buyDate) {
            from = buyDate[0];
            to = buyDate[1];
        }
        assetList_1.AssetList.belongsTo(department_1.Department, {
            foreignKey: 'deptId'
        });
        return await this.assetListRepository.findAll({
            include: [
                {
                    attributes: ['deptName'],
                    model: department_1.Department,
                    required: false,
                    where: { status: 1 }
                },
            ],
            attributes: [
                [sequelize_typescript_1.Sequelize.fn('sum', sequelize_typescript_1.Sequelize.col('cost')), 'costs'],
                [sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')), 'year'],
                [sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')), 'month'],
            ],
            where: Object.assign(Object.assign(Object.assign(Object.assign({}, buyDate ? { buyDate: { [sequelize_1.Op.between]: buyDate, [sequelize_1.Op.ne]: null } } : { buyDate: { [sequelize_1.Op.ne]: null } }), deptId ? { deptId } : {}), typeId ? { typeId } : {}), { status: 1 }),
            group: [
                sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')),
                sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')),
                'deptId'
            ],
            order: [
                sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')),
                sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')),
            ]
        });
    }
    async getAssetCostsYearMonthByTypeFind(findDef) {
        const { typeId, deptId, buyDate } = findDef;
        assetList_1.AssetList.belongsTo(assetType_1.AssetType, {
            foreignKey: 'typeId'
        });
        return await this.assetListRepository.findAll({
            include: [
                {
                    attributes: ['typeName'],
                    model: assetType_1.AssetType,
                    required: false,
                    where: { status: 1 }
                },
            ],
            attributes: [
                [sequelize_typescript_1.Sequelize.fn('sum', sequelize_typescript_1.Sequelize.col('cost')), 'costs'],
                [sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')), 'year'],
                [sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')), 'month'],
            ],
            where: Object.assign(Object.assign(Object.assign(Object.assign({}, buyDate ? { buyDate: { [sequelize_1.Op.between]: buyDate, [sequelize_1.Op.ne]: null } } : { buyDate: { [sequelize_1.Op.ne]: null } }), deptId ? { deptId } : {}), typeId ? { typeId } : {}), { status: 1 }),
            group: [
                sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')),
                sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')),
                'typeId'
            ],
            order: [
                sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')),
                sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')),
            ]
        });
    }
    async getAssetCountYearMonthByTypeFind(findDef) {
        const { typeId, deptId, buyDate } = findDef;
        assetList_1.AssetList.belongsTo(assetType_1.AssetType, {
            foreignKey: 'typeId'
        });
        return await this.assetListRepository.findAll({
            include: [
                {
                    attributes: ['typeName'],
                    model: assetType_1.AssetType,
                    required: false,
                    where: { status: 1 }
                },
            ],
            attributes: [
                [sequelize_typescript_1.Sequelize.fn('count', sequelize_typescript_1.Sequelize.col('assetList.id')), 'count'],
                [sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')), 'year'],
                [sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')), 'month'],
            ],
            where: Object.assign(Object.assign(Object.assign(Object.assign({}, buyDate ? { buyDate: { [sequelize_1.Op.between]: buyDate, [sequelize_1.Op.ne]: null } } : { buyDate: { [sequelize_1.Op.ne]: null } }), deptId ? { deptId } : {}), typeId ? { typeId } : {}), { status: 1 }),
            group: [
                sequelize_typescript_1.Sequelize.fn('year', sequelize_typescript_1.Sequelize.col('buyDate')),
                sequelize_typescript_1.Sequelize.fn('MONTH', sequelize_typescript_1.Sequelize.col('buyDate')),
                'typeId'
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