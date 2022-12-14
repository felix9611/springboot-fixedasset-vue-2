import { InvRecord } from 'src/sequelize/models/invrecord';
import { invrecordList } from 'src/sequelize/interface/index';
import { LocationTableService } from 'src/sequelize/service/locationTableService';
export declare class InvRecordTableService {
    private invRecordRepository;
    private locationTableService;
    constructor(invRecordRepository: typeof InvRecord, locationTableService: LocationTableService);
    createOne(invrecord: any): Promise<InvRecord>;
    findAll(invrecord: invrecordList): Promise<{
        count: number;
        rows: any[];
    }>;
}
