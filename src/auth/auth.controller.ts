import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { IRequestSuccess, IAuthSuccess } from './auth.model';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GoogleAuthGuard } from './auth-google.guard';
import { AuthGoogleDto } from './dto/auth-google.dto';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';
const authConfig = config.get('social');
const authMessages = config.get('messages.auth');

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<IRequestSuccess> {
    await this.authService.signUp(authCredentialsDto);
    return {
      message: authMessages.SIGNUP_IN_SUCCESS,
    };
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<IAuthSuccess> {
    return {
      message: authMessages.SIGN_IN_SUCCESS,
      ...(await this.authService.signIn(authCredentialsDto)),
    };
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req): Promise<void> {
    // use to redirect user
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {
    const user: AuthGoogleDto = req.user;
    const { accessToken } = await this.authService.googleLogin(user);
    return res.redirect(
      `${
        process.env.AUTH_GOOGLE_REDIRECT || authConfig.google.redirect
      }?accessToken=${accessToken}`,
    );
  }
}
