import { Controller, Get, Post, Body, Delete, Param, Put, Req, Request, Session, ExecutionContext } from '@nestjs/common'
import { CaptcheService } from 'src/module/base/service/CaptchaService'
import { MyRequest } from 'src/common/request'
import { SysUser } from 'src/module/base/model/sysUser'
import { SysUserTabeService } from '../service/SysUserService'

@Controller('auth')
export class AuthContoller {

  constructor(
    private sysUserTabeService: SysUserTabeService,
  ) {}

  @Post('login')
  async login(@Body() login: any, @Req() req: MyRequest) {

    if (login && (login.codeText === req.session.codeText) && (login.code === req.session.code)) {
      req.session.codeText = ''
      return 'test ok'
    }
  }

  @Post('reg')
  async regAc(@Body() login: SysUser) {
    return await this.sysUserTabeService.regAccount(login)
  }
}