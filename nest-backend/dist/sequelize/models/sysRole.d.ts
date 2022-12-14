import { Model } from 'sequelize-typescript';
export declare class SysRole extends Model {
    id: number;
    code: string;
    name: string;
    pages: any;
    remark: string;
    status: number;
    limit: number;
    page: number;
    updatedAt: Date;
    createdAt: Date;
}
