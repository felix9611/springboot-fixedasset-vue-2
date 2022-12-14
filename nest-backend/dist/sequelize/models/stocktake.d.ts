import { Model } from 'sequelize-typescript';
export declare class StockTake extends Model {
    actionName: string;
    actionPlace: number;
    finishTime: string;
    status: number;
    limit: number;
    page: number;
}
