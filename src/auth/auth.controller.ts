import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ActivateUserDto } from './dto/activate-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerUser: RegisterUserDto): Promise<void> {
    return this.authService.registerUser(registerUser);
  }

  @Post('login')
  login(@Body() loginUser: LoginUserDto): Promise<{ accessToken: string }> {
    return this.authService.findOneByEmail(loginUser);
  }

  @Get('active_account')
  activateAccount(@Query() activateDto: ActivateUserDto): Promise<void> {
    return this.authService.activateUser(activateDto);
  }
}
