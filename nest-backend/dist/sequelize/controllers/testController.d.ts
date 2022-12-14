import { TestTableService } from '../service/testTableService';
import { Test } from '../models/test';
export declare class TestController {
    private readonly service;
    constructor(service: TestTableService);
    create(test: Test): Promise<Test>;
    update(id: number, test: Test): Promise<Test | [affectedCount: number]>;
    remove(id: number): Promise<[affectedCount: number]>;
    removeBatch(ids: any): Promise<[affectedCount: number]>;
    getOne(id: number): Promise<Test>;
}
