
import { Injectable, Inject } from '@nestjs/common'
import { Department } from 'src/sequelize/models/department'
import {
  Query,
  FromTable,
  BinaryExpression,
  ColumnExpression,
  Value,
  FunctionExpression,
  ResultColumn,
  LikeExpression,
  LimitOffset,
  InExpression,
  ConditionalExpression
} from 'node-jql'
import { Op, Sequelize } from 'sequelize'

@Injectable()
export class BaseTableService {
  constructor(
    private sequelize: Sequelize,
  ) {}
}
