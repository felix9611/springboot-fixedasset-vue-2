import { Controller, Get, Post, Body, Delete, Param, Put, Req, Request, HttpCode, HttpStatus } from '@nestjs/common'
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
  @HttpCode(HttpStatus.OK)
  async login(@Body() login: LoginForm, @Req() req: MyRequest) {
    const { code, codeText, username, password } = login
    // if (login && (codeText === req.session.codeText) && (code === req.session.code)) {
      const logins = await this.sysUserTabeService.login(username, password)
      console.log(logins)
      return logins
    // }
  }

  @Post('reg')
  async regAc(@Body() login: SysUser) {
    return await this.sysUserTabeService.regAccount(login)
  }

  @Get('user/:id')
  async findUser(@Param('id') id: number) {
    return await this.sysUserTabeService.findOne(id)
  }
}