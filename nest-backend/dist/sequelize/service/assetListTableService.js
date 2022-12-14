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
exports.AssetListTableService = void 0;
const common_1 = require("@nestjs/common");
const assetList_1 = require("../models/assetList");
const department_1 = require("../models/department");
const assetType_1 = require("../models/assetType");
const location_1 = require("../models/location");
const writeOff_1 = require("../models/writeOff");
const sequelize_1 = require("sequelize");
const moment = require('moment');
const vendorTableService_1 = require("./vendorTableService");
const departmentTableService_1 = require("./departmentTableService");
const assetTypeTableService_1 = require("./assetTypeTableService");
const locationTableService_1 = require("./locationTableService");
const invRecordTableService_1 = require("./invRecordTableService");
let AssetListTableService = class AssetListTableService {
    constructor(assetListRepository, writeOffRepository, assetListFilesRepository, vendorTableService, departmentTableService, assetTypeTableService, locationTableService, invRecordTableService) {
        this.assetListRepository = assetListRepository;
        this.writeOffRepository = writeOffRepository;
        this.assetListFilesRepository = assetListFilesRepository;
        this.vendorTableService = vendorTableService;
        this.departmentTableService = departmentTableService;
        this.assetTypeTableService = assetTypeTableService;
        this.locationTableService = locationTableService;
        this.invRecordTableService = invRecordTableService;
    }
    async saveImage(assetFileImport) {
        let { assetId, fileList } = assetFileImport;
        return fileList.forEach(async (fl) => {
            const { fileName, dataBase64 } = fl;
            return await this.assetListFilesRepository.create({
                assetId,
                fileName,
                base64: dataBase64,
                status: 1
            });
        });
    }
    async getPhotoData(assetId) {
        return await this.assetListFilesRepository.findAll({
            where: {
                status: 1,
                assetId
            }
        });
    }
    async voidFile(id) {
        return await this.assetListFilesRepository.update({ status: 0 }, { where: { id } });
    }
    async listPage(assetList) {
        let { assetCode, assetName, placeId, deptId, buyDate, typeId, limit, page } = assetList;
        const offset = page * limit - limit;
        assetList_1.AssetList.belongsTo(assetType_1.AssetType, {
            foreignKey: 'typeId'
        });
        assetList_1.AssetList.belongsTo(department_1.Department, {
            foreignKey: 'deptId'
        });
        assetList_1.AssetList.belongsTo(location_1.Location, {
            foreignKey: 'placeId'
        });
        const data = await this.assetListRepository.findAndCountAll(Object.assign(Object.assign({ include: [
                {
                    model: assetType_1.AssetType,
                    required: false,
                    where: { status: 1 }
                },
                {
                    model: department_1.Department,
                    required: false,
                    where: { status: 1 }
                },
                {
                    model: location_1.Location,
                    required: false,
                    where: { status: 1 }
                },
            ], where: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, assetCode ? { assetCode: { [sequelize_1.Op.like]: `%${assetCode}%` } } : {}), assetName ? { assetName: { [sequelize_1.Op.like]: `%${assetName}%` } } : {}), buyDate ? { buyDate: { [sequelize_1.Op.between]: buyDate } } : {}), placeId ? { placeId } : {}), deptId ? { deptId } : {}), typeId ? { typeId } : {}), { status: 1 }), limit }, (page > 1) ? { offset } : {}), { order: [['assetCode', 'DESC']] }));
        return data;
    }
    async listAll(assetList) {
        let { status } = assetList;
        assetList_1.AssetList.belongsTo(assetType_1.AssetType, {
            foreignKey: 'typeId'
        });
        assetList_1.AssetList.belongsTo(department_1.Department, {
            foreignKey: 'deptId'
        });
        assetList_1.AssetList.belongsTo(location_1.Location, {
            foreignKey: 'placeId'
        });
        assetList_1.AssetList.belongsTo(writeOff_1.WriteOff, {
            targetKey: 'assetId',
            foreignKey: 'id'
        });
        const data = this.assetListRepository.findAndCountAll({
            include: [
                {
                    model: assetType_1.AssetType,
                    required: false,
                    where: { status: 1 }
                },
                {
                    model: department_1.Department,
                    required: false,
                    where: { status: 1 }
                },
                {
                    model: location_1.Location,
                    required: false,
                    where: { status: 1 }
                },
                {
                    model: writeOff_1.WriteOff,
                    required: false,
                },
            ],
            where: {
                status
            },
            order: [['assetCode', 'DESC']]
        });
        return data;
    }
    async getOne(id) {
        return await this.assetListRepository.findOne({ where: { id } });
    }
    async getOneByCode(assetCode) {
        return await this.assetListRepository.findOne({ where: { assetCode } });
    }
    async findByCode(assetCode) {
        return await this.assetListRepository.findOne({ where: { assetCode, status: 1 } });
    }
    async createOne(assetList) {
        const code = await this.assetListRepository.max('assetCode', { where: { status: 1 } });
        if (code) {
            const newCode = this.newCodeGen(6, code.toString());
            await this.invRecordTableService.createOne({ assetCode: newCode, placeTo: assetList.placeId, placeFrom: 0 });
            return await this.assetListRepository.create(Object.assign({ status: 1, assetCode: newCode }, assetList));
        }
        else {
            await this.invRecordTableService.createOne({ assetCode: '000001', placeTo: assetList.placeId, placeFrom: 0 });
            return await this.assetListRepository.create(Object.assign({ status: 1, assetCode: '000001' }, assetList));
        }
    }
    async updateOne(assetList) {
        const { id } = assetList, _assetList = __rest(assetList, ["id"]);
        const asset = await this.getOne(id);
        const { placeId: oldPlaceId } = asset.toJSON();
        if (_assetList.placeId !== oldPlaceId) {
            await this.invRecordTableService.createOne({ assetCode: _assetList.assetCode, placeTo: assetList.placeId, placeFrom: oldPlaceId });
        }
        return await this.assetListRepository.update(_assetList, { where: { id } });
    }
    async writteOffPrcoess(writeOff) {
        return await this.writeOffRepository.create(Object.assign(Object.assign({}, writeOff), { lastDay: moment().format() }));
    }
    async voidOne(id) {
        return await this.assetListRepository.update({ status: 0 }, { where: { id } });
    }
    async importAsset(asset) {
        const { assetName, typeCode, typeName, unit, buyDate, description, cost, serialNum, invoiceNo, invoiceDate, deptCode, deptName, placeCode, placeName, vendorCode, vendorName, remark } = asset;
        let data = {
            assetName,
            unit,
            buyDate,
            description,
            cost,
            serialNumber: serialNum,
            invoiceNo,
            invoiceDate,
            remark
        };
        if (typeName || typeCode) {
            const { id } = await this.assetTypeTableService.findInfo(typeCode, typeName);
            data.typeId = id;
        }
        if (placeCode || placeName) {
            const { id } = await this.locationTableService.findInfo(placeCode, placeName);
            data.placeId = id;
        }
        if (deptCode || deptName) {
            const { id } = await this.departmentTableService.findInfo(deptCode, deptName);
            data.deptId = id;
        }
        if (vendorCode || vendorName) {
            const { id } = await this.vendorTableService.findInfo(vendorCode, vendorName);
            data.deptId = id;
        }
        return this.createOne(data);
    }
    async findAsset(assetList) {
        const { placeId, assetCode } = assetList;
        return await this.assetListRepository.findOne({ where: { placeId, assetCode, status: 1 } });
    }
    newCodeGen(len, code) {
        let intCode = Number(code);
        let str = String(intCode + 1);
        while (str.length < len)
            str = '0' + str;
        return str;
    }
};
AssetListTableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('assetListRepository')),
    __param(1, (0, common_1.Inject)('writeOffRepository')),
    __param(2, (0, common_1.Inject)('assetListFilesRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, vendorTableService_1.VendorTableService,
        departmentTableService_1.DepartmentTableService,
        assetTypeTableService_1.AssetTypeTableService,
        locationTableService_1.LocationTableService,
        invRecordTableService_1.InvRecordTableService])
], AssetListTableService);
exports.AssetListTableService = AssetListTableService;
//# sourceMappingURL=assetListTableService.js.map