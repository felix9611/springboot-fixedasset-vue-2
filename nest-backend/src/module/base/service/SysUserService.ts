import { Injectable, Inject } from '@nestjs/common'
import { SysUser } from 'src/module/base/model/sysUser'
import { QueryTypes, where } from 'sequelize'
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
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class SysUserTabeService{
  constructor(
    @Inject('sysUserRepository')
    protected readonly sysUserRepository: typeof SysUser,
    private jwtTokenService: JwtService
  ) {}

  async login(username: string, password: string) {
    const userExist = await this.sysUserRepository.findOne({
      where: {
        username
      }
    })
    const check = await comparePw(password, userExist.password)
    if (check) {       
      const payload = { username, id: userExist.id }
      return {
        token: this.jwtTokenService.sign(payload)
      }
    }
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

  async findOne(id: number) {
    return await this.sysUserRepository.findOne({ where: { id, status: 1 } })
  }
}