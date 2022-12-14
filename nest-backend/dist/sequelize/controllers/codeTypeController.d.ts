import { CodeTypeTableService } from 'src/sequelize/service/codeTypeTableService';
import { CodeType } from 'src/sequelize/models/codeType';
export declare class CodeTypeController {
    private readonly service;
    constructor(service: CodeTypeTableService);
    createOne(codeType: CodeType): Promise<CodeType>;
    updateOne(codeType: CodeType): Promise<[affectedCount: number]>;
    listPage(codeType: CodeType): Promise<{
        rows: CodeType[];
        count: number;
    }>;
    voidOne(id: number): Promise<[affectedCount: number]>;
    getOne(id: number): Promise<CodeType>;
    findByType(codeType: CodeType): Promise<CodeType[]>;
}
