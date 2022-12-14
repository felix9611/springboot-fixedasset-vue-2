import { SysRoleTableService } from 'src/sequelize/service/sysRoleTableService';
import { SysRole } from 'src/sequelize/models/sysRole';
import { Roles } from 'src/sequelize/interface';
export declare class SysRoleController {
    private readonly service;
    constructor(service: SysRoleTableService);
    createRole(sysRole: SysRole): Promise<SysRole>;
    updateRole(sysRole: SysRole): Promise<[affectedCount: number]>;
    getAll(): Promise<SysRole[]>;
    listOnPages(sysRole: SysRole): Promise<{
        rows: SysRole[];
        count: number;
    }>;
    getPagesByRole({ roles }: Roles): Promise<import("../models/sysMenu").SysMenu[]>;
    voidOne(id: number): Promise<[affectedCount: number]>;
    infoOne(id: number): Promise<SysRole>;
    getPagesByUser(req: any): Promise<{
        nav: any;
        authoritys: string[];
    }>;
    getAllRole({ roles }: Roles): Promise<SysRole[]>;
    menuhandle(roleId: number): Promise<any>;
    menuhandleUpdate(roleId: number, menuIds: any): Promise<any>;
    roleshandleUpdate(userId: string, roleIds: any): Promise<any>;
    getUserRole(userId: string): Promise<import("../models/SysUserRole").SysUserRole[]>;
}
