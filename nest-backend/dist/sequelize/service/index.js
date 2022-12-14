"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
const testTableService_1 = require("./testTableService");
const sysMenuTableService_1 = require("./sysMenuTableService");
const sysRoleTableService_1 = require("./sysRoleTableService");
const assetTypeTableService_1 = require("./assetTypeTableService");
const locationTableService_1 = require("./locationTableService");
const departmentTableService_1 = require("./departmentTableService");
const vendorTableService_1 = require("./vendorTableService");
const assetListTableService_1 = require("./assetListTableService");
const loginRecordTableService_1 = require("./loginRecordTableService");
const invRecordTableService_1 = require("./invRecordTableService");
const codeTypeTableService_1 = require("./codeTypeTableService");
const stockTakeTableService_1 = require("./stockTakeTableService");
exports.services = [
    testTableService_1.TestTableService,
    sysMenuTableService_1.SysMenuTableService,
    sysRoleTableService_1.SysRoleTableService,
    assetTypeTableService_1.AssetTypeTableService,
    locationTableService_1.LocationTableService,
    departmentTableService_1.DepartmentTableService,
    vendorTableService_1.VendorTableService,
    assetListTableService_1.AssetListTableService,
    loginRecordTableService_1.LoginRecordTableService,
    invRecordTableService_1.InvRecordTableService,
    codeTypeTableService_1.CodeTypeTableService,
    stockTakeTableService_1.StockTakeTableService,
];
//# sourceMappingURL=index.js.map