import * as svgCaptcha from 'svg-captcha'

export class CaptcheService {

  async captche(size = 4) {
    const captcha = svgCaptcha.create({
      size, // text length
      fontSize: 50, //font size
      width: 100,  //width
      height: 34,  //height
      background: '#cc9966',  //bg
    })
    return captcha
  }
}