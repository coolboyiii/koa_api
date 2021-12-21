/*
 * @Autor: Cool
 * @Version: 2.0
 * @Date: 2021-11-05 17:29:08
 * @LastEditTime: 2021-11-08 11:17:03
 * @Description:
 * @LastEditors: Cool
 */

import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError
} from 'jsonwebtoken'
import config from '../app/config'

const sign = (data: any) => {
  return jwt.sign({ admin: data }, config.jwt.jwt_secret as string, {
    expiresIn: config.jwt.jwt_exoires
  })
}

const verify = (
  token: string
): {
  admin: JwtPayload | string | null
  error: TokenExpiredError | JsonWebTokenError | null
} => {
  try {
    const decoded = jwt.verify(token, config.jwt.jwt_secret as string)
    return {
      admin: decoded,
      error: null
    }
  } catch (error) {
    return {
      admin: null,
      error: error as TokenExpiredError | JsonWebTokenError | null
    }
  }
}

export { sign, verify }
