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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysMenuTableService = void 0;
const common_1 = require("@nestjs/common");
const node_jql_1 = require("node-jql");
let SysMenuTableService = class SysMenuTableService {
    constructor(sysMenuRepository, sysRoleMenuRepository) {
        this.sysMenuRepository = sysMenuRepository;
        this.sysRoleMenuRepository = sysRoleMenuRepository;
    }
    async voidOne(id) {
        return await this.sysMenuRepository.update({ status: 0 }, { where: { id } });
    }
    async getOne(id) {
        return await this.sysMenuRepository.findOne({ where: { id } });
    }
    async getAll() {
        return await this.sysMenuRepository.findAll({ where: { status: 1 } });
    }
    async createOne(sysMenu) {
        const { path } = await this.sysMenuRepository.findOne({ where: { path: sysMenu.path } });
        if (!path) {
            return await this.sysMenuRepository.create(Object.assign({ status: 1 }, sysMenu));
        }
        throw new Error('The Path has exist');
    }
    async updateOne(sysMenu) {
        return await this.sysMenuRepository.update(Object.assign({}, sysMenu), { where: { id: sysMenu.id } });
    }
    async findMenusByRoles(roleId) {
        const menuId = await this.sysRoleMenuRepository.findAll({ where: { roleId } });
        return await this.sysMenuRepository.findAll({ where: { id: menuId } });
    }
    async findWithList(sysMenu) {
        const baseTableName = 'sys_menu';
        const query = new node_jql_1.Query({
            $from: new node_jql_1.FromTable({
                table: baseTableName
            })
        });
        const { name, path, type, parentId, limit, active } = sysMenu;
        query.$select = [
            new node_jql_1.ResultColumn(new node_jql_1.ColumnExpression(baseTableName, 'parentId'), 'parentId'),
            new node_jql_1.ResultColumn(new node_jql_1.ColumnExpression(baseTableName, 'path'), 'path'),
            new node_jql_1.ResultColumn(new node_jql_1.ColumnExpression(baseTableName, 'perms'), 'perms'),
            new node_jql_1.ResultColumn(new node_jql_1.ColumnExpression(baseTableName, 'component'), 'component'),
            new node_jql_1.ResultColumn(new node_jql_1.ColumnExpression(baseTableName, 'type'), 'type'),
            new node_jql_1.ResultColumn(new node_jql_1.ColumnExpression(baseTableName, 'icon'), 'icon'),
            new node_jql_1.ResultColumn(new node_jql_1.ColumnExpression(baseTableName, 'orderNum'), 'orderNum'),
        ];
        if (active)
            query.$where = new node_jql_1.InExpression(new node_jql_1.ColumnExpression(baseTableName, 'status'), false, new node_jql_1.Value(active));
        if (name)
            query.$where = new node_jql_1.LikeExpression(new node_jql_1.ColumnExpression(baseTableName, 'name'), false, `%${name}%`);
        if (limit)
            query.$limit = new node_jql_1.LimitOffset(limit);
        const arrayList = await this.sysMenuRepository.sequelize.query(query.toString('mysql'));
        return arrayList[0];
    }
    async getAllPage() {
        const main = await this.sysMenuRepository.findAll({ where: { status: 1, type: [0, 1], parentId: 0 } });
        const pages = await this.sysMenuRepository.findAll({ where: { status: 1 } });
        return this.makeTree(main, pages);
    }
    makeTree(mains, pages) {
        return mains.map(xa => {
            const testArray = pages.filter(u => xa.id === u.parentId);
            return Object.assign(Object.assign({}, xa.dataValues), { children: testArray });
        });
    }
};
SysMenuTableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('sysMenuRepository')),
    __param(1, (0, common_1.Inject)('sysRoleMenuRepository')),
    __metadata("design:paramtypes", [Object, Object])
], SysMenuTableService);
exports.SysMenuTableService = SysMenuTableService;
//# sourceMappingURL=sysMenuTableService.js.map