// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  email: string;
  sub: number;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // Extract JWT from the Authorization header as Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
    console.log(configService.get('JWT_SECRET'));
  }

  async validate(payload: JwtPayload): Promise<{
    userId: number;
    email: string;
    role: string;
  }> {
    console.log('Inside JWT validate. Payload:', payload);
    // Here, payload is the decoded JWT
    // You can perform additional validations if needed.
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
