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
import * as config from 'config';
import { AuthGoogleDto } from './dto/auth-google.dto';
import { JwtService } from '@nestjs/jwt';
const authConfig = config.get('social');

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
      message: `User have been successfully sign up.`,
    };
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<IAuthSuccess> {
    return {
      message: 'Successfuly signed in',
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
      `${authConfig.google.redirect}?accessToken=${accessToken}`,
    );
  }
}
