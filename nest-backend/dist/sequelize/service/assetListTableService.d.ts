import { AssetList } from 'src/sequelize/models/assetList';
import { WriteOff } from 'src/sequelize/models/writeOff';
import { AssetListFiles } from 'src/sequelize/models/assetListFiles';
import { VendorTableService } from 'src/sequelize/service/vendorTableService';
import { DepartmentTableService } from 'src/sequelize/service/departmentTableService';
import { AssetTypeTableService } from 'src/sequelize/service/assetTypeTableService';
import { LocationTableService } from 'src/sequelize/service/locationTableService';
import { InvRecordTableService } from 'src/sequelize/service/invRecordTableService';
import { ImportAsset } from 'src/sequelize/interface/import';
import { AssetFileImport } from 'src/sequelize/interface/index';
export declare class AssetListTableService {
    private assetListRepository;
    private writeOffRepository;
    private assetListFilesRepository;
    private vendorTableService;
    private departmentTableService;
    private assetTypeTableService;
    private locationTableService;
    private invRecordTableService;
    constructor(assetListRepository: typeof AssetList, writeOffRepository: typeof WriteOff, assetListFilesRepository: typeof AssetListFiles, vendorTableService: VendorTableService, departmentTableService: DepartmentTableService, assetTypeTableService: AssetTypeTableService, locationTableService: LocationTableService, invRecordTableService: InvRecordTableService);
    saveImage(assetFileImport: AssetFileImport): Promise<void>;
    getPhotoData(assetId: number): Promise<AssetListFiles[]>;
    voidFile(id: number): Promise<[affectedCount: number]>;
    listPage(assetList: AssetList): Promise<{
        rows: AssetList[];
        count: number;
    }>;
    listAll(assetList: AssetList): Promise<{
        rows: AssetList[];
        count: number;
    }>;
    getOne(id: number): Promise<AssetList>;
    getOneByCode(assetCode: string): Promise<AssetList>;
    findByCode(assetCode: string): Promise<AssetList>;
    createOne(assetList: AssetList): Promise<AssetList>;
    updateOne(assetList: AssetList): Promise<[affectedCount: number]>;
    writteOffPrcoess(writeOff: WriteOff): Promise<WriteOff>;
    voidOne(id: number): Promise<[affectedCount: number]>;
    importAsset(asset: ImportAsset): Promise<AssetList>;
    findAsset(assetList: AssetList): Promise<AssetList>;
    newCodeGen(len: number, code?: string): string;
}
