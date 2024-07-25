import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../../../model/dto/login.dto';
import { SignUpDto } from '../../../model/dto/sign-up.dto';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,
              private jwtService: JwtService) {
  }
  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isMatchedPasswords = await bcrypt.compare(dto.password, user.password);
    if (!isMatchedPasswords) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      authToken: await this.jwtService.signAsync(payload),
      email: user.email,
      username: user.username
    };

  }

  async signUp(dto: SignUpDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (user) {
      throw new UnauthorizedException('Email already exists');
    }
    const hash = await bcrypt.hash(dto.password, 10);
    return await this.userService.createUser({ ...dto, password: hash });
  }
}
