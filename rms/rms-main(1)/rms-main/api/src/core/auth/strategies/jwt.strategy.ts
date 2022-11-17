import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { CONFIG_ENV } from 'src/config/config';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(/*private userService: UserService,*/ ) 
  {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: CONFIG_ENV.JWT_SECRET,
    });
  }
  async validate(payload: any) {
    console.log('payload');
    console.log(payload);
    //return await this.userService.getOne(id);
    // retornamos un objeto
    if (typeof payload.role === "string") {
      payload.role = [payload.role];
    }
    return {
      username: payload.username,
      uid: payload.uid,
      company: payload.company,
      role: payload.role
    };
  }
}