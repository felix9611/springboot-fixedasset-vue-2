import { Request } from 'express'

export interface MyRequest extends Request {
  session: any
}