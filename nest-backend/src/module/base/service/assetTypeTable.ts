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
import { queryFindDept } from 'src/module/base/dto/queryFindList'

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
}