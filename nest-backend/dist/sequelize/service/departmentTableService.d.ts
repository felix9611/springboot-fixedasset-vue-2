import { Department } from 'src/sequelize/models/department';
export declare class DepartmentTableService {
    private departmentRepository;
    constructor(departmentRepository: typeof Department);
    getOne(id: number): Promise<Department>;
    getAll(): Promise<Department[]>;
    createOne(department: Department): Promise<Department>;
    updateOne(department: Department): Promise<[affectedCount: number]>;
    voidOne(id: number): Promise<[affectedCount: number]>;
    listPage(department: Department): Promise<{
        rows: Department[];
        count: number;
    }>;
    findInfo(deptCode?: string, deptName?: string): Promise<Department>;
}
