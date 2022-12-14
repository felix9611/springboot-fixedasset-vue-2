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
exports.FindAssetList = exports.FindAssetListAll = exports.AssetLists = exports.invrecordList = exports.fileLists = exports.AssetFileImport = void 0;
const swagger_1 = require("@nestjs/swagger");
class AssetFileImport {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The Asset id PK number'
    }),
    __metadata("design:type", Number)
], AssetFileImport.prototype, "assetId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [],
        description: 'The Asset image file listing'
    }),
    __metadata("design:type", Array)
], AssetFileImport.prototype, "fileList", void 0);
exports.AssetFileImport = AssetFileImport;
class fileLists {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Agedgs656ad5fs6===',
        description: 'The image trans to base64 content'
    }),
    __metadata("design:type", String)
], fileLists.prototype, "dataBase64", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'test.png',
        description: 'The image file name'
    }),
    __metadata("design:type", String)
], fileLists.prototype, "fileName", void 0);
exports.fileLists = fileLists;
class invrecordList {
}
exports.invrecordList = invrecordList;
class AssetLists {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], AssetLists.prototype, "rows", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AssetLists.prototype, "count", void 0);
exports.AssetLists = AssetLists;
class FindAssetListAll {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The asset status number'
    }),
    __metadata("design:type", Number)
], FindAssetListAll.prototype, "status", void 0);
exports.FindAssetListAll = FindAssetListAll;
class FindAssetList {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The page of listing'
    }),
    __metadata("design:type", Number)
], FindAssetList.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'The page items limit of listing'
    }),
    __metadata("design:type", Number)
], FindAssetList.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '000001',
        description: 'The Asset code',
        required: false
    }),
    __metadata("design:type", String)
], FindAssetList.prototype, "assetCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ABC',
        description: 'The Asset name',
        required: false
    }),
    __metadata("design:type", String)
], FindAssetList.prototype, "assetName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The Asset type id number',
        required: false
    }),
    __metadata("design:type", Number)
], FindAssetList.prototype, "typeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The asset store on where the place id number',
        required: false
    }),
    __metadata("design:type", Number)
], FindAssetList.prototype, "placeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The asset by which the department id number',
        required: false
    }),
    __metadata("design:type", Number)
], FindAssetList.prototype, "deptId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-12-10 11:20',
        description: 'This asset buy at the date and time',
        required: false
    }),
    __metadata("design:type", String)
], FindAssetList.prototype, "buyDate", void 0);
exports.FindAssetList = FindAssetList;
//# sourceMappingURL=index.js.map