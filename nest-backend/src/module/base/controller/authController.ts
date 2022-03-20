import { Controller, Get, Post, Body, Delete, Param, Put, Req, Request, Session, ExecutionContext } from '@nestjs/common'
import { CaptcheService } from 'src/module/base/service/CaptchaService'
import { MyRequest } from 'src/common/request'
import { SysUser } from 'src/module/base/model/sysUser'
import { SysUserTabeService } from 'src/module/base/service/SysUserService'
import { LoginForm } from 'src/module/base/dto/loginForm'

@Controller('auth')
export class AuthContoller {

  constructor(
    private sysUserTabeService: SysUserTabeService,
  ) {}

  @Post('login')
  async login(@Body() login: LoginForm, @Req() req: MyRequest) {
    const { code, codeText, username, password } = login
    // if (login && (codeText === req.session.codeText) && (code === req.session.code)) {
      req.session.codeText = ''
      return await this.sysUserTabeService.login(username, password)
    // }
  }

  @Post('reg')
  async regAc(@Body() login: SysUser) {
    return await this.sysUserTabeService.regAccount(login)
  }
}