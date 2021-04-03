import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { IRequestSuccess, IAuthSuccess } from './auth.model';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<IRequestSuccess> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<IAuthSuccess> {
    return this.authService.signIn(authCredentialsDto);
  }
}
