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
exports.AssetListCreateDTO = exports.departmentFindDTO = exports.departmentCreateDTO = exports.vendorCreateDTO = exports.VendorFindDTO = exports.AssetTypeFindDTO = exports.AssetTypeCreateDTO = exports.CodeTypeFindByTypeDto = exports.CodeTypeFindDto = exports.CodeTypeCreatedDto = exports.LocationCreatedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class LocationCreatedDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'MY',
        description: 'The Location Code'
    }),
    __metadata("design:type", String)
], LocationCreatedDto.prototype, "placeCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'My Room',
        description: 'The Location Name'
    }),
    __metadata("design:type", String)
], LocationCreatedDto.prototype, "placeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
        description: 'Remark',
        required: false
    }),
    __metadata("design:type", String)
], LocationCreatedDto.prototype, "remark", void 0);
exports.LocationCreatedDto = LocationCreatedDto;
class CodeTypeCreatedDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: 'The type for category'
    }),
    __metadata("design:type", String)
], CodeTypeCreatedDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'TestD',
        description: 'The value code'
    }),
    __metadata("design:type", String)
], CodeTypeCreatedDto.prototype, "valueCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test Da',
        description: 'The value name'
    }),
    __metadata("design:type", String)
], CodeTypeCreatedDto.prototype, "valueName", void 0);
exports.CodeTypeCreatedDto = CodeTypeCreatedDto;
class CodeTypeFindDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: 'The type for category',
        required: false
    }),
    __metadata("design:type", String)
], CodeTypeFindDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'TestD',
        description: 'The value code',
        required: false
    }),
    __metadata("design:type", String)
], CodeTypeFindDto.prototype, "valueCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test Da',
        description: 'The value name',
        required: false
    }),
    __metadata("design:type", String)
], CodeTypeFindDto.prototype, "valueName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'The page of listing'
    }),
    __metadata("design:type", Number)
], CodeTypeFindDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The page items limit of listing'
    }),
    __metadata("design:type", Number)
], CodeTypeFindDto.prototype, "page", void 0);
exports.CodeTypeFindDto = CodeTypeFindDto;
class CodeTypeFindByTypeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: 'The type for category',
        required: false
    }),
    __metadata("design:type", String)
], CodeTypeFindByTypeDto.prototype, "type", void 0);
exports.CodeTypeFindByTypeDto = CodeTypeFindByTypeDto;
class AssetTypeCreateDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: 'The asset type code',
    }),
    __metadata("design:type", String)
], AssetTypeCreateDTO.prototype, "typeCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Testing',
        description: 'The asset type name',
    }),
    __metadata("design:type", String)
], AssetTypeCreateDTO.prototype, "typeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {},
        description: 'The asset type other name by json',
        required: false
    }),
    __metadata("design:type", Object)
], AssetTypeCreateDTO.prototype, "typeOtherName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Testing',
        description: 'The asset type other remark',
        required: false
    }),
    __metadata("design:type", String)
], AssetTypeCreateDTO.prototype, "remark", void 0);
exports.AssetTypeCreateDTO = AssetTypeCreateDTO;
class AssetTypeFindDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: 'The asset type code',
    }),
    __metadata("design:type", String)
], AssetTypeFindDTO.prototype, "typeCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Testing',
        description: 'The asset type name',
    }),
    __metadata("design:type", String)
], AssetTypeFindDTO.prototype, "typeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'The page of listing'
    }),
    __metadata("design:type", Number)
], AssetTypeFindDTO.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The page items limit of listing'
    }),
    __metadata("design:type", Number)
], AssetTypeFindDTO.prototype, "page", void 0);
exports.AssetTypeFindDTO = AssetTypeFindDTO;
class VendorFindDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: "Vendor's  Code"
    }),
    __metadata("design:type", String)
], VendorFindDTO.prototype, "vendorCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test LTD',
        description: "Vendor's  Name"
    }),
    __metadata("design:type", String)
], VendorFindDTO.prototype, "vendorName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'The page of listing'
    }),
    __metadata("design:type", Number)
], VendorFindDTO.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The page items limit of listing'
    }),
    __metadata("design:type", Number)
], VendorFindDTO.prototype, "page", void 0);
exports.VendorFindDTO = VendorFindDTO;
class vendorCreateDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: "Vendor's  Code"
    }),
    __metadata("design:type", String)
], vendorCreateDTO.prototype, "vendorCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test LTD',
        description: "Vendor's  Name"
    }),
    __metadata("design:type", String)
], vendorCreateDTO.prototype, "vendorName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'TEST',
        description: "Vendor's Other Name",
        required: false
    }),
    __metadata("design:type", Object)
], vendorCreateDTO.prototype, "vendorOtherName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'TEST',
        description: "Vendor's Type"
    }),
    __metadata("design:type", String)
], vendorCreateDTO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'aa@abc.com',
        description: "Vendor's Contact Email Addres"
    }),
    __metadata("design:type", String)
], vendorCreateDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '67891258',
        description: "Vendor's Contact Phone Number"
    }),
    __metadata("design:type", String)
], vendorCreateDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
        description: 'Fax Number',
        required: false
    }),
    __metadata("design:type", String)
], vendorCreateDTO.prototype, "fax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Kowloon, HK',
        description: "Vendor's Address"
    }),
    __metadata("design:type", String)
], vendorCreateDTO.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
        description: "Vendor's Contact Person"
    }),
    __metadata("design:type", String)
], vendorCreateDTO.prototype, "contactPerson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
        description: 'Remark',
        required: false
    }),
    __metadata("design:type", String)
], vendorCreateDTO.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {},
        description: 'Addon Data',
        required: false
    }),
    __metadata("design:type", Object)
], vendorCreateDTO.prototype, "flexData", void 0);
exports.vendorCreateDTO = vendorCreateDTO;
class departmentCreateDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: 'The department code'
    }),
    __metadata("design:type", String)
], departmentCreateDTO.prototype, "deptCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: 'The department name'
    }),
    __metadata("design:type", String)
], departmentCreateDTO.prototype, "deptName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
        description: 'Remark',
        required: false
    }),
    __metadata("design:type", String)
], departmentCreateDTO.prototype, "remark", void 0);
exports.departmentCreateDTO = departmentCreateDTO;
class departmentFindDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: 'The department code'
    }),
    __metadata("design:type", String)
], departmentFindDTO.prototype, "deptCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Test',
        description: 'The department name'
    }),
    __metadata("design:type", String)
], departmentFindDTO.prototype, "deptName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'The page of listing'
    }),
    __metadata("design:type", Number)
], departmentFindDTO.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The page items limit of listing'
    }),
    __metadata("design:type", Number)
], departmentFindDTO.prototype, "page", void 0);
exports.departmentFindDTO = departmentFindDTO;
class AssetListCreateDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ABC',
        description: 'The Asset name'
    }),
    __metadata("design:type", String)
], AssetListCreateDTO.prototype, "assetName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The Asset type id number'
    }),
    __metadata("design:type", Number)
], AssetListCreateDTO.prototype, "typeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Box',
        description: 'This asset item how to unit term'
    }),
    __metadata("design:type", String)
], AssetListCreateDTO.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-12-11T01:49:14.286Z',
        description: 'This asset buy at the date and time',
        required: false
    }),
    __metadata("design:type", String)
], AssetListCreateDTO.prototype, "buyDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'This is for test',
        description: 'This asset detail',
        required: false
    }),
    __metadata("design:type", String)
], AssetListCreateDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        description: 'This sponsor type number'
    }),
    __metadata("design:type", Number)
], AssetListCreateDTO.prototype, "sponsor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Tom',
        description: 'This sponsor name',
        required: false
    }),
    __metadata("design:type", String)
], AssetListCreateDTO.prototype, "sponsorName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '300',
        description: 'This asset buy cost',
        required: false
    }),
    __metadata("design:type", String)
], AssetListCreateDTO.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '17516987',
        description: 'This asset Serial Number'
    }),
    __metadata("design:type", String)
], AssetListCreateDTO.prototype, "serialNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'T00001',
        description: 'Buy Invoice Sheet Number',
        required: false
    }),
    __metadata("design:type", String)
], AssetListCreateDTO.prototype, "invoiceNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-12-11T01:49:14.286Z',
        description: 'Buy Invoice Sheet Iussed Date and time',
        required: false
    }),
    __metadata("design:type", String)
], AssetListCreateDTO.prototype, "invoiceDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: 'The asset store on where the place id number'
    }),
    __metadata("design:type", Number)
], AssetListCreateDTO.prototype, "placeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The asset by which the department id number'
    }),
    __metadata("design:type", Number)
], AssetListCreateDTO.prototype, "deptId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'A001',
        description: 'The operation staff UUID',
        required: false
    }),
    __metadata("design:type", String)
], AssetListCreateDTO.prototype, "staffId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: 'The asset vendor code',
        required: false
    }),
    __metadata("design:type", Number)
], AssetListCreateDTO.prototype, "vendorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Testing',
        description: 'The asset other information remark',
        required: false
    }),
    __metadata("design:type", String)
], AssetListCreateDTO.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {},
        description: 'The asset other information by json or array',
        required: false
    }),
    __metadata("design:type", Object)
], AssetListCreateDTO.prototype, "flexData", void 0);
exports.AssetListCreateDTO = AssetListCreateDTO;
//# sourceMappingURL=dto.js.map