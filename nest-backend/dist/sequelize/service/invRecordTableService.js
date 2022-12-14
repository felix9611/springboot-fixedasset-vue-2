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
exports.InvRecordTableService = void 0;
const common_1 = require("@nestjs/common");
const invrecord_1 = require("../models/invrecord");
const assetList_1 = require("../models/assetList");
const sequelize_1 = require("sequelize");
const locationTableService_1 = require("./locationTableService");
let InvRecordTableService = class InvRecordTableService {
    constructor(invRecordRepository, locationTableService) {
        this.invRecordRepository = invRecordRepository;
        this.locationTableService = locationTableService;
    }
    async createOne(invrecord) {
        return await this.invRecordRepository.create(Object.assign(Object.assign({}, invrecord), { status: 1 }));
    }
    async findAll(invrecord) {
        const { createdFrom, createdTo, page, limit } = invrecord;
        const locList = await this.locationTableService.getAll();
        let allLocList = [];
        locList.map(loc => {
            allLocList.push(loc['dataValues']);
        });
        invrecord_1.InvRecord.belongsTo(assetList_1.AssetList, {
            targetKey: 'assetCode',
            foreignKey: 'assetCode'
        });
        const offset = page * limit - limit;
        const invRecordListJSON = await this.invRecordRepository.findAndCountAll(Object.assign(Object.assign({ include: [
                {
                    model: assetList_1.AssetList,
                    required: false,
                    where: { status: 1 }
                },
            ], where: Object.assign({}, (createdFrom && createdTo) ? {
                createdAt: {
                    [sequelize_1.Op.between]: [createdFrom, createdTo]
                }
            } : {}), limit }, (page > 1) ? { offset } : {}), { order: [['assetCode', 'DESC']] }));
        let newRows = [];
        invRecordListJSON.rows.forEach(x => {
            const mainObject = x['dataValues'];
            const { AssetList: assetInform, placeFrom, placeTo } = mainObject, _mainObject = __rest(mainObject, ["AssetList", "placeFrom", "placeTo"]);
            const { assetName } = assetInform['dataValues'];
            const fromPlace = allLocList.find(from => from.id === placeFrom);
            const toPlace = allLocList.find(from => from.id === placeTo);
            newRows.push(Object.assign(Object.assign({}, _mainObject), { assetName,
                fromPlace,
                toPlace }));
        });
        return {
            count: invRecordListJSON.count,
            rows: newRows
        };
    }
};
InvRecordTableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('invRecordRepository')),
    __metadata("design:paramtypes", [Object, locationTableService_1.LocationTableService])
], InvRecordTableService);
exports.InvRecordTableService = InvRecordTableService;
//# sourceMappingURL=invRecordTableService.js.map