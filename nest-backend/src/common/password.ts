const bcrypt = require('bcrypt')


export async function hashPw(password: string){
  const salt = await bcrypt.genSalt(2)
  const hashed = await bcrypt.hash(password, salt)
  return hashed
}

export async function comparePw(password: string, hashedPassword: string){
  const validPassword = await bcrypt.compare(password, hashedPassword)
  return validPassword
}