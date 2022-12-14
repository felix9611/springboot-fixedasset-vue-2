import { Model } from 'sequelize-typescript';
export declare class SysRoleMenu extends Model {
    id: number;
    roleId: number;
    menuId: number;
    updatedAt: Date;
    createdAt: Date;
}
