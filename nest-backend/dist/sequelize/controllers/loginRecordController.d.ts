import { LoginRecordTableService } from 'src/sequelize/service/loginRecordTableService';
import { LoginRecord } from 'src/sequelize/models/loginRecords';
export declare class LoginRecordController {
    private readonly service;
    constructor(service: LoginRecordTableService);
    createOne(loginRecord: LoginRecord): Promise<LoginRecord>;
    findAle(username: string): Promise<LoginRecord[]>;
}
