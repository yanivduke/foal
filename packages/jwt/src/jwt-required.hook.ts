// 3p
import { VerifyOptions } from 'jsonwebtoken';

// FoalTS
import { HookDecorator } from '@foal/core';
import { JWT, JWTOptions } from './jwt.hook';

export function JWTRequired(options: JWTOptions = {}, verifyOptions: VerifyOptions = {}): HookDecorator {
  return JWT(true, options, verifyOptions);
}
