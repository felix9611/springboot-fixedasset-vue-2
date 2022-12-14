import { Model } from 'sequelize-typescript';
export declare class AssetListFiles extends Model {
    assetId: number;
    fileName: string;
    base64: string;
    status: number;
    updatedAt: Date;
    createdAt: Date;
}
