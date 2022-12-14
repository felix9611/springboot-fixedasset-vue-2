import { Model } from 'sequelize-typescript';
export declare class WriteOff extends Model {
    assetId: number;
    lastPlaceId: number;
    reason: string;
    lastDay: Date;
    limit: number;
    page: number;
}
