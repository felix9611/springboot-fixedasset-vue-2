import { AssetTypeTableService } from 'src/sequelize/service/assetTypeTableService';
import { AssetType } from 'src/sequelize/models/assetType';
export declare class AssetTypeController {
    private readonly service;
    constructor(service: AssetTypeTableService);
    create(assetType: AssetType): Promise<AssetType>;
    batchCreate(assetTypes: AssetType[]): Promise<void>;
    listAllPage(assetType: AssetType): Promise<{
        rows: AssetType[];
        count: number;
    }>;
    getOneData(id: number): Promise<AssetType>;
    updateOne(assetType: AssetType): Promise<[affectedCount: number]>;
    voidOneData(id: number): Promise<[affectedCount: number]>;
    getAll(): Promise<AssetType[]>;
}
