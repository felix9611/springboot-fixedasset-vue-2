import {
  Injectable,
  CanActivate,
  Logger,
  HttpException,
  HttpStatus,
  ExecutionContext,
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = context.switchToRpc().getData().headers.authorization
    if (token) {
      try {
        const user = await this.verifyToken(token, 'secretKey')
        if (user) {
          request.user = user
          return true
        } else {
          throw new HttpException(JSON.stringify({ message: 'token invalid ', code: 10042 }), HttpStatus.OK)
        }
      } catch (e) {
        Logger.error(e, 'auth')
        throw new HttpException(JSON.stringify({ message: 'token invalid ', code: 10042 }), HttpStatus.OK)
      }
    } else {
      throw new HttpException('Please Login!', HttpStatus.OK)
    }
  }

  private verifyToken(token: string, secret: string): Promise<any> {
    return new Promise((resolve) => {
      jwt.verify(token, secret, (error, payload) => {
        if (error) {
          console.log('-----------error start--------------');
          console.log(error);
          console.log('-----------error end--------------');
          throw new HttpException('token illegal', HttpStatus.OK);
        } else {
          resolve(payload);
        }
      })
    })
  }
}