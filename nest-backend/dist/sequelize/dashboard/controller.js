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
exports.DasboardController = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
const swagger_1 = require("@nestjs/swagger");
let DasboardController = class DasboardController {
    constructor(service) {
        this.service = service;
    }
    async getAssetYearCostFind(findDef) {
        return await this.service.getAssetCostYearMonthFind(findDef);
    }
    async getAssetYearItemsFind(findDef) {
        return await this.service.getAssetItemsYearMonthFind(findDef);
    }
    async getAssetCountsYearMonthByDeptFind(findDef) {
        return await this.service.getAssetCountsYearMonthByDeptFind(findDef);
    }
    async getAssetCostsYearMonthByDeptFind(findDef) {
        return await this.service.getAssetCostsYearMonthByDeptFind(findDef);
    }
    async getAssetCostsYearMonthByTypeFind(findDef) {
        return await this.service.getAssetCostsYearMonthByTypeFind(findDef);
    }
    async getAssetCountYearMonthByTypeFind(findDef) {
        return await this.service.getAssetCountYearMonthByTypeFind(findDef);
    }
};
__decorate([
    (0, common_1.Post)('getAssetCostYearMonthFind'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DasboardController.prototype, "getAssetYearCostFind", null);
__decorate([
    (0, common_1.Post)('getAssetItemsYearMonthFind'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DasboardController.prototype, "getAssetYearItemsFind", null);
__decorate([
    (0, common_1.Post)('getAssetCountsYearMonthByDeptFind'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DasboardController.prototype, "getAssetCountsYearMonthByDeptFind", null);
__decorate([
    (0, common_1.Post)('getAssetCostsYearMonthByDeptFind'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DasboardController.prototype, "getAssetCostsYearMonthByDeptFind", null);
__decorate([
    (0, common_1.Post)('getAssetCostsYearMonthByTypeFind'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DasboardController.prototype, "getAssetCostsYearMonthByTypeFind", null);
__decorate([
    (0, common_1.Post)('getAssetCountYearMonthByTypeFind'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DasboardController.prototype, "getAssetCountYearMonthByTypeFind", null);
DasboardController = __decorate([
    (0, swagger_1.ApiTags)('Dashboard'),
    (0, common_1.Controller)('api/dashboard/cards'),
    __metadata("design:paramtypes", [service_1.DasboardService])
], DasboardController);
exports.DasboardController = DasboardController;
//# sourceMappingURL=controller.js.map