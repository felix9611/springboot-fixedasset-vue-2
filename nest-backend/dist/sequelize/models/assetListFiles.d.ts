import { Model } from 'sequelize-typescript';
export declare class AssetListFiles extends Model {
    id: number;
    assetId: number;
    fileName: string;
    base64: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}
