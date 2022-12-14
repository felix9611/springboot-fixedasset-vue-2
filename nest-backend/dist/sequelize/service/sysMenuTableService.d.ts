import { SysMenu } from 'src/sequelize/models/sysMenu';
import { SysRoleMenu } from 'src/sequelize/models/SysRoleMenu';
export declare class SysMenuTableService {
    private sysMenuRepository;
    private sysRoleMenuRepository;
    constructor(sysMenuRepository: typeof SysMenu, sysRoleMenuRepository: typeof SysRoleMenu);
    voidOne(id: number): Promise<[affectedCount: number]>;
    getOne(id: number): Promise<SysMenu>;
    getAll(): Promise<SysMenu[]>;
    createOne(sysMenu: SysMenu): Promise<SysMenu>;
    updateOne(sysMenu: SysMenu): Promise<[affectedCount: number]>;
    findMenusByRoles(roleId: number): Promise<SysMenu[]>;
    findWithList(sysMenu: SysMenu): Promise<unknown[]>;
    getAllPage(): Promise<any>;
    makeTree(mains: any, pages: any): any;
}
