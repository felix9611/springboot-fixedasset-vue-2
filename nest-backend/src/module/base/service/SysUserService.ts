import { Injectable, Inject } from '@nestjs/common'
import { SysUser } from 'src/module/base/model/sysUser'
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
import { hashPw, comparePw } from 'src/common/password'

@Injectable()
export class SysUserTabeService{
  constructor(
    @Inject('sysUserRepository')
    protected readonly sysUserRepository: typeof SysUser,
  ) {}

  async login(username: string, password: string) {
    // const loginData = await 
  }

  async regAccount(reg: SysUser) {
    const { username, password, avatar, avatarBase64, city, email, deptId } = reg
    const Newpassword = await hashPw(password)
    return await this.sysUserRepository.create({
      username,
      password: Newpassword,
      avatar,
      avatarBase64,
      city,
      email,
      deptId,
      status: 1
    })

  }
}