import { AssetType } from 'src/sequelize/models/assetType';
export declare class AssetTypeTableService {
    private assetTypeRepository;
    constructor(assetTypeRepository: typeof AssetType);
    create(assetType: AssetType): Promise<AssetType>;
    getOne(id: number): Promise<AssetType>;
    getAll(): Promise<AssetType[]>;
    updateOne(assetType: AssetType): Promise<[affectedCount: number]>;
    voidOne(id: number): Promise<[affectedCount: number]>;
    listPage(assetType: AssetType): Promise<{
        rows: AssetType[];
        count: number;
    }>;
    findInfo(typeCode?: string, typeName?: string): Promise<AssetType>;
}
