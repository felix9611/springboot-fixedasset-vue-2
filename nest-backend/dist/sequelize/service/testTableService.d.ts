import { Test } from '../models/test';
export declare class TestTableService {
    private tesrRepository;
    constructor(tesrRepository: typeof Test);
    new(test: Test): Promise<Test>;
    removeOne(id: number): Promise<[affectedCount: number]>;
    removeBatch(ids: any): Promise<[affectedCount: number]>;
    update(id: number, test: Test): Promise<Test | [affectedCount: number]>;
    findOne(id: number): Promise<Test>;
    findMaxIdAndCode(): Promise<[unknown[], unknown]>;
    newCodeGen(len: number, code?: string): string;
}
