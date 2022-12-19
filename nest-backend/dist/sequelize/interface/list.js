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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetLists = exports.listLocation = exports.listAssetType = void 0;
const swagger_1 = require("@nestjs/swagger");
const assetType_1 = require("../models/assetType");
const location_1 = require("../models/location");
const assetList_1 = require("../models/assetList");
class listAssetType {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: assetType_1.AssetType,
        isArray: true,
        description: 'Listing Data'
    }),
    __metadata("design:type", Object)
], listAssetType.prototype, "rows", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 20,
        description: 'Count all record'
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], listAssetType.prototype, "count", void 0);
exports.listAssetType = listAssetType;
class listLocation {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: location_1.Location,
        isArray: true,
        description: 'Listing Data'
    }),
    __metadata("design:type", Object)
], listLocation.prototype, "rows", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 20,
        description: 'Count all record'
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], listLocation.prototype, "count", void 0);
exports.listLocation = listLocation;
class AssetLists {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        isArray: true,
        type: assetList_1.AssetList,
        description: 'Listing Data'
    }),
    __metadata("design:type", assetList_1.AssetList)
], AssetLists.prototype, "rows", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 20,
        description: 'Count all record'
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AssetLists.prototype, "count", void 0);
exports.AssetLists = AssetLists;
//# sourceMappingURL=list.js.map