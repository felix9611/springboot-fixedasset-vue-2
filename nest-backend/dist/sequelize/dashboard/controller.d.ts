import { DasboardService } from 'src/sequelize/dashboard/service';
export declare class DasboardController {
    private readonly service;
    constructor(service: DasboardService);
    getAssetYearCostFind(findDef: any): Promise<import("../models/assetList").AssetList[]>;
    getAssetYearItemsFind(findDef: any): Promise<import("../models/assetList").AssetList[]>;
    getAssetCountsYearMonthByDeptFind(findDef: any): Promise<import("../models/assetList").AssetList[]>;
    getAssetCostsYearMonthByDeptFind(findDef: any): Promise<import("../models/assetList").AssetList[]>;
    getAssetCostsYearMonthByTypeFind(findDef: any): Promise<import("../models/assetList").AssetList[]>;
    getAssetCountYearMonthByTypeFind(findDef: any): Promise<import("../models/assetList").AssetList[]>;
}