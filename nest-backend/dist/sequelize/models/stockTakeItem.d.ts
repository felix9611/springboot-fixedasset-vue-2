import { Model } from 'sequelize-typescript';
export declare class StockTakeItem extends Model {
    stocktakeId: number;
    assetId: number;
    assetCode: string;
    placeId: number;
    status: string;
    remark: string;
    checkTime: string;
    limit: number;
    page: number;
}
