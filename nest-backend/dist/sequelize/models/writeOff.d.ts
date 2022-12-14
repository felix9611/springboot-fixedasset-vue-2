import { Model } from 'sequelize-typescript';
export declare class WriteOff extends Model {
    id: number;
    assetId: number;
    lastPlaceId: number;
    reason: string;
    lastDay: Date;
    updatedAt: Date;
    createdAt: Date;
    limit: number;
    page: number;
}
