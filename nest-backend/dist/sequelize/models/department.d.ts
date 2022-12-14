import { Model } from 'sequelize-typescript';
export declare class Department extends Model {
    deptCode: string;
    deptName: string;
    remark: string;
    flexData: any;
    status: number;
    limit: number;
    page: number;
    active: number;
}
