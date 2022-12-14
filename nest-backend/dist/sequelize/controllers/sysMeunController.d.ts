import { SysMenuTableService } from 'src/sequelize/service/sysMenuTableService';
import { SysMenu } from 'src/sequelize/models/sysMenu';
export declare class SysMenuController {
    private readonly service;
    constructor(service: SysMenuTableService);
    create(sysMenu: SysMenu): Promise<SysMenu>;
    getOne(id: number): Promise<SysMenu>;
    voidOne(id: number): Promise<[affectedCount: number]>;
    getAll(): Promise<any>;
    update(sysMenu: SysMenu): Promise<[affectedCount: number]>;
    listAll(sysMenu: SysMenu): Promise<unknown[]>;
}
