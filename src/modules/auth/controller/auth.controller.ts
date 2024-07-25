import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../../../model/dto/login.dto';
import { SignUpDto } from '../../../model/dto/sign-up.dto';
import { Public } from '../decorators/public.decorator';

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("sign-up")
  async signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }
}
