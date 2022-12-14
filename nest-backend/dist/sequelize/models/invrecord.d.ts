import { Model } from 'sequelize-typescript';
export declare class InvRecord extends Model {
    id: number;
    assetCode?: string;
    placeFrom?: number;
    placeTo?: number;
    status?: string;
    limit?: number;
    page?: number;
    updatedAt: Date;
    createdAt: Date;
}
