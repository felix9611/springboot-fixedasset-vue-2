import { StockTake } from 'src/sequelize/models/stocktake';
import { StockTakeItem } from 'src/sequelize/models/stockTakeItem';
export declare class StockTakeTableService {
    private stockTakeRepository;
    private stockTakeItemRepository;
    constructor(stockTakeRepository: typeof StockTake, stockTakeItemRepository: typeof StockTakeItem);
    voidOne(id: number): Promise<[affectedCount: number]>;
    finishOne(id: number): Promise<[affectedCount: number]>;
    itemStockTakeAction(stockTakeItem: StockTakeItem): Promise<StockTakeItem>;
    createOne(stocktake: StockTake): Promise<StockTake>;
    itemListAll(stockTakeItem: StockTakeItem): Promise<{
        rows: StockTakeItem[];
        count: number;
    }>;
    listAll(stocktake: StockTake): Promise<{
        rows: StockTake[];
        count: number;
    }>;
    getOne(id: number): Promise<StockTake>;
}
