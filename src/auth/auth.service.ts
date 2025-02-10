// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

interface JwtPayload {
  email: string;
  sub: number;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password_hash'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    const passwordMatches = await bcrypt.compare(pass, user.password_hash);
    if (passwordMatches) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<User, 'password_hash'>) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
