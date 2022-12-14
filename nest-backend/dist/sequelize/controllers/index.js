"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const testController_1 = require("./testController");
const sysMeunController_1 = require("./sysMeunController");
const sysRoleController_1 = require("./sysRoleController");
const AssetTypeController_1 = require("./AssetTypeController");
const locationController_1 = require("./locationController");
const deprtmentController_1 = require("./deprtmentController");
const vendorController_1 = require("./vendorController");
const assetListController_1 = require("./assetListController");
const loginRecordController_1 = require("./loginRecordController");
const invRecordController_1 = require("./invRecordController");
const codeTypeController_1 = require("./codeTypeController");
const stockTakeController_1 = require("./stockTakeController");
exports.controllers = [
    testController_1.TestController,
    codeTypeController_1.CodeTypeController,
    sysMeunController_1.SysMenuController,
    sysRoleController_1.SysRoleController,
    AssetTypeController_1.AssetTypeController,
    locationController_1.LocationController,
    deprtmentController_1.DepartmentController,
    vendorController_1.VendorController,
    assetListController_1.AssetListController,
    loginRecordController_1.LoginRecordController,
    invRecordController_1.InvRecordController,
    stockTakeController_1.StockTakeController,
];
//# sourceMappingURL=index.js.map