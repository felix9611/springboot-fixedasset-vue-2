import { AssetList } from 'src/sequelize/models/assetList';
import { findDef } from './interface';
export declare class DasboardService {
    private assetListRepository;
    constructor(assetListRepository: typeof AssetList);
    getAssetCostYearMonthFind(findDef: findDef): Promise<AssetList[]>;
    getAssetItemsYearMonthFind(findDef: findDef): Promise<AssetList[]>;
    getAssetCountsYearMonthByDeptFind(findDef: findDef): Promise<AssetList[]>;
    getAssetCostsYearMonthByDeptFind(findDef: findDef): Promise<AssetList[]>;
    getAssetCostsYearMonthByTypeFind(findDef: findDef): Promise<AssetList[]>;
    getAssetCountYearMonthByTypeFind(findDef: findDef): Promise<AssetList[]>;
    getAssetCostsYearMonthByPlaceFind(findDef: findDef): Promise<AssetList[]>;
    getAssetCountYearMonthByPlaceFind(findDef: findDef): Promise<AssetList[]>;
}
