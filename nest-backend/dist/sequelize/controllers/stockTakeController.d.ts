import { StockTakeTableService } from 'src/sequelize/service/stockTakeTableService';
import { StockTake } from 'src/sequelize/models/stocktake';
import { StockTakeItem } from 'src/sequelize/models/stockTakeItem';
export declare class StockTakeController {
    private readonly service;
    constructor(service: StockTakeTableService);
    createOne(stocktake: StockTake): Promise<StockTake>;
    itemStockTake(stocktakeItem: StockTakeItem): Promise<StockTakeItem>;
    itemListAll(stockTakeItem: StockTakeItem): Promise<{
        rows: StockTakeItem[];
        count: number;
    }>;
    listAll(stocktake: StockTake): Promise<{
        rows: StockTake[];
        count: number;
    }>;
    getOne(id: number): Promise<StockTake>;
    voidOne(id: number): Promise<[affectedCount: number]>;
    finishOne(id: number): Promise<[affectedCount: number]>;
}
