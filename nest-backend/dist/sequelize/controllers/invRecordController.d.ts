import { InvRecordTableService } from 'src/sequelize/service/invRecordTableService';
import { invrecordList } from 'src/sequelize/interface/index';
export declare class InvRecordController {
    private readonly service;
    constructor(service: InvRecordTableService);
    listData(invrecord: invrecordList): Promise<{
        count: number;
        rows: any[];
    }>;
}
