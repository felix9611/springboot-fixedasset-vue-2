import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuardUser } from './guards/local-auth.guard'
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'
import { Log } from 'src/libs/utils'
import { LoginUserDto } from 'src/auth/dto/login-user.dto'

@ApiTags('User Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @UseGuards(LocalAuthGuardUser)
  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: 'Login' })
  async login(@Request() req: any) {
    console.log('user auth ctrl', req.user)
    Log({ req, user: req.user })
    return this.authService.login(req.user)
  }
  // async login(@Body() loginUserDto: LoginUserDto) {
  //   return this.authService.login(loginUserDto);
  // }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  async logout() {
    return this.authService.logout()
  }
}
