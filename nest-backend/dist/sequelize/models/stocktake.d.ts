import { Model } from 'sequelize-typescript';
export declare class StockTake extends Model {
    id: number;
    actionName: string;
    actionPlace: number;
    finishTime: Date;
    status: number;
    updatedAt: Date;
    createdAt: Date;
    limit: number;
    page: number;
}
