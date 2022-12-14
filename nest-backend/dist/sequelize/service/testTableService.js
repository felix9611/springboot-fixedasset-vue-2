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
exports.TestTableService = void 0;
const common_1 = require("@nestjs/common");
const node_jql_1 = require("node-jql");
let TestTableService = class TestTableService {
    constructor(tesrRepository) {
        this.tesrRepository = tesrRepository;
    }
    async new(test) {
        const data = await this.findMaxIdAndCode();
        const { code } = data[0][0];
        if (code) {
            const newCode = this.newCodeGen(6, code);
            return await this.tesrRepository.create(Object.assign({ status: 1, code: newCode }, test));
        }
        else {
        }
    }
    async removeOne(id) {
        return await this.tesrRepository.update({ status: 0 }, { where: { id } });
    }
    async removeBatch(ids) {
        return await this.tesrRepository.update({ status: 0 }, { where: { ids } });
    }
    async update(id, test) {
        const oriData = await this.tesrRepository.findOne({ where: { id } });
        if (oriData) {
            return await this.tesrRepository.update(Object.assign({}, test), { where: { id, status: 1 } });
        }
        return await this.new(test);
    }
    async findOne(id) {
        return await this.tesrRepository.findOne({ where: { id } });
    }
    async findMaxIdAndCode() {
        const baseTableName = 'tests';
        const query = new node_jql_1.Query({
            $select: [
                new node_jql_1.ResultColumn(new node_jql_1.FunctionExpression('Max', new node_jql_1.ColumnExpression(baseTableName, 'code')), 'code')
            ],
            $from: new node_jql_1.FromTable({
                table: baseTableName
            }),
            $where: [
                new node_jql_1.BinaryExpression(new node_jql_1.ColumnExpression(baseTableName, 'status'), '=', new node_jql_1.Value(1))
            ]
        });
        return await this.tesrRepository.sequelize.query(query.toString('mysql'));
    }
    newCodeGen(len, code) {
        let intCode = Number(code);
        let str = String(intCode + 1);
        while (str.length < len)
            str = '0' + str;
        return str;
    }
};
TestTableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('testRepository')),
    __metadata("design:paramtypes", [Object])
], TestTableService);
exports.TestTableService = TestTableService;
//# sourceMappingURL=testTableService.js.map