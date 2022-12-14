"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainProviders = void 0;
const test_1 = require("../models/test");
const sysMenu_1 = require("../models/sysMenu");
const sysRole_1 = require("../models/sysRole");
const SysRoleMenu_1 = require("../models/SysRoleMenu");
const SysUserRole_1 = require("../models/SysUserRole");
const assetType_1 = require("../models/assetType");
const location_1 = require("../models/location");
const department_1 = require("../models/department");
const vendor_1 = require("../models/vendor");
const assetList_1 = require("../models/assetList");
const writeOff_1 = require("../models/writeOff");
const assetListFiles_1 = require("../models/assetListFiles");
const loginRecords_1 = require("../models/loginRecords");
const invrecord_1 = require("../models/invrecord");
const codeType_1 = require("../models/codeType");
const stocktake_1 = require("../models/stocktake");
const stockTakeItem_1 = require("../models/stockTakeItem");
exports.mainProviders = [
    { provide: 'testRepository', useValue: test_1.Test },
    { provide: 'sysMenuRepository', useValue: sysMenu_1.SysMenu },
    { provide: 'sysRoleRepository', useValue: sysRole_1.SysRole },
    { provide: 'sysRoleMenuRepository', useValue: SysRoleMenu_1.SysRoleMenu },
    { provide: 'sysUserRoleRepository', useValue: SysUserRole_1.SysUserRole },
    { provide: 'assetTypeRepository', useValue: assetType_1.AssetType },
    { provide: 'locationRepository', useValue: location_1.Location },
    { provide: 'departmentRepository', useValue: department_1.Department },
    { provide: 'vendorRepository', useValue: vendor_1.Vendor },
    { provide: 'assetListRepository', useValue: assetList_1.AssetList },
    { provide: 'assetListFilesRepository', useValue: assetListFiles_1.AssetListFiles },
    { provide: 'writeOffRepository', useValue: writeOff_1.WriteOff },
    { provide: 'loginRecordRepository', useValue: loginRecords_1.LoginRecord },
    { provide: 'invRecordRepository', useValue: invrecord_1.InvRecord },
    { provide: 'codeTypeRepository', useValue: codeType_1.CodeType },
    { provide: 'stockTakeRepository', useValue: stocktake_1.StockTake },
    { provide: 'stockTakeItemRepository', useValue: stockTakeItem_1.StockTakeItem },
];
//# sourceMappingURL=index.js.map