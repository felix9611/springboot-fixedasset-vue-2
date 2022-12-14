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
exports.StockTakeTableService = void 0;
const common_1 = require("@nestjs/common");
const stocktake_1 = require("../models/stocktake");
const location_1 = require("../models/location");
const assetList_1 = require("../models/assetList");
const stockTakeItem_1 = require("../models/stockTakeItem");
const sequelize_1 = require("sequelize");
const moment = require('moment');
let StockTakeTableService = class StockTakeTableService {
    constructor(stockTakeRepository, stockTakeItemRepository) {
        this.stockTakeRepository = stockTakeRepository;
        this.stockTakeItemRepository = stockTakeItemRepository;
    }
    async voidOne(id) {
        return await this.stockTakeRepository.update({ status: 0 }, { where: { id } });
    }
    async finishOne(id) {
        return await this.stockTakeRepository.update({ status: 2, finishTime: moment().format('DD-MM-YYYY HH:MM') }, { where: { id } });
    }
    async itemStockTakeAction(stockTakeItem) {
        return await this.stockTakeItemRepository.create(Object.assign(Object.assign({}, stockTakeItem), { checkTime: moment().format('DD-MM-YYYY HH:MM') }));
    }
    async createOne(stocktake) {
        return await this.stockTakeRepository.create(Object.assign(Object.assign({}, stocktake), { status: 1 }));
    }
    async itemListAll(stockTakeItem) {
        const { stocktakeId, limit, page } = stockTakeItem;
        const offset = page * limit - limit;
        stockTakeItem_1.StockTakeItem.belongsTo(location_1.Location, {
            targetKey: 'id',
            foreignKey: 'placeId'
        });
        stockTakeItem_1.StockTakeItem.belongsTo(assetList_1.AssetList, {
            targetKey: 'id',
            foreignKey: 'assetId'
        });
        return await this.stockTakeItemRepository.findAndCountAll(Object.assign(Object.assign({ include: [
                {
                    model: location_1.Location,
                    required: false,
                    where: { status: 1 }
                },
                {
                    model: assetList_1.AssetList,
                    required: false,
                    where: { status: 1 }
                },
            ], where: {
                stocktakeId
            }, limit }, (page > 1) ? { offset } : {}), { order: [['assetCode', 'DESC']] }));
    }
    async listAll(stocktake) {
        const { actionName, limit, page } = stocktake;
        const offset = page * limit - limit;
        stocktake_1.StockTake.belongsTo(location_1.Location, {
            targetKey: 'id',
            foreignKey: 'actionPlace'
        });
        return await this.stockTakeRepository.findAndCountAll(Object.assign(Object.assign({ include: [
                {
                    model: location_1.Location,
                    required: false,
                    where: { status: 1 }
                },
            ], where: Object.assign({}, actionName ? { actionName: { [sequelize_1.Op.like]: `%${actionName}%` } } : {}), limit }, (page > 1) ? { offset } : {}), { order: [['actionName', 'DESC']] }));
    }
    async getOne(id) {
        return await this.stockTakeRepository.findOne({ where: { id } });
    }
};
StockTakeTableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('stockTakeRepository')),
    __param(1, (0, common_1.Inject)('stockTakeItemRepository')),
    __metadata("design:paramtypes", [Object, Object])
], StockTakeTableService);
exports.StockTakeTableService = StockTakeTableService;
//# sourceMappingURL=stockTakeTableService.js.map