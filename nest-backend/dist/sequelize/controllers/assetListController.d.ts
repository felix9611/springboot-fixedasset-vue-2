import { AssetListTableService } from 'src/sequelize/service/assetListTableService';
import { AssetList } from 'src/sequelize/models/assetList';
import { AssetListFiles } from 'src/sequelize/models/assetListFiles';
import { WriteOff } from 'src/sequelize/models/writeOff';
import { ImportAsset } from 'src/sequelize/interface/import';
import { AssetFileImport, AssetLists } from 'src/sequelize/interface/index';
export declare class AssetListController {
    private readonly service;
    constructor(service: AssetListTableService);
    list(assetList: AssetList): Promise<AssetLists>;
    listAll(assetList: AssetList): Promise<{
        rows: AssetList[];
        count: number;
    }>;
    getOne(id: number): Promise<AssetList>;
    findByCode(assetCode: string): Promise<AssetList>;
    createOne(assetList: AssetList): Promise<AssetList>;
    updateOne(assetList: AssetList): Promise<[affectedCount: number]>;
    findAsset(assetList: AssetList): Promise<AssetList>;
    voidOne(id: number): Promise<[affectedCount: number]>;
    writteOffPrcoess(writeOff: WriteOff): Promise<WriteOff>;
    findFile(assetId: number): Promise<AssetListFiles[]>;
    voidFile(id: number): Promise<[affectedCount: number]>;
    saveImage(assetFileImport: AssetFileImport): Promise<void>;
    importData(importDatas: ImportAsset[]): Promise<void>;
}
