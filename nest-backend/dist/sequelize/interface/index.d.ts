import { ModelCtor } from 'sequelize';
export interface Roles {
    roles: any[];
}
export interface ModelMapping {
    [modelName: string]: ModelCtor<any>;
}
export declare class AssetFileImport {
    assetId: number;
    fileList: fileLists[];
}
export declare class fileLists {
    dataBase64: string;
    fileName: string;
}
export declare class invrecordList {
    limit: number;
    page: number;
    createdFrom: Date;
    createdTo: Date;
}
export declare class FindLocation {
    placeCode: string;
    placeName: string;
}
export declare class FindAssetListAll {
    status: number;
}
export declare class FindAssetList {
    page: number;
    limit: number;
    assetCode: string;
    assetName: string;
    typeId: number;
    placeId: number;
    deptId: number;
    buyDate: string;
}