import { DepartmentTableService } from 'src/sequelize/service/departmentTableService';
import { Department } from 'src/sequelize/models/department';
export declare class DepartmentController {
    private readonly service;
    constructor(service: DepartmentTableService);
    getAll(): Promise<Department[]>;
    createOne(department: Department): Promise<Department>;
    updateOne(department: Department): Promise<[affectedCount: number]>;
    getOne(id: number): Promise<Department>;
    voidOne(id: number): Promise<[affectedCount: number]>;
    listAll(department: Department): Promise<{
        rows: Department[];
        count: number;
    }>;
    batchCreate(departments: Department[]): Promise<void>;
}
