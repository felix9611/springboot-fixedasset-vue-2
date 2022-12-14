import { Test } from 'src/sequelize/models/test';
import { SysMenu } from 'src/sequelize/models/sysMenu';
import { SysRole } from 'src/sequelize/models/sysRole';
import { SysRoleMenu } from 'src/sequelize/models/SysRoleMenu';
import { SysUserRole } from 'src/sequelize/models/SysUserRole';
import { AssetType } from 'src/sequelize/models/assetType';
import { Location } from 'src/sequelize/models/location';
import { Department } from 'src/sequelize/models/department';
import { Vendor } from 'src/sequelize/models/vendor';
import { AssetList } from 'src/sequelize/models/assetList';
import { WriteOff } from 'src/sequelize/models/writeOff';
import { AssetListFiles } from 'src/sequelize/models/assetListFiles';
import { LoginRecord } from 'src/sequelize/models/loginRecords';
import { InvRecord } from 'src/sequelize/models/invrecord';
import { CodeType } from 'src/sequelize/models/codeType';
import { StockTake } from 'src/sequelize/models/stocktake';
import { StockTakeItem } from 'src/sequelize/models/stockTakeItem';
export declare const mainProviders: ({
    provide: string;
    useValue: typeof Test;
} | {
    provide: string;
    useValue: typeof SysMenu;
} | {
    provide: string;
    useValue: typeof SysRole;
} | {
    provide: string;
    useValue: typeof SysRoleMenu;
} | {
    provide: string;
    useValue: typeof SysUserRole;
} | {
    provide: string;
    useValue: typeof AssetType;
} | {
    provide: string;
    useValue: typeof Location;
} | {
    provide: string;
    useValue: typeof Department;
} | {
    provide: string;
    useValue: typeof Vendor;
} | {
    provide: string;
    useValue: typeof AssetList;
} | {
    provide: string;
    useValue: typeof AssetListFiles;
} | {
    provide: string;
    useValue: typeof WriteOff;
} | {
    provide: string;
    useValue: typeof LoginRecord;
} | {
    provide: string;
    useValue: typeof InvRecord;
} | {
    provide: string;
    useValue: typeof CodeType;
} | {
    provide: string;
    useValue: typeof StockTake;
} | {
    provide: string;
    useValue: typeof StockTakeItem;
})[];
