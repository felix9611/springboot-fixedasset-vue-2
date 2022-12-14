import { LoginRecord } from 'src/sequelize/models/loginRecords';
export declare class LoginRecordTableService {
    private loginRecordRepository;
    constructor(loginRecordRepository: typeof LoginRecord);
    createOne(loginRecord: LoginRecord): Promise<LoginRecord>;
    getRecords(username: string): Promise<LoginRecord[]>;
}
