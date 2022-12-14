"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysRoleTableService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
let SysRoleTableService = class SysRoleTableService {
    constructor(sysRoleRepository, sysMeunRepository, sysUserRoleRepository, sysRoleMenuRepository) {
        this.sysRoleRepository = sysRoleRepository;
        this.sysMeunRepository = sysMeunRepository;
        this.sysUserRoleRepository = sysUserRoleRepository;
        this.sysRoleMenuRepository = sysRoleMenuRepository;
    }
    async create(sysRole) {
        const code = await this.sysRoleRepository.findOne({ where: { code: sysRole.code } });
        if (!code) {
            return await this.sysRoleRepository.create(Object.assign({ status: 1 }, sysRole));
        }
        throw new Error('The code has exist');
    }
    async update(sysRole) {
        const { id } = sysRole, _sysRole = __rest(sysRole, ["id"]);
        return await this.sysRoleRepository.update(Object.assign({ status: 1 }, _sysRole), { where: { id } });
    }
    async getOne(id) {
        return await this.sysRoleRepository.findOne({ where: { id } });
    }
    async getAll() {
        return await this.sysRoleRepository.findAll({ where: { status: 1 } });
    }
    async getAllRole(roles) {
        return await this.sysRoleRepository.findAll({ where: { id: roles } });
    }
    async voidOne(id) {
        return await this.sysRoleRepository.update({ status: 0 }, { where: { id } });
    }
    async getUserRole(userId) {
        return await this.sysUserRoleRepository.findAll({ where: { userId } });
    }
    async menuhandle(roleId) {
        const menu = await this.sysRoleMenuRepository.findAll({ where: { roleId } });
        let role = await this.sysRoleRepository.findOne({ where: { id: roleId } });
        const menuIds = menu.map(x => x.menuId);
        const newRole = role.toJSON();
        const roleOne = Object.assign(Object.assign({}, newRole), { menuIds });
        return roleOne;
    }
    async roleshandleUpdate(roleIds, userId) {
        await this.sysUserRoleRepository.destroy({ where: { userId } });
        return roleIds.map(async (x) => {
            await this.sysUserRoleRepository.create({ roleId: x, userId });
        });
    }
    async menuhandleUpdate(roleId, menuIds) {
        await this.sysRoleMenuRepository.destroy({ where: { roleId } });
        return menuIds.map(async (x) => {
            await this.sysRoleMenuRepository.create({ status: 1, menuId: x, roleId });
        });
    }
    async findWithList(sysRole) {
        const { status, code, name, page, limit } = sysRole;
        const offset = page * limit - limit;
        const data = this.sysRoleRepository.findAndCountAll(Object.assign({ where: Object.assign(Object.assign(Object.assign({}, name ? { typeCode: { [sequelize_1.Op.like]: name } } : {}), code ? { typeName: { [sequelize_1.Op.like]: code } } : {}), { status: 1 }), limit }, (page > 1) ? { offset } : {}));
        return data;
    }
    async getPagesByRole(roles) {
        const roleArray = await this.sysRoleRepository.findAll({ where: { id: roles } });
        let pages = roleArray.map(x => x.pages);
        console.log('Getting Pages...', pages);
        return await this.sysMeunRepository.findAll({ where: { id: pages } });
    }
    async getPagesByUser(userId) {
        const rolesUser = await this.sysUserRoleRepository.findAll({ where: { userId, status: 1 } });
        console.log(rolesUser, 'rolesUser');
        const roleId = rolesUser.map(x => x.roleId);
        const roles = await this.sysRoleMenuRepository.findAll({ where: { roleId } });
        let pageIds = [];
        roles.map(x => { pageIds.push(x.menuId); });
        const main = await this.sysMeunRepository.findAll({ where: { id: pageIds, status: 1, type: [0, 1], parentId: 0 } });
        const pages = await this.sysMeunRepository.findAll({ where: { id: pageIds, status: 1 } });
        const authoritys = pages.map(x => x.perms);
        const nav = this.makeTree(main, pages);
        return {
            nav,
            authoritys
        };
    }
    makeTree(mains, pages) {
        return mains.map(xa => {
            const testArray = pages.filter(u => xa.id === u.parentId);
            return Object.assign(Object.assign({}, xa.dataValues), { children: testArray });
        });
    }
};
SysRoleTableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('sysRoleRepository')),
    __param(1, (0, common_1.Inject)('sysMenuRepository')),
    __param(2, (0, common_1.Inject)('sysUserRoleRepository')),
    __param(3, (0, common_1.Inject)('sysRoleMenuRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], SysRoleTableService);
exports.SysRoleTableService = SysRoleTableService;
//# sourceMappingURL=sysRoleTableService.js.map