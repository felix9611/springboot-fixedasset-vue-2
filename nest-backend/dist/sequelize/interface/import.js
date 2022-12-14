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
exports.ImportAsset = void 0;
const swagger_1 = require("@nestjs/swagger");
class ImportAsset {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ABC', description: 'The Asset name' }),
    __metadata("design:type", String)
], ImportAsset.prototype, "assetName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A', description: 'The Asset type code' }),
    __metadata("design:type", String)
], ImportAsset.prototype, "typeCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TypeA', description: 'The Asset type name' }),
    __metadata("design:type", String)
], ImportAsset.prototype, "typeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Box', description: 'This asset item how to unit term' }),
    __metadata("design:type", String)
], ImportAsset.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2022-10-28 11:30', description: 'This asset buy at the date and time', required: false }),
    __metadata("design:type", String)
], ImportAsset.prototype, "buyDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'This is for test', description: 'This asset detail', required: false }),
    __metadata("design:type", String)
], ImportAsset.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '350', description: 'This asset buy cost', required: false }),
    __metadata("design:type", String)
], ImportAsset.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '17516987', description: 'This asset Serial Number' }),
    __metadata("design:type", String)
], ImportAsset.prototype, "serialNum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'AA00001', description: 'Buy Invoice Sheet Number', required: false }),
    __metadata("design:type", String)
], ImportAsset.prototype, "invoiceNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2022-10-28 11:30', description: 'Buy Invoice Sheet Iussed Date and time', required: false }),
    __metadata("design:type", String)
], ImportAsset.prototype, "invoiceDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A', description: 'The asset by which the department code' }),
    __metadata("design:type", String)
], ImportAsset.prototype, "deptCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A Department', description: 'The asset by which the department name' }),
    __metadata("design:type", String)
], ImportAsset.prototype, "deptName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'AB', description: 'The asset store on where the place code' }),
    __metadata("design:type", String)
], ImportAsset.prototype, "placeCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'AB Room', description: 'The asset store on where the place name' }),
    __metadata("design:type", String)
], ImportAsset.prototype, "placeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CBA', description: 'The asset vendor code', required: false }),
    __metadata("design:type", String)
], ImportAsset.prototype, "vendorCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CBA Ltd', description: 'The asset vendor name', required: false }),
    __metadata("design:type", String)
], ImportAsset.prototype, "vendorName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Testing', description: 'The asset other information remark', required: false }),
    __metadata("design:type", String)
], ImportAsset.prototype, "remark", void 0);
exports.ImportAsset = ImportAsset;
//# sourceMappingURL=import.js.map