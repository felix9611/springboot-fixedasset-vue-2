"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const test_1 = require("./test");
const sysRole_1 = require("./sysRole");
const sysMenu_1 = require("./sysMenu");
const SysRoleMenu_1 = require("./SysRoleMenu");
const SysUserRole_1 = require("./SysUserRole");
const assetType_1 = require("./assetType");
const location_1 = require("./location");
const department_1 = require("./department");
const vendor_1 = require("./vendor");
const assetList_1 = require("./assetList");
const writeOff_1 = require("./writeOff");
const assetListFiles_1 = require("./assetListFiles");
const loginRecords_1 = require("./loginRecords");
const invrecord_1 = require("./invrecord");
const codeType_1 = require("./codeType");
const stocktake_1 = require("./stocktake");
const stockTakeItem_1 = require("./stockTakeItem");
exports.models = [
    test_1.Test,
    codeType_1.CodeType,
    sysRole_1.SysRole,
    sysMenu_1.SysMenu,
    SysRoleMenu_1.SysRoleMenu,
    SysUserRole_1.SysUserRole,
    assetType_1.AssetType,
    location_1.Location,
    department_1.Department,
    vendor_1.Vendor,
    assetList_1.AssetList,
    assetListFiles_1.AssetListFiles,
    writeOff_1.WriteOff,
    loginRecords_1.LoginRecord,
    invrecord_1.InvRecord,
    stocktake_1.StockTake,
    stockTakeItem_1.StockTakeItem,
];
//# sourceMappingURL=index.js.map