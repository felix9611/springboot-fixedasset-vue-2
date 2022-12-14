import { Model } from 'sequelize-typescript';
export declare class Department extends Model {
    id: number;
    deptCode: string;
    deptName: string;
    remark: string;
    flexData: any;
    status: number;
    limit: number;
    page: number;
    active: number;
    updatedAt: Date;
    createdAt: Date;
}
