import jwt from 'jsonwebtoken';
// import config from 'config';
import _default from '../../config/default';

const privateKey = _default.privateKey as string;
const publicKey = _default.publicKey as string;

export function signJwt(object: Object, option?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(option && option),
    algorithm: 'RS256'
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded: decoded
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null
    };
  }
}
