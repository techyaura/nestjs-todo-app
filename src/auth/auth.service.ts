import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IAuthSuccess, IAuthPayload, IRequestSuccess } from './auth.model';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentials: AuthCredentialsDto): Promise<IRequestSuccess> {
    return this.userRepository.signUp(authCredentials);
  }

  async signIn(authCredentials: AuthCredentialsDto): Promise<IAuthSuccess> {
    const email = await this.userRepository.validateUserPassword(
      authCredentials,
    );
    if (!email) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload: IAuthPayload = { email };
    const accessToken = await this.jwtService.sign(payload);
    return {
      message: 'Successfuly signed in',
      accessToken,
    };
  }
}
