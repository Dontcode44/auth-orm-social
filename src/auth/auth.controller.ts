import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ActivateUserDto } from './dto/activate-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AppResources } from 'src/app.roles';
import { TOKEN } from 'src/decorators/token.decorator';

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(ACGuard)
  // @UseRoles({
  //   possession: 'any',
  //   action: 'create',
  //   resource: AppResources.USER,
  // })
  //@UseGuards(JwtAuthGuard)
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

  @Get('Test')
  async verifyId(@TOKEN() token): Promise<string> {
    console.log(token);
    return 'Success';
    
  }
}
