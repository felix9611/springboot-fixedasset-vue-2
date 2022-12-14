import { SysRole } from 'src/sequelize/models/sysRole';
import { SysMenu } from 'src/sequelize/models/sysMenu';
import { SysRoleMenu } from 'src/sequelize/models/SysRoleMenu';
import { SysUserRole } from 'src/sequelize/models/SysUserRole';
export declare class SysRoleTableService {
    private sysRoleRepository;
    private sysMeunRepository;
    private sysUserRoleRepository;
    private sysRoleMenuRepository;
    constructor(sysRoleRepository: typeof SysRole, sysMeunRepository: typeof SysMenu, sysUserRoleRepository: typeof SysUserRole, sysRoleMenuRepository: typeof SysRoleMenu);
    create(sysRole: SysRole): Promise<SysRole>;
    update(sysRole: SysRole): Promise<[affectedCount: number]>;
    getOne(id: number): Promise<SysRole>;
    getAll(): Promise<SysRole[]>;
    getAllRole(roles: any): Promise<SysRole[]>;
    voidOne(id: number): Promise<[affectedCount: number]>;
    getUserRole(userId: string): Promise<SysUserRole[]>;
    menuhandle(roleId: number): Promise<any>;
    roleshandleUpdate(roleIds: any, userId: string): Promise<any>;
    menuhandleUpdate(roleId: number, menuIds: any): Promise<any>;
    findWithList(sysRole: SysRole): Promise<{
        rows: SysRole[];
        count: number;
    }>;
    getPagesByRole(roles: any): Promise<SysMenu[]>;
    getPagesByUser(userId: String): Promise<{
        nav: any;
        authoritys: string[];
    }>;
    makeTree(mains: any, pages: any): any;
}
