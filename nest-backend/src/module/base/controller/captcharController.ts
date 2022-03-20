import { Controller, Get, Post, Body, Delete, Param, Put, Req, Request, Session, ExecutionContext } from '@nestjs/common'
import { CaptcheService } from 'src/module/base/service/CaptchaService'
import { MyRequest } from 'src/common/request'
import { v4 as uuidv4 } from 'uuid'

@Controller('captche')
export class captcheContoller {
  constructor(
    private captcheService: CaptcheService,
  ) {}

  @Get('')
  async getCaptchar(@Req() request: MyRequest) {
    const captche = await this.captcheService.captche()

    let myuuid = uuidv4()

    request.session.codeText = captche.text
    request.session.code = myuuid

    console.log(request.session)
    return { ...captche,  code: myuuid }
  }
}