import { CodeType } from 'src/sequelize/models/codeType';
export declare class CodeTypeTableService {
    private codeTypeRepository;
    constructor(codeTypeRepository: typeof CodeType);
    createOne(codeType: CodeType): Promise<CodeType>;
    updateOne(codeType: CodeType): Promise<[affectedCount: number]>;
    listPage(codeType: CodeType): Promise<{
        rows: CodeType[];
        count: number;
    }>;
    voidOne(id: number): Promise<[affectedCount: number]>;
    getOne(id: number): Promise<CodeType>;
    getAll(): Promise<CodeType[]>;
    findByType(codeType: CodeType): Promise<CodeType[]>;
}
