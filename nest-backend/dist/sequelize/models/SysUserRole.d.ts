import { Model } from 'sequelize-typescript';
export declare class SysUserRole extends Model {
    id: number;
    userId: string;
    roleId: string;
    updatedAt: Date;
    createdAt: Date;
}
