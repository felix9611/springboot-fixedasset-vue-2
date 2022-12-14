import { Model } from 'sequelize-typescript';
export declare class SysMenu extends Model {
    parentId: number;
    name: string;
    path: string;
    perms: string;
    component: string;
    type: number;
    icon: string;
    redirect: string;
    meta: any;
    orderNum: number;
    status: number;
    limit: number;
    page: number;
    active: number;
}
