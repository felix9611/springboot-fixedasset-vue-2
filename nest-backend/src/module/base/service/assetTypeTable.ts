import { Injectable, Inject } from '@nestjs/common'
import { AssetType } from 'src/module/base/model/assetType'
import { QueryTypes } from 'sequelize'
import { 
  Query, 
  FromTable, 
  ColumnExpression, 
  ResultColumn, 
  BinaryExpression, 
  Value, 
  OrderBy, 
  LikeExpression, 
  AndExpressions,
  LimitOffset,
} from 'node-jql'
import { queryFindAssetType } from 'src/module/base/dto/queryFindList'
@Injectable()
export class AssetTypeTabeService{
  constructor(
    @Inject('assetTypeRepository')
    protected readonly repository: typeof AssetType,
  ) {}

  async save(data: AssetType) {
    if ( data && data.id ) {
      const { typeCode, typeName, remark, typeOtherName, id } = data
      return await this.repository.update({
        typeCode,
        typeName,
        remark,
        typeOtherName
      },
      {
        where: {
          id,
          status: 1
        }
      })
    } else {
      const { typeCode, typeName, remark, typeOtherName } = data
      return await this.repository.create({
        typeCode,
        typeName,
        remark,
        typeOtherName,
        status: 1
      })
    }
  }

  async voidData(id: number) {
    return await this.repository.update({ status: 0 }, { where: { id } })
  }

  async getOne(id: number) {
    return await this.repository.findOne({ where: { id } })
  }

  async findAll() {
    const query = new Query({
      $select: [new ResultColumn(new ColumnExpression('asset_type', '*'))],
      $from: [new FromTable('asset_type')],
      $where: [new BinaryExpression(new ColumnExpression('asset_type', 'status'), '=', new Value(1))],
      $order: [new OrderBy({
        expression: new ColumnExpression('asset_type', 'id'),
        order: 'DESC'
      })]
    })

    return this.repository.sequelize.query(query.toString('mysql'), { type: QueryTypes.SELECT })
  }

  async findAllList(query: queryFindAssetType) {
    const { page, limit, typeCode, typeName } = query

    const queryFind = new Query({
      $select: [new ResultColumn(new ColumnExpression('asset_type', '*'))],
      $from: [new FromTable('asset_type')],
      $where: [
        new AndExpressions({
          expressions: [
            typeCode? new LikeExpression(new ColumnExpression('asset_type', 'typeCode'), false, `%${typeCode}%`): new Value(1),
            typeName? new LikeExpression(new ColumnExpression('asset_type', 'typeName'), false, `%${typeName}%`): new Value(1),
          ]
        })
      ],
      $order: [new OrderBy({
        expression: new ColumnExpression('asset_type', 'id'),
        order: 'DESC'
      })],
      $limit: new LimitOffset(limit, page)
    })

    return this.repository.sequelize.query(queryFind.toString('mysql'), { type: QueryTypes.SELECT })
  }
}