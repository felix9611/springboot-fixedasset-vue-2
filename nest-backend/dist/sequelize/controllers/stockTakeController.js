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
exports.StockTakeController = void 0;
const common_1 = require("@nestjs/common");
const stockTakeTableService_1 = require("../service/stockTakeTableService");
const stocktake_1 = require("../models/stocktake");
const stockTakeItem_1 = require("../models/stockTakeItem");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let StockTakeController = class StockTakeController {
    constructor(service) {
        this.service = service;
    }
    async createOne(stocktake) {
        return await this.service.createOne(stocktake);
    }
    async itemStockTake(stocktakeItem) {
        return await this.service.itemStockTakeAction(stocktakeItem);
    }
    async itemListAll(stockTakeItem) {
        return await this.service.itemListAll(stockTakeItem);
    }
    async listAll(stocktake) {
        return await this.service.listAll(stocktake);
    }
    async getOne(id) {
        return await this.service.getOne(id);
    }
    async voidOne(id) {
        return await this.service.voidOne(id);
    }
    async finishOne(id) {
        return await this.service.finishOne(id);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stocktake_1.StockTake]),
    __metadata("design:returntype", Promise)
], StockTakeController.prototype, "createOne", null);
__decorate([
    (0, common_1.Post)('item'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stockTakeItem_1.StockTakeItem]),
    __metadata("design:returntype", Promise)
], StockTakeController.prototype, "itemStockTake", null);
__decorate([
    (0, common_1.Post)('item/listAll'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stockTakeItem_1.StockTakeItem]),
    __metadata("design:returntype", Promise)
], StockTakeController.prototype, "itemListAll", null);
__decorate([
    (0, common_1.Post)('listAll'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stocktake_1.StockTake]),
    __metadata("design:returntype", Promise)
], StockTakeController.prototype, "listAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StockTakeController.prototype, "getOne", null);
__decorate([
    (0, common_1.Delete)('void/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StockTakeController.prototype, "voidOne", null);
__decorate([
    (0, common_1.Post)('finish/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StockTakeController.prototype, "finishOne", null);
StockTakeController = __decorate([
    (0, swagger_1.ApiTags)('Stock Take'),
    (0, common_1.Controller)('api/stocktake'),
    __metadata("design:paramtypes", [stockTakeTableService_1.StockTakeTableService])
], StockTakeController);
exports.StockTakeController = StockTakeController;
//# sourceMappingURL=stockTakeController.js.map